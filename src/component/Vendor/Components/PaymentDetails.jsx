import React from 'react'

const PaymentDetails = ({payment}) => {
  return (
    <div>
        <h3>Payment Details</h3>
        <p>Amount: ${payment?.paymentAmount}</p>
        <p>Status: {payment?.paymentStatus}</p>
        <p>Method: {payment?.paymentMethod}</p>
        <p>Details: {payment?.paymentMethod}</p>
        
    </div>
  )
}

export default PaymentDetails