import React from 'react'
import { useNavigate } from 'react-router-dom'
const LongCard = ({name, content, type, link}) => {
  const navigate = useNavigate()
  return (
    <div className="user-div-dashboard user-div-dashboard2" onClick={()=> link && navigate(link)}>
    <div className="flex flex-justify-between">
      <div style={{position:'relative'}}>
        <p className='user-plan-txt'>see more</p>
        <p className='user-plan-txt1'>{type}</p>
        
      </div>
      <div className='user-div-dashboard-big-div flex flex-center'>{name}</div>
    </div>
    <div className="admin-table-dash-holder" style={{position:'relative'}}>
    {content}
  
    </div>
    
  </div>
  )
}

export default LongCard