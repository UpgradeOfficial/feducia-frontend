import React, { useState, useContext, useEffect } from "react";
import Search from "../components/Search";
import CampaignCard from "../components/CampaignCard";

import { CampaignContext } from "../contexts/CampaignContext";
import { Link, useNavigate } from "react-router-dom";
import AddButton from "../components/AddButton";
import AddCampaign from "../components/AddCampaign";
import { useMoralis } from "react-moralis";
const Home = () => {
  const [campaigns, setCampaigns] = useState([]);
  const { crowdfund, setActiveCampaign, provider } =
    useContext(CampaignContext);
  const navigate = useNavigate();

  const [modalState, setModalState] = useState(false);
  const { chainId: chainIdHex, isWeb3Enabled, Moralis, account } = useMoralis()
  const toggleModalState = () => {
    setModalState(!modalState);
  };

  useEffect(() => {
    const loadCampaigns = async () => {
      const numOfcampaigns = await crowdfund.getNumberOfCampaigns();
      const campaigns = [];

      for (var i = 1; i <= numOfcampaigns; i++) {
        const campaign = await crowdfund.getCampaignById(i);
        campaigns.push(campaign);
      }
      setCampaigns(campaigns);
      // this will change the account
    };
    crowdfund && loadCampaigns();
  }, [crowdfund]);

  const handleClick = (campaign) => {
    setActiveCampaign(campaign);
    navigate("/campaign/");
  };

  return (
    <div className="Home">
      <Search crowdfund = {crowdfund} setCampaigns={setCampaigns}/>
      {/* <div className=" p-4 m-4"> */}
        <div className=" grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
          {campaigns.length > 0 ? (
            campaigns.map((campaign, index) => (
              <CampaignCard key={campaign.id.toString()} campaign={campaign} />
            ))
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
        </div>
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
