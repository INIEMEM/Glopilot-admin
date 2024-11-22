import React from 'react'

const LongCard2 = ({content}) => {
  return (
    <div style={{flex: 1, gap:10}} className='user-div-dashboard-holder flex'>
      <div className="user-div-dashboard ">
        
        <div className="admin-table-dash-holder" style={{position:'relative'}}>
        {content}
        </div>
        
      </div>
      
    </div>
  )
}

export default LongCard2