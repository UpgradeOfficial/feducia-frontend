import React from "react";

const FaqQuestion = ({ question, answer, link }) => {
  return (
    <div>
      <div className="mb-10">
        <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
          <svg
            className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
              clip-rule="evenodd"
            ></path>
          </svg>
          {question}
        </h3>
        {answer.map((ans) => (
          <p className="text-gray-500 dark:text-gray-400" key={ans}>
            {ans}
          </p>
        ))}
        <p className="text-gray-500 dark:text-gray-400">
          Find out more information by{" "}
          <a
            href={link.url}
            target="_blank"
            className="font-medium underline text-primary-600 dark:text-primary-500 hover:no-underline"
          >
            {link.name}
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default FaqQuestion;
