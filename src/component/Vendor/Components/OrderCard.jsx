import React from 'react'

const OrderCard = ({tittle, number, handleClick}) => {
  return (
    <div onClick={handleClick} className='order-card flex flex-column flex-center'>
        <p className='flex flex-center'>{tittle} Orders</p>
        <h1 className='flex flex-center'>{number}</h1>
        <div className='circle1'></div>
        <div className='circle2'></div>
        <div className='circle3'></div>
        <div className='circle4'></div>
    </div>
  )
}

export default OrderCard