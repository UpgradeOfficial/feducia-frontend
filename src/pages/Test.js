import React from 'react'
import CountDown from '../components/CountDown'
import GoalRating from '../components/GoalRating'

const Test = () => {
  return (
    <div>
        {/* <CountDown countdownTimestampMs={2738686000000000}/> */}
        <GoalRating  goal={1000} pledge={600} />
    </div>
  )
}

export default Test