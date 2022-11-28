import { ethers } from "ethers";
import React, { useState, useEffect } from "react";
const GoalRating = ({ goal, pledge }) => {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    let rating = Math.floor((pledge / goal) * 5);
    rating = rating > 5 ? 5 : rating;
    setRating(rating);
  }, []);
  return (
    <>
      <span className="flex items-center">
        {[...Array(rating)].map((_, index) => (
          <svg
            key={index}
            fill="currentColor"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 text-red-500"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
          </svg>
        ))}

        <span className="text-gray-600 ml-3">
          Goal: {ethers.utils.formatEther(goal.toString())} Matic
        </span>
      </span>
    </>
  );
};

export default GoalRating;
