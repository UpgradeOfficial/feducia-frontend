import { ethers } from "ethers";
import React from "react";
import { Link } from "react-router-dom";
const CampaignCard = ({ campaign }) => {
  return (
    <div className="m-auto w-5/6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img
          className="rounded-t-lg"
          src="/docs/images/blog/image-1.jpg"
          alt=""
        />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className=" text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {campaign.name}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Goal: {ethers.utils.formatEther(campaign.goal.toString())} MATIC
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Pledged: {ethers.utils.formatEther(campaign.pledged.toString())}
        </p>
        <p>Creator: {campaign.creator.slice(0, 6) + "..." + campaign.creator.slice(38, 42)}</p>
        <Link
          to={`/campaign/${campaign.id.toString()}`}
          className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
          <svg
            aria-hidden="true"
            className="ml-2 -mr-1 w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default CampaignCard;
