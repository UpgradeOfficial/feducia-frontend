import React, {useState, useContext} from "react";
import AddButton from "../components/AddButton";
import FaqQuestion from "../components/FaqQuestion";
import FAQModal from "../components/FAQModal";
import { CampaignContext } from "../contexts/CampaignContext";

const FAQ = () => {
  const {  crowdfundAddress } =
    useContext(CampaignContext);
  const [modalState, setModalState] = useState(false)
  const toggleModalState = () => {
    setModalState(!modalState)
  }
  const questions = [
    {
      title: "How Do I Interact With The Dapp",
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
      title: "I can't click on refund",
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
      title: "Can I use Windster in open-source projects?",
      answer: [
        "Generally, it is accepted to use Windster in open-source projects, along as it is not a UI library, a theme, a template, a page-builderthat would be considered as an alternative to Windster itself.",
        " With that being said, feel free to use this design kit for your open-source projects.",
      ],
      external_link: {
        name: "reading the license",
        url: "/license",
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
      <AddButton handleClick={toggleModalState}/>
      <FAQModal visible={modalState} onClose={toggleModalState}/>
    </section>
  );
};

export default FAQ;
