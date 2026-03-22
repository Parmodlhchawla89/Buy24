import React from 'react';
import { Link } from 'react-router-dom';
import {formatPrice} from "../../utils/helpers";
import "./Product.scss";

const Product = ({product}) => {
    let discountedPrice = (product?.price) - (product?.price * (product?.discount?.discountPercent / 100));

  return (
    <Link to = {`/product/${product?.id}`} key = {product?.id}>
      <div className='product-item bg-white'>
        {/* <div className='category'>{product?.category.categoryName}</div> */}
        <div className='product-item-img'>
          <img
            className='img-cover'
            src={
              Array.isArray(product?.images) && product.images.length > 0 && product.images[0]?.url
                ? product.images[0].url
                : require('../../assets/images/slider_img_1.jpg')
            }
            alt={product.name}
          />
        </div>
        <div className='product-item-info fs-14'>
          <div className='brand'>
            <span>Brand: </span>
            <span className='fw-7'>{product?.brand}</span>
          </div>
          <div className='title py-2'>
            {product?.name}
          </div>
          <div className='price flex align-center justify-center'>
            <span className='old-price'>
              {formatPrice(product?.price)}
            </span>
            <span className='new-price'>
              {formatPrice(discountedPrice)}
            </span>
            <span className='discount fw-6'>
              ({product?.discount?.discountPercent}% Off)
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Product