import { ethers } from "ethers";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { parseError } from "../utils/parseError";

import { useMoralis, useWeb3Contract } from "react-moralis";
import { contractAddresses, abi } from "../utils/constants";
import LoadingButton from "./LoadingButton";
import { findTime } from "../utils/commonFunctions";
const AddCampaign = ({ visible, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [goal, setGoal] = useState(0);
  const [startAt, setStartAt] = useState(new Date());
  const [endAt, setEndAt] = useState(new Date());
  const [maxTimePeriod, setMaxTimePeriod] = useState({});

  const navigate = useNavigate();

  const { chainId: chainIdHex } = useMoralis();

  const chainId = parseInt(chainIdHex);
  const crowdfundAddress =
    chainId in contractAddresses
      ? contractAddresses[chainId][contractAddresses[chainId].length - 1]
      : null;

  const runContractOptions = { abi, contractAddress: crowdfundAddress };
  const { runContractFunction: getMaxDuration } = useWeb3Contract({
    ...runContractOptions, // specify the networkId
    functionName: "getMaxDuration",
    params: {},
  });

  useEffect(()=>{
    const loadData = async () => {
      const maxDur = await getMaxDuration()
      setMaxTimePeriod(findTime(maxDur.toNumber()))
    }
    loadData()
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formatGoal = ethers.utils.parseEther(goal);
    const formatStartAt = Math.floor(startAt.getTime() / 1000);
    const formatEndAt = Math.floor(endAt.getTime() / 1000);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();
    const crowdfund = new ethers.Contract(crowdfundAddress, abi, signer);

    try {
      const transactionResponse = await crowdfund.launch(
        name,
        formatGoal,
        formatStartAt,
        formatEndAt,
        { gasLimit: 210000 }
      );
      const transactionReceipt = await transactionResponse.wait(1);
      const id = transactionReceipt.events[0].args.id.toString();
      e.target.reset();
      setIsLoading(false);
      navigate(`/campaign/${id}/`);
      toast.success("Transaction Success");
      e.target.reset();
      onClose();
    } catch (err) {
      const errMsg = err?.reason ?? err?.message ?? parseError(err.message);
      toast.error(errMsg);
      setIsLoading(false);
      e.target.reset();
      onClose();
    }
  };

  function incrementDate(dateInput, increment) {
    var dateFormatTotime = new Date(dateInput);
    var increasedDate = new Date(
      dateFormatTotime.getTime() + increment * 86400000
    );
    return increasedDate;
  }

  let canSave;
  if (name.length > 0 && goal > 0) {
    canSave = true;
  } else {
    canSave = false;
  }
  if (!visible) return null;
  return (
    <div
      id="authentication-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center top-0 h-screen w-screen"
    >
      {/* <DateRangePicker/> */}
      <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            onClick={() => onClose()}
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            data-modal-toggle="authentication-modal"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="py-6 px-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              Start A Campaign
            </h3>
            <form className="space-y-6" action="#" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="titlename"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Name
                </label>
                <input
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Name of Campaign"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="goal"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Goal (Matic)
                </label>
                <input
                  type="text"
                  name="goal"
                  id="goal"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  min={0}
                  placeholder="Goal(The amount You want to raise in wei)"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>

              <div className="flex items-center">
                <div className="relative">
                  <DatePicker
                    selected={startAt}
                    showTimeInput
                    onChange={(date) => setStartAt(date)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 "
                    value={startAt}
                    minDate={new Date()}
                    format="y-MM-dd"
                  />
                </div>
                <span className=" mx-2 text-gray-500">to</span>
                <div className="relative">
                  <DatePicker
                    selected={endAt}
                    showTimeInput
                    onChange={(date) => setEndAt(date)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 "
                    value={endAt}
                    minDate={incrementDate(startAt, 1)}
                    format="y-MM-dd"
                  />
                </div>
              </div>
              <p>The duration must be less than { `${maxTimePeriod?.year} year(s),${maxTimePeriod?.day} day(s),${maxTimePeriod?.hour} hour(s), ${maxTimePeriod?.minute} minute, ${maxTimePeriod?.second} second ] (note: this can be changed by the admin if the need arises) `}</p>
              <div className="flex justify-between">
                {isLoading ? (
                  <LoadingButton />
                ) : (
                  <button
                    type="submit"
                    className={
                      !canSave
                        ? "text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full"
                        : "w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    }
                    disabled={!canSave}
                  >
                    Create
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCampaign;
