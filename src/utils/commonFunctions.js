import { CAMPAIGN_ENDED, CAMPAIGN_NOT_STARTED, CAMPAIGN_STARTED } from "./constants"

export const getCampaignCssStyle = (status) => {
    if (status === CAMPAIGN_ENDED) return "bg-red-100 text-red-800  dark:bg-red-200 dark:text-red-900 "
    else if (status === CAMPAIGN_NOT_STARTED) return "bg-orange-100 text-orange-800  dark:bg-orange-200 dark:text-orange-900 "
    else if (status === CAMPAIGN_STARTED) return "bg-green-100 text-green-800  dark:bg-green-200 dark:text-green-900 "
}

export const findTime = (num) => {
    if(num < 1){
       return '0'
    };
    const oneMinute = 60;
    const oneHour = oneMinute * 60;
    const oneDay = oneHour * 24;
    const oneYear = oneDay * 365;
    const times = {
       year: ~~(num / oneYear),
       day: ~~((num % oneYear) / oneDay),
       hour: ~~((num % oneDay) / oneHour),
       minute: ~~((num % oneHour) / oneMinute),
       second: num % oneMinute,
    };

    return times
 }
