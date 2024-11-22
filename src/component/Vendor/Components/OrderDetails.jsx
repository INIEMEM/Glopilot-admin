import React from 'react'

const OrderDetails = ({order}) => {
  return (
    <div>
        <h3>Order Details</h3>
        <p>Status: {order?.status}</p>
        <p>Total Cost: ${order?.totalCost}</p>
        <p>Delivery Mode: {order?.deliveryMode}</p>
        <p>Product Rate: {order?.rateProduct}</p>
        <p>Quantity: {order?.quantity}</p>
        <p>Payment Status: {order?.paymentStatus}</p>
       
    </div>
  )
}

export default OrderDetails