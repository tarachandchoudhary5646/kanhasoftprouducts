'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCoupon } from '../Action';

function Cart() {
    const dispatch = useDispatch();
    const cartReduxData = useSelector((state) => state.addProductData)

    
    const [cartData, setCartData] = useState();
    const [totalAmount, setTotalAmount] = useState(0);
    const [delveryAmount, setDeliveryAmount] = useState(0);
    const [coupon, setCoupon] = useState('');
    const [appluButton, setApplyButton] = useState(false)

    useEffect(()=>{
      
      if(cartReduxData){
        setTotalAmount(cartReduxData.totalAmount)
        setDeliveryAmount(cartReduxData.deliveryFee)
        setCartData(cartReduxData.items)
      }
      console.log(cartReduxData);
    }, [appluButton])

    const applyCoupon = () => {
      dispatch(addCoupon(coupon));
      setApplyButton(!appluButton)
    };

  return (
    <div className='max-w-[1300px] mx-auto px-3 mt-6'>
      <div className='grid grid-cols-3 gap-4'>
        <div className='col-span-2 bg-slate-100 rounded-md overflow-hidden'>
          <h2 className='bg-slate-200 px-2 py-2'>Cart item</h2>
          <div className='p-3'>
            {
              cartData?.map((item, index)=>{
                return(
                  <>
                    <div className='flex items-center bg-white border border-slate-400 p-3 rounded-md mb-2'>
                        <div>
                          <Image width={100} height={100} src={item.image} alt={item.title}/>
                        </div>
                        <div className=''>
                          <h3 className='mb-2'>{item.name}</h3>
                          <p className='font-semibold'>{item.price}</p>
                        </div>
                    </div>
                  </>
                )
              })
            }
          </div>
        </div>
        <div className='col-span-1 bg-slate-100 rounded-md overflow-hidden'>
          <h2 className='bg-slate-200 px-2 py-2'>Cart Total</h2>
          <div className='p-3'>
            <ul>
              <li className='flex justify-between border-b py-2'>
                <p>Delivery Fee</p>
                <span className='font-semibold'>{delveryAmount}</span>
              </li>
              <li>
                <p>Coupon</p>
                <div className='flex justify-between'>
                  <input 
                    type="text" 
                    value={coupon} 
                    onChange={(e) => setCoupon(e.target.value)} 
                    placeholder="Enter coupon code" 
                  />
                  <button onClick={applyCoupon}>Apply</button>
                </div>
              </li>
            </ul>
          </div>
          <div className='flex justify-between bg-slate-200 px-2 py-2'>
            <h4 className='flex items-center'>Cart Total - <span className='text-green-600'>{totalAmount}</span></h4>
            <button className='bg-green-600 rounded-md text-white py-2 px-3'>Pay now</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
