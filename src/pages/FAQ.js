import React, {useState, useContext} from "react";
import FaqQuestion from "../components/FaqQuestion";
import FAQModal from "../components/FAQModal";
import { useMoralis } from "react-moralis";
import { contractAddresses } from "../utils/constants";

const FAQ = () => {
  
  const [modalState, setModalState] = useState(false)
  const { chainId: chainIdHex } = useMoralis();
 

  const chainId = parseInt(chainIdHex);
  const crowdfundAddress =
    chainId in contractAddresses
      ? contractAddresses[chainId][contractAddresses[chainId].length - 1]
      : null;

  const toggleModalState = () => {
    setModalState(!modalState)
  }

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
       "We offer other services that will help to publicise and  make your campaign more successfull, coming soon!!!"
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
       "With that we will be able to show more feature such as 1. Who deposited, 2. Who withdraw 3. Who has collect a Refund e.t.c"
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
      <FAQModal visible={modalState} onClose={toggleModalState}/>
    </section>
  );
};

export default FAQ;
