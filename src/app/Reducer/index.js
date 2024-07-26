'use client';

import { combineReducers } from '@reduxjs/toolkit';
import addProductData from './addtocart';
import addCouponReducer from './addCoupon';

const rootReducer = combineReducers({
    addProductData
});

export default rootReducer;
