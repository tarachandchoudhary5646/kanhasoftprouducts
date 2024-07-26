'use client';


const initialData = {
    items: [],
    totalAmount: 0,
    deliveryFee: 0,
    coupon: null
};

const addCouponReducer = (state = initialData, action) => {
    switch (action.type) {
        case 'ADD_COUPON':
            const itemData = action.payload;
            console.log(itemData);
            const couponCode = itemData.coupon
            let discount = 0;

            if (couponCode === 'COPX') {
                discount = Math.min(state.totalAmount * 0.1, 100);
            } else if (couponCode === 'COPY') {
                discount = Math.min(state.totalAmount * 0.2, 150);
            } else if (couponCode === 'COPZ') {
                discount = Math.min(state.totalAmount * 0.3, 200);
            }

            state.totalAmount -= discount;
            state.coupon = couponCode;
            state.items = itemData.items;
            state.deliveryFee= itemData.deliveryFee
            console.log(state)
            return {
                ...state,
                coupon:couponCode
            };
        default:
            return state;
    }

    
};

export default addCouponReducer;
