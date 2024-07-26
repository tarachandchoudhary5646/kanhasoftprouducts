'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { MdOutlineShoppingCart } from "react-icons/md";
import { useSelector } from 'react-redux';

function Header() {

    const cartReduxData = useSelector((state) => state.addProductData)
    const [countCart, setCountCart] = useState(0)

    useEffect(()=>{
        if(cartReduxData){
            setCountCart(cartReduxData.items.length)
        }
    }, [cartReduxData])

  return (
    <>
      <div className='bg-white shadow-sm px-4 py-4 flex justify-between'>
        <div className=''>
            <h1 className='text-xl'><Link className='cursor-pointer' href={'/'}>KanhaSoft <span className='text-sm text-red-600'>products</span></Link></h1>
        </div>
        <div>
            <ul className='flex items-center'>
                <li className='mr-4'>
                    <Link className='text-md font-semibold' href={'/'}>Producst</Link>
                </li>
                <li className='relative'>
                    <Link className='text-xl' href={'/cart'}><MdOutlineShoppingCart className='text-2xl' /></Link>
                    <span className='bg-red-600 text-white absolute rounded-full w-5 h-5 flex items-center justify-center -top-2 -right-2 text-sm'>{countCart}</span>
                </li>
            </ul>
        </div>
      </div>
    </>
  )
}

export default Header
