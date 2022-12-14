import React, { useEffect, useState } from "react";
import { CAMPAIGN_ENDED, CAMPAIGN_NOT_STARTED, CAMPAIGN_STARTED, ZERO_TIME } from "../utils/constants";
import { getRemainingTimeUntilMsTimestamp } from "../utils/countdownUtils";
const defaultRemainingTime = {
  seconds: '00',
  minutes: '00',
  hours: '00',
  days: '00'
}
const CountDown = ({ countdownTimestampMs, getCampaignStatus }) => {
  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);
  function updateRemainingTime(countdown) {
    const get_remaining_time = getRemainingTimeUntilMsTimestamp(countdown)
    if (Object.values(get_remaining_time).every(e=> e === "00")){
    }
    setRemainingTime(get_remaining_time);
}

    useEffect(() => {
        const intervalId = setInterval(() => {
            updateRemainingTime(countdownTimestampMs(getCampaignStatus()));
        }, 1000);
        return () => clearInterval(intervalId);
    },[countdownTimestampMs(getCampaignStatus())]);

  if (defaultRemainingTime){

  }
   
  const getCountDownMessage = () =>{
    const message = getCampaignStatus()
    if(message === CAMPAIGN_STARTED) return "COUNTDOWN TO END OF CAMPAIGN"
    else if (message === CAMPAIGN_ENDED) return "COUNTDOWN TO FUND MATURITY"
    else if (message === CAMPAIGN_NOT_STARTED) return "COUNTDOWN TO  CAMPAIGN OPENING"
  }
  // if () return null;
  return (
    <div>
      <div className="flex place-content-center">
        <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              <span style={{ "--value": remainingTime.days }}>
                {remainingTime.days}
              </span>
            </span>
            days
          </div>
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              <span style={{ "--value": 10 }}>{remainingTime.hours}</span>
            </span>
            hours
          </div>
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              <span style={{ "--value": 24 }}>{remainingTime.minutes}</span>
            </span>
            min
          </div>
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              <span style={{ "--value": 39 }}>{remainingTime.seconds}</span>
            </span>
            sec
          </div>
        </div>
      </div>

      <div className="flex place-content-center text-black">
         {getCountDownMessage()}
      </div>
    </div>
  );
};

export default CountDown;
