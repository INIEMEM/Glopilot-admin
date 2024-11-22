import React from 'react'


const ProductDetails = ({product}) => {
  return (
    <div>
        <h3>Product Details</h3>
        <p>Name: {product?.productName}</p>
        <p>Brand: {product?.brand}</p>
        <p>Category: {product?.productCategory}</p>
        <p>Price: ${product?.price}</p>
        <p>Description: {product?.productDescription}</p>
        <p>Discount Price: {product?.discountPrice}</p>
        <p>Quantity: {product?.quantity}</p>
        <p>Status: {product?.status}</p>
        {/* Display images */}
        <div>
            {product.images.map((img, index) => (
                <img key={index} src={img} alt={product.productName} />
            ))}
        </div>
    </div>
  )
}

export default ProductDetails