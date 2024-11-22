import React from 'react'
import { Outlet } from 'react-router-dom'
const MessageLayout = () => {
  return (
    <div style={{position: 'relative'}}><Outlet/></div>
  )
}

export default MessageLayout