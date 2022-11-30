import React, { useState, useContext, useEffect } from "react";
import Search from "../components/Search";
import CampaignCard from "../components/CampaignCard";

import AddButton from "../components/AddButton";
import AddCampaign from "../components/AddCampaign";
import { useMoralis, useWeb3Contract } from "react-moralis";

import { contractAddresses, abi } from "../utils/constants";
import { ethers } from "ethers";
import Loader from "../components/Loader";

const Home = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [modalState, setModalState] = useState(false);
  const [crowdfund, setCrowdfund] = useState(false);
  const [provider, setProvider] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { chainId: chainIdHex } = useMoralis();

  const chainId = parseInt(chainIdHex);
  const crowdfundAddress =
    chainId in contractAddresses
      ? contractAddresses[chainId][contractAddresses[chainId].length - 1]
      : null;
  const runContractOptions = { abi, contractAddress: crowdfundAddress };
  const { runContractFunction: numberOfCampaigns } = useWeb3Contract({
    ...runContractOptions, // specify the networkId
    functionName: "getNumberOfCampaigns",
  });

  const toggleModalState = () => {
    setModalState(!modalState);
  };

  useEffect(() => {
    const loadCampaigns = async () => {
      setIsLoading(true);
      const numOfCampaigns = await numberOfCampaigns();
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const network = await provider.getNetwork();
      const crowdfund = new ethers.Contract(crowdfundAddress, abi, provider);
      const campaigns = [];

      for (var i = 1; i <= numOfCampaigns; i++) {
        const campaign = await crowdfund.getCampaignById(i);
        campaigns.push(campaign);
      }
      setCampaigns(campaigns);
      setIsLoading(false);
    };
    loadCampaigns();
  }, []);

  return (
    <div className="Home">
      <Search crowdfund={crowdfund} setCampaigns={setCampaigns} />
      {campaigns.length > 0 ? (
        <div className=" grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
          {campaigns.map((campaign, index) => (
            <CampaignCard key={campaign.id.toString()} campaign={campaign} />
          ))}
        </div>
      ) : isLoading ? (
        <Loader/>
      ) : (
        <div className="flex place-content-center">
          <section className="bg-white dark:bg-gray-900 grid-cols-1 place-content-center">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
              <div className="mx-auto max-w-screen-sm text-center">
                <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
                  Oooops
                </h1>
                <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
                  There are no campaigns to fund.
                </p>
                <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                  Start a campaign by clicking on the add button .{" "}
                </p>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* </div> */}
      <AddCampaign
        visible={modalState}
        onClose={toggleModalState}
        crowdfund={crowdfund}
        provider={provider}
      />
      <AddButton handleClick={toggleModalState} />
    </div>
  );
};

export default Home;
