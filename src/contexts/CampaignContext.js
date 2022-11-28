import { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { abi as crowdfundABI, contractAddresses } from "../utils/constants";

export const CampaignContext = createContext();
export const CampaignContextProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [network, setNetwork] = useState(null);
  const [crowdfund, setCrowdfund] = useState(null);
  const [crowdfundAddress, setCrowdfundAddress] = useState(null);
  const [activeCampaign, setActiveCampaign] = useState(null);

  const loadblockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // this is a way to get  the accounts
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const network = await provider.getNetwork();
    const crowdfundAddress = contractAddresses[network.chainId][0];
    const crowdfund = new ethers.Contract(
      crowdfundAddress,
      crowdfundABI,
      provider
    );

    setAccount(accounts[0]);
    setCrowdfund(crowdfund);
    setProvider(provider);
    setNetwork(network);
  };

  window.ethereum.on("accountsChanged", async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = ethers.utils.getAddress(accounts[0]);
    setAccount(account);
  });

  useEffect(() => {
    const loadblockchainData = async () => {
      if (!account) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // this is a way to get  the accounts
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const network = await provider.getNetwork();
        const crowdfundAddress = contractAddresses[network.chainId][0];
        const crowdfund = new ethers.Contract(
          crowdfundAddress,
          crowdfundABI,
          provider
        );
        setCrowdfundAddress(crowdfundAddress)
        setAccount(accounts[0]);
        setCrowdfund(crowdfund);
        setProvider(provider);
        setNetwork(network);
      }
      window.ethereum.on("accountsChanged", async () => {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = ethers.utils.getAddress(accounts[0]);
        setAccount(account);
      });
    };
    loadblockchainData();
  }, []);

  const data = {
    account,
    setAccount,
    provider,
    setProvider,
    network,
    setNetwork,
    activeCampaign,
    setActiveCampaign,
    crowdfund,
    loadblockchainData,
    crowdfundAddress
  };

  return (
    <CampaignContext.Provider value={data}>{children}</CampaignContext.Provider>
  );
};
