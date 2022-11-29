import {console} from "console-browserify"

export function parseError(message) {
  let errMsg;
  const errorDict = [
    {
      name: "CrowdFundContract_PastDateSelected",
      errorMessage: "The date or time has passed, choose a current date",
    },
    {
      name: "CrowdFundContract_StartDateGreaterThanEndDate",
      errorMessage: "Start Date should be less than end date",
    },
    {
      name: "CrowdFundContract_EndDateGreaterThanMaxDuration",
      errorMessage: "End Should be less than or equal 365 days from today",
    },
    {
      name: "CrowdFundContract_CampaignNotStarted",
      errorMessage: "Campaign has not started",
    },
    {
      name: "CrowdFundContract_CampaignEnded",
      errorMessage: "Campaign has Ended",
    },
    {
      name: "CrowdFundContract_CampaignNotEnded",
      errorMessage: "Campaign not Ended",
    },
    {
      name: "CrowdFundContract_CampaignFundClaimed",
      errorMessage: "The Campaign Fund has been claimed",
    },
    {
      name: "CrowdFundContract_CampaignCancelled",
      errorMessage: "The Campaign has been cancelled",
    },
    {
      name: "CrowdFundContract_CampaignGoalAchieved",
      errorMessage: "The Campaign goal was achieved",
    },
    {
      name: "CrowdFundContract_PledgeNotFound",
      errorMessage: "You don't have any pledge",
    },
    {
      name: "CrowdFundContract_CampaignCancelled",
      errorMessage: "The campaign is Cancelled",
    },
    {
      name: "CrowdFundContract_NotCampaignOwner",
      errorMessage: "You are not the owner of this campaign",
    },
    {
      name: " CrowdFundContract_NotContractOwner",
      errorMessage: "You are not the owner of this contract",
    },
    {
      name: "CrowdFundContract_CampaignWithdrawalDateNotReached",
      errorMessage: "Withrawal date has not been reached",
    },
    {
      name: "CrowdFundContract_FailedToSendEther",
      errorMessage: "Ether was not transfered",
    },
    {
      name: "CrowdFundContract_WithdrawalGreaterThanYourPledge",
      errorMessage: "Your Withdrawal cannot be greater than your pledge",
    },
  ];


  errorDict.map((err) => {
    // console.log(err.name, message.includes(err.name))
    if (message.includes(err.name)) {
      errMsg = err.errorMessage;
    }
  });
  return errMsg
}
