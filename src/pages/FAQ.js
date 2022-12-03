import React, { useState,  useEffect } from "react";
import FaqQuestion from "../components/FaqQuestion";
import FAQModal from "../components/FAQModal";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { contractAddresses, abi } from "../utils/constants";
import { findTime } from "../utils/commonFunctions";

const FAQ = () => {
  const [modalState, setModalState] = useState(false);
  const [maxTimePeriod, setMaxTimePeriod] = useState({});
  const [minimumWithdrawalDuration, setMinimumWithdrawalDuration] = useState({});
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
    params: {
     
    },
  });
  const { runContractFunction: getMinimumWithdrawalDuration } = useWeb3Contract({
    ...runContractOptions, // specify the networkId
    functionName: "getMinimumWithdrawalDuration",
    params: {
     
    },
  });

  useEffect(()=>{
    const loadData = async () => {
      const maxDur = await getMaxDuration()
      const minWithdrawalPeriod = await getMinimumWithdrawalDuration()
      setMaxTimePeriod(findTime(maxDur.toNumber()))
      setMinimumWithdrawalDuration(findTime(minWithdrawalPeriod.toNumber()))
    }
    loadData()
  },[])

  const toggleModalState = () => {
    setModalState(!modalState);
  };

  const questions = [
    {
      title: "HOW DO I INTERACT WITH THE DAPP?",
      answer: [
        "The First Thing Is You Need To Download MetaMask, This Dapp Can only Be Accessed Via MetaMask For Now. ",
        "We are working to make sure that more wallet are supported in the future/2.0 of the project but for now the recommended wallet is metamask",
      ],
      external_link: {
        name: "visiting metamask for installation and use",
        url: "https://metamask.io/",
      },
    },
    {
      title: "I CAN'T CLICK ON A REFUND BUTTON OR IT IS DISABLED?",
      answer: [
        "You can only have a refund under 2 conditions",
        "1. The Campaign is over",
        "2. The campaign goal was not reached",
      ],
      external_link: {
        name: "viewing the contract code",
        url: `https://mumbai.polygonscan.com/address/${crowdfundAddress}`,
      },
    },
    {
      title: "iS IT FREE?",
      answer: [
        "It is free and will continue to be for the considerable future.",
        "We offer other services that will help to publicise and  make your campaign more successfull, coming soon!!!",
      ],
      external_link: {
        name: "Contacting Us",
        url: "https://wa.me/%2B2347068448786?text=Hi%20Odeyemi%20Increase%20Ayobami.%20Tried%20out%20your%20Dapp%2C%20having%20some%20slight%20difficulty.%20Can%20you%20be%20of%20any%20assistance%3F",
      },
    },
    {
      title: "WHY CAN'T I VIEW CAMPAIGN CONNECTING A WALLET?",
      answer: [
        "We plan on integrating moralis or the graph to be able to get events emitted by the contract",
        "With that we will be able to show more feature such as 1. Who deposited, 2. Who withdraw 3. Who has collect a Refund e.t.c",
      ],
      external_link: {
        name: "Contacting Us",
        url: "https://wa.me/%2B2347068448786?text=Hi%20Odeyemi%20Increase%20Ayobami.%20Tried%20out%20your%20Dapp%2C%20having%20some%20slight%20difficulty.%20Can%20you%20be%20of%20any%20assistance%3F",
      },
    },
    {
      title: "I WANT TO INTERACT WITHOUT THE FRONTEND",
      answer: [
        "You can interact with the contract via two other recommended ways",
        "1. Download the project 2. Use the verified contract on polyscan/etherscan",
      ],
      external_link: {
        name: "VIewing The Source Code",
        url: "https://github.com/UpgradeOfficial/feducia",
      },
    },
    {
      title: "I CANT CREATE A CAMPAIGN",
      answer: [
        "There are some reason why you can create your campaign",
        `1. You choose a date that is past 2. The duration of your campaign is greater than [ ${maxTimePeriod?.year} year(s),${maxTimePeriod?.day} day(s),${maxTimePeriod?.hour} hour(s), ${maxTimePeriod?.minute} minute, ${maxTimePeriod?.second} second ] (note: this can be changed by the admin if the need arises) ` ,
      ],
      external_link: {
        name: "VIewing The Source Code",
        url: "https://github.com/UpgradeOfficial/feducia",
      },
    },
    {
      title: "I CANT WITHDRAWAL",
      answer: [
        "The claim button is disabled to make sure that funds can't be withdrawn if the goal is not achieved, any funds left after that can be claimed by the owner of the campaign",
        `The duration for the maturity of the funds is [ ${minimumWithdrawalDuration?.year} year(s),${minimumWithdrawalDuration?.day} day(s),${minimumWithdrawalDuration?.hour} hour(s), ${minimumWithdrawalDuration?.minute} minute, ${minimumWithdrawalDuration?.second} second ] (note: this can be changed by the admin if the need arises) ` ,
      ],
      external_link: {
        name: "VIewing The Source Code",
        url: "https://github.com/UpgradeOfficial/feducia",
      },
    },
    {
      title: "CAN I GUESS MY CAMPAIGN ID? ",
      answer: [
        "The campaign id are in numerical order, the next campaign with have an id of n + 1, where n is the id of the last campaign",
        "This my not be the case in situation where there are multiple people on the Dapp creating a campaign, the id will be base on who is processsed first. The campaig id will also be show on the campaign page.",
      ],
      external_link: {
        name: "VIewing The Source Code",
        url: "https://github.com/UpgradeOfficial/feducia",
      },
    },
  ];
  return (
    <section className="bg-white dark:bg-gray-900 relative">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <h2 className="mb-8 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
          Frequently asked questions
        </h2>
        <div className="grid pt-8 text-left border-t border-gray-200 md:gap-16 dark:border-gray-700 md:grid-cols-2">
          {questions.map((question) => (
            <FaqQuestion
              question={question.title}
              answer={question.answer}
              link={question.external_link}
            />
          ))}
        </div>
      </div>
      <FAQModal visible={modalState} onClose={toggleModalState} />
    </section>
  );
};

export default FAQ;
