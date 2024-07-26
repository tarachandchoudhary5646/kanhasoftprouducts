'use client';

import React, { useEffect, useState } from 'react';
import useFetch from '../components/useFetch';
import Loader from '../components/Loader';
import Image from 'next/image';
import { addToCart } from '../Action/index';
import { useDispatch, useSelector } from 'react-redux';

function ProductListing() {
    const { data, loader, error } = useFetch('https://fakestoreapi.com/products');
    const [productData, setProductData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorField, setErrorField] = useState(null);
    const perPageProduct = 3;
    const [initialStart, setInitialStart] = useState(0);
    const [showProduct, setShowProduct] = useState(perPageProduct);
    const [curPage, setCurPage] = useState(1);

    useEffect(() => {
        if (data) {
            setProductData(data);
            setLoading(loader);
            setErrorField(error);
        }
    }, [data, loader, error]);

    if (loading) {
        return <Loader />;
    }

    if (errorField) {
        return <p>{errorField}</p>;
    }

    const showMoreData = () => {
        setShowProduct((prev) => prev + perPageProduct);
    };

    const totalPages = Math.ceil(productData.length / perPageProduct);

    const changePage = (page) => {
        setCurPage(page);
        setInitialStart(page * perPageProduct - perPageProduct);
        setShowProduct(page * perPageProduct);
    };

    const dispatch = useDispatch();

    const addtocartFun = (item) => {
        console.log(item);
        dispatch(addToCart({image:item.image, name: item.title, category: item.category, price: item.price }))
    }
    
    return (
        <div className='max-w-[1300px] mx-auto px-3 mt-6'>
            <div className='grid grid-cols-3 gap-3'>
                {productData.slice(initialStart, showProduct).map((item) => (
                    <div key={item.id} className='bg-slate-50 shadow-sm p-2'>
                        <figure>
                            <Image width={200} height={200} src={item.image} alt={item.title} />
                        </figure>
                        <div className='p-2'>
                            <h3 className='text-xl font-semibold mb-2'>{item.title}</h3>
                            <span>{item.category}</span>
                            <p className='text-md font-bold mb-2'>{item.price}</p>
                            <button
                                onClick={() => addtocartFun(item)}
                                className='bg-red-600 rounded-md text-white p-2'
                            >
                                Add to cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {productData.length > perPageProduct && (
                <>
                    <div className='text-center mt-3'>
                        <button onClick={showMoreData} className='cursor-pointer bg-red-600 rounded-md text-white p-2'>
                            Load more
                        </button>
                    </div>
                    <div className=''>
                        <ul className='flex justify-center mt-9 gap-2'>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <li
                                    key={index}
                                    onClick={() => changePage(index + 1)}
                                    className={`${curPage === index + 1 ? 'bg-red-600 text-white' : 'bg-slate-200'} p-2 px-3 font-semibold text-xs cursor-pointer hover:bg-blue-500 hover:text-white duration-200`}
                                >
                                    {index + 1}
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
}

export default ProductListing;
