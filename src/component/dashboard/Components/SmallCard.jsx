import React from 'react'
import CountUp from 'react-countup';
import { useNavigate } from 'react-router-dom';

const SmallCard = ({type, link, activeCount, pendingCount, declinedCount, name, animation}) => {
  const navigate = useNavigate();
  return (
    <div className={`${animation ? 'user-div-dashboard1 user-div-dashboard  flex flex-justify-between': 'user-div-dashboard  flex flex-justify-between'}`}  onClick={()=> link && navigate(link)}>
      <div style={{position:'relative'}}>
        <p className='user-plan-txt'>see more</p>
        <p className='user-plan-txt1'>{type}</p>
        <div className='users-dash-count flex flex-column  '>
          <p>
            <CountUp start={0} end={activeCount}>
              
            </CountUp> Active 
            </p>
            <p className='pending-txt-user'>
            <CountUp start={0} end={pendingCount}>
              
            </CountUp> Pending 
            </p>
            <p className='declined-txt-user'>
            <CountUp start={0} end={declinedCount}>
              
            </CountUp> declined 
            </p>
            
            
        </div>
      </div>
      <div className='user-div-dashboard-big-div flex flex-center'>All {name}</div>
  </div>
  )
}

export default SmallCard