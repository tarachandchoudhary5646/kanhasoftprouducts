'use client';

const initialData = {
    items: [],
    totalAmount: 0,
    deliveryFee: 0,
    coupon: null
};

const addProductData = (state = initialData, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const newItem = action.payload;
            const updatedItems = [...state.items, newItem];
            const updatedTotalAmount = state.totalAmount + newItem.price;
            const updatedDeliveryFee = updatedTotalAmount < 500 ? 50 : 0;
            return {
                ...state,
                items: updatedItems,
                totalAmount: updatedTotalAmount,
                deliveryFee: updatedDeliveryFee
            };
        case 'ADD_COUPON':
            const couponCode = action.payload;
            let discount = 0;

            if (couponCode === 'COPX') {
                discount = Math.min(state.totalAmount * 0.1, 100);
            } else if (couponCode === 'COPY') {
                discount = Math.min(state.totalAmount * 0.2, 150);
            } else if (couponCode === 'COPZ') {
                discount = Math.min(state.totalAmount * 0.3, 200);
            }

            const discountedTotalAmount = state.totalAmount - discount;
            return {
                ...state,
                totalAmount: discountedTotalAmount,
                coupon: couponCode
            };
        default:
            return state;
    }

    console.log(state)
};

export default addProductData;
