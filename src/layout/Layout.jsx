import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='main-layout' style={{position: 'relative'}}>
      <div className='main-layouts-btn flex flex-center'>You can only access this using a laptop</div>
      <div className="main-layouts"><Outlet/></div>
    </div>
  )
}

export default Layout