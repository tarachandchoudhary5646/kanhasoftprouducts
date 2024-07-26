'use client';

export const addToCart = (data) => {
    return {
        type: 'ADD_TO_CART',
        payload: data
    };
};

export const addCoupon = (data) => {
    return {
        type: 'ADD_COUPON',
        payload: data
    };
};