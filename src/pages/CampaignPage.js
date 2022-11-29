import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import CountDown from "../components/CountDown";
import GoalRating from "../components/GoalRating";
import PageNotFound from "./PageNotFound";
import EditCampaignData from "../components/EditCampaignData";
import No_Image from "../assets/campaign/no_image.jpg"
import { toast } from "react-toastify";
import { parseError } from "../utils/parseError";
import { ethers } from "ethers";
import { getCampaignById as getCampaignByIdFromFirebase } from "../utils/getDocument";
import {console} from "console-browserify"
import {
  CAMPAIGN_ENDED,
  CAMPAIGN_STARTED,
  CAMPAIGN_NOT_STARTED,
  ZERO_ADDRESS,
  contractAddresses,
  abi,
} from "../utils/constants";
import { getCampaignCssStyle } from "../utils/commonFunctions";
import { useMoralis, useWeb3Contract } from "react-moralis";
const initailCampaignData = {
  facebook_url: "",
  twitter_url: "",
  banner: "",
  phone_no: "",
  description: "",
};
const CampaignPage = () => {
  const [campaign, setCampaign] = useState(null);
  const { id } = useParams();

  const [modalState, setModalState] = useState(false);
  const [pledge, setPledge] = useState("0");
  const [crowdfund, setCrowdfund] = useState("0");
  const [provider, setProvider] = useState("0");
  const [mypledge, setMyPledge] = useState("0");
  const [campaignData, setCampaignData] = useState(initailCampaignData);
  const [minimumWithdrawalDuration, setMinimumWithdrawalDuration] =
    useState("0");


  const [amount, setAmount]  = useState("0")
  const { chainId: chainIdHex, account } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const crowdfundAddress = chainId in contractAddresses
  ? contractAddresses[chainId][contractAddresses[chainId].length - 1]
  : null;

  const runContractOptions = { abi, contractAddress: crowdfundAddress };
  const { runContractFunction: getCampaignById } = useWeb3Contract({
    ...runContractOptions, // specify the networkId
    functionName: "getCampaignById",
    params: {
      _id:id
    }
  });
  const toggleModalState = () => {
    setModalState(!modalState);
  };

  useEffect(() => {
    const loadCampaigns = async () => {
      try {
        
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const network = await provider.getNetwork();
        setProvider(provider)
        const crowdfund = new ethers.Contract(crowdfundAddress, abi, provider);
        setCrowdfund(crowdfund)
        // const campaign = await crowdfund.getCampaignById(id);
        const campaign = await getCampaignById();
        const mydonation = await crowdfund.getPledgeAmount(id, account);
        const minimumWithdrawalDuration =
          await crowdfund.getMinimumWithdrawalDuration();
        setMinimumWithdrawalDuration(minimumWithdrawalDuration.toString());
        if (campaign.creator === ZERO_ADDRESS) return;
        setMyPledge(mydonation.toString());
        setCampaign(campaign);
        setPledge(campaign.pledged);
        const campaignData = (await getCampaignByIdFromFirebase(id)) ?? {};
        console.log("campaign data: ", campaignData)
        setCampaignData(campaignData);

        // set the campaign to false using the error and isloading
      } catch (err) {
        // set error state if there is no campaign
        toast.error(err?.toString());
      }
    };
    crowdfund && loadCampaigns();
  }, []);

  async function updateUIValues() {
    const campaign = await crowdfund.getCampaignById(id);
    const mydonation = await crowdfund.getPledgeAmount(id, account);
    setCampaign(campaign);

    setPledge(campaign.pledged);
    setMyPledge(mydonation.toString());
  }

  const {
    data,
    error,
    runContractFunction: crowdfund_pledge,
    isFetching,
    isLoading: pledge_is_loading,
  } = useWeb3Contract({
    abi: abi,
    contractAddress: crowdfundAddress,
    functionName: "unpledge",
    params: {
      _id: id,
      _amount: amount,
    },
  });

  const pledge_unpledge = async (e) => {
    e.preventDefault();
    const amount = e.target[0].value;
    const isUnpledged = e.target[1].checked;
    const formatAmount = ethers.utils.parseEther(amount);
    const signer = provider.getSigner();
    let transaction;
    try {
      if (isUnpledged) {
        transaction = await crowdfund
          .connect(signer)
          .unpledge(id, formatAmount);
       
        // });
      } else {
        transaction = await crowdfund
          .connect(signer)
          .pledge(id, { value: formatAmount });
      }

      await transaction.wait();
      updateUIValues();
      toast.success("Transaction successfull");
      e.target.reset();
    } catch (err) {
      const errMsg = err.reason ?? parseError(err.message);
      toast.error(errMsg);
    }
  };
  const refund = async () => {
    const signer = provider.getSigner();
    try {
      const transaction = await crowdfund.connect(signer).refund(id);
      await transaction.wait();
      updateUIValues();
      toast.success("Transaction successfull");
    } catch (err) {
      const errMsg = err.reason ?? parseError(err.message);
      toast.error(errMsg);
    }
  };
  const claim = async () => {
    const signer = provider.getSigner();
    try {
      const transaction = await crowdfund.connect(signer).claim(id);
      await transaction.wait();
      updateUIValues();
      toast.success("Transaction successfull");
    } catch (err) {
      const errMsg = err.reason ?? parseError(err.message);
      toast.error(errMsg);
    }
  };
  const isPastDate = (unix_time) => {
    const getTimestamp = Number(Math.round(new Date().getTime() / 1000));
    return getTimestamp > Number(unix_time);
  };
  const getDateFromUnix = (unix_time) => {
    const compute_date = new Date(unix_time * 1000);
    return String(compute_date);
  };

  function getCampaignStatus() {
    const getTimestamp = Math.round(new Date().getTime() / 1000).toString();
    if (campaign.startAt > getTimestamp) return CAMPAIGN_NOT_STARTED;
    else if (campaign.endAt < getTimestamp) return CAMPAIGN_ENDED;
    else if (campaign.startAt <= getTimestamp < campaign.endAt)
      return CAMPAIGN_STARTED;
  }

  const getCountdownTime = (status) => {
    if (status === CAMPAIGN_NOT_STARTED)
      return campaign.startAt.toNumber() * 1000;
    else if (status === CAMPAIGN_STARTED)
      return campaign.endAt.toNumber() * 1000;
    else if (status === CAMPAIGN_ENDED)
      return (
        (campaign.endAt.toNumber() + Number(minimumWithdrawalDuration)) * 1000
      );
  };
  console.log(campaignData.banner,"banner")
  return (
    <>
      {campaign ? (
        <section className="text-gray-700 body-font overflow-hidden bg-white">
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <img
                alt="campaign banner"
                className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
                src={
                  campaignData.banner ??
                    No_Image
                    
                }
                
              />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <div>
                  <CountDown
                    countdownTimestampMs={getCountdownTime(getCampaignStatus())}
                    getCampaignStatus={getCampaignStatus}
                  />
                </div>
                {/* <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  BRAND NAME
                </h2> */}
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {campaign.name}
                </h1>
                <div className="flex mb-4">
                  <GoalRating
                    goal={Number(campaign.goal)}
                    pledge={Number(pledge)}
                  />

                  <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                    {campaignData.facebook_url ? (
                      <a
                        className="text-gray-500"
                        href={campaignData.facebook_url}
                      >
                        <svg
                          fill="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                        >
                          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                        </svg>
                      </a>
                    ) : (
                      ""
                    )}
                    {campaignData.twitter_url ? (
                      <a
                        className="ml-2 text-gray-500"
                        href={campaignData.twitter_url}
                      >
                        <svg
                          fill="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                        >
                          <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                        </svg>
                      </a>
                    ) : (
                      ""
                    )}
                    {campaignData.phone_no ? (
                      <a
                        className="ml-2 text-gray-500"
                        href={`https://wa.me/${campaignData.phone_no}`}
                      >
                        <svg
                          fill="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                        >
                          <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                        </svg>
                      </a>
                    ) : (
                      ""
                    )}
                  </span>
                  <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                    <span
                      className={
                        getCampaignCssStyle(getCampaignStatus()) +
                        "text-sm font-medium mr-2 px-2.5 py-0.5 rounded"
                      }
                    >
                      {getCampaignStatus()}
                    </span>
                  </span>
                </div>
                <p className="leading-relaxed border-b-2 mb-2">
                  {campaignData.description
                    ? campaignData.description
                    : "NO CAMPAIGN DESCRIPTION FOUND!!!"}
                </p>
                <p className="">
                  The campaign starts:{" "}
                  <strong>
                    {getDateFromUnix(campaign.startAt.toString())}{" "}
                  </strong>{" "}
                  and ends:{" "}
                  <strong>{getDateFromUnix(campaign.endAt.toString())} </strong>
                </p>
                <p>
                  This fund will be available for claim on
                  <strong>
                    {" "}
                    {getDateFromUnix(
                      campaign.endAt.toNumber() +
                        Number(minimumWithdrawalDuration)
                    )}
                  </strong>
                  . (Note: This measure is put in place to make sure there is a
                  period for refund if goal is not reached and put trust in the
                  process)
                </p>
                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                  <div className="flex place-content-center">
                    <button
                      type="button"
                      className="inline-flex w-full items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      <span></span>
                      My Pledge: {ethers.utils.formatEther(mypledge)} Matic
                    </button>
                  </div>
                  <div className="flex place-content-center">
                    {Number(mypledge) > 0 ? (
                      <>
                        <button
                          onClick={() => refund()}
                          type="button"
                          className={`${
                            !isPastDate(campaign.endAt)
                              ? " bg-blue-200 mx-4 hover:bg-blue-200  dark:bg-blue-200 dark:hover:bg-blue-200  dark:focus:ring-blue-200 focus:ring-blue-300"
                              : " bg-blue-700 mx-4 hover:bg-blue-800  dark:bg-blue-600 dark:hover:bg-blue-700  dark:focus:ring-blue-800 focus:ring-blue-300"
                          } text-white focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2`}
                          disabled={!isPastDate(campaign.endAt)}
                        >
                          Refund
                        </button>
                        <span>More info on refund</span>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>

                  <div
                    className="inline-flex  place-content-center rounded-md shadow-sm m-4"
                    role="group"
                  ></div>
                </div>
                <div className="">
                  <form onSubmit={pledge_unpledge}>
                    <div className="">
                      <label
                        htmlFor="amount"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Amount (Matic)
                      </label>
                      <input
                        onChange={(e)=>setAmount(e.target.value)}
                        type="text"
                        id="amount"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="amount of matic e.g 0.001"
                        required
                      />
                    </div>
                    <div className="flex items-start m-2">
                      <div className="flex items-center h-5">
                        <input
                          id="remember"
                          type="checkbox"
                          value="unpledge"
                          className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                        />
                      </div>
                      <label
                        htmlFor="remember"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        (Note: by clicking on this you can unpledge a pledged
                        fund)
                      </label>
                    </div>
                    <button
                      type="submit"
                      className={`${isPastDate(
                        campaign.endAt.toNumber()) || !isPastDate(
                          campaign.startAt.toNumber()) ? " bg-blue-200 hover:bg-blue-200  dark:bg-blue-200 dark:hover:bg-blue-200 dark:focus:ring-blue-200 focus:ring-blue-200": " bg-blue-700 hover:bg-blue-800  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 focus:ring-blue-300"} text-white focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center`}
                      disabled={isPastDate(
                        campaign.endAt.toNumber())}
                    >
                      Proceed
                    </button>
                  </form>
                </div>
                <div className="flex border-t-2 m-4 p-4">
                  <span className="title-font font-medium text-2xl text-gray-900">
                    Total Pledged:{" "}
                    {ethers.utils.formatEther(campaign.pledged.toString())}{" "}
                    Matic
                  </span>

                  {campaign.creator.toLowerCase() == account.toLowerCase() ? (
                    <>
                      <button
                        onClick={() => toggleModalState()}
                        type="button"
                        className="text-white bg-blue-700 mx-4 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                          <path
                            fillRule="evenodd"
                            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Edit
                      </button>
                      <button
                        onClick={() => claim()}
                        type="button"
                        className={`${
                          !isPastDate(
                            campaign.endAt.toNumber() +
                              Number(minimumWithdrawalDuration)
                          )
                            ? "dark:focus:ring-blue-200 bg-blue-200 mx-4 hover:bg-blue-200  dark:bg-blue-200 dark:hover:bg-blue-200"
                            : "dark:focus:ring-blue-800 bg-blue-700 mx-4 hover:bg-blue-800  dark:bg-blue-600 dark:hover:bg-blue-700"
                        } text-white cursor-not-allowed  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 `}
                        disabled={
                          !isPastDate(
                            campaign.endAt.toNumber() +
                              Number(minimumWithdrawalDuration)
                          )
                        }
                      >
                        Claim
                      </button>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
          <EditCampaignData
            visible={modalState}
            onClose={toggleModalState}
            campaign_id={id}
            campaignData={campaignData}
            setCampaignData={setCampaignData}
          />
        </section>
      ) : (
        <PageNotFound />
      )}
    </>
  );
};

export default CampaignPage;
