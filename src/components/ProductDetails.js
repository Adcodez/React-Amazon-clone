import React from 'react'
import { useParams } from 'react-router-dom'

const ProductsDetails = () => {
    const params = useParams();
  return (
    <div>
      <h1>Product Details Page</h1>
      <p>{params.id}</p>
    </div>
  )
}

export default ProductsDetails
