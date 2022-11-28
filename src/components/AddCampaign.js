import { ethers } from "ethers";
import React, { useState} from "react";
// import DatePicker from "react-date-picker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { parseError } from "../utils/parseError";
const AddCampaign = ({ visible, onClose, crowdfund, provider }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [goal, setGoal] = useState(0);
  const [startAt, setStartAt] = useState(new Date());
  const [endAt, setEndAt] = useState(new Date());
  const navigate = useNavigate()

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formatGoal = ethers.utils.parseEther(goal);
    console.log(formatGoal.toString());
    const formatStartAt = Math.floor(startAt.getTime() / 1000);
    const formatEndAt = Math.floor(endAt.getTime() / 1000);

    try {
      const signer = await provider.getSigner();
      const transactionResponse = await crowdfund
        .connect(signer)
        .launch(name, formatGoal, formatStartAt, formatEndAt);
      const transactionReceipt = await transactionResponse.wait(1);
      const id = transactionReceipt.events[0].args.id.toString()
      console.log(transactionReceipt.events[0].args.id.toString())
      e.target.reset();

      setIsLoading(false);
      navigate(`/campaign/${id}/`)
      toast.success("Transaction Success");
      e.target.reset();
      onClose();
    } catch (err) {
      const errMsg = parseError(err.message);
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

              <div className="flex justify-between">
                {isLoading ? (
                  <button
                    disabled
                    type="button"
                    className="w-full  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center justify-center"
                  >
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline mr-3 w-4 h-4 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                    Loading...
                  </button>
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
