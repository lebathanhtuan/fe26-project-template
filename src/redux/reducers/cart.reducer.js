import { createReducer } from "@reduxjs/toolkit";

import { CART_ACTION, REQUEST } from "../constants";

const initialState = {
  cartList: JSON.parse(localStorage.getItem("cart")) || [],
};

const categoryReducer = createReducer(initialState, {
  [REQUEST(CART_ACTION.ADD_TO_CART)]: (state, action) => {
    let newCartList = [...state.cartList];
    const { productId, quantity } = action.payload;
    const exitProductIndex = state.cartList.findIndex(
      (item) => item.productId === productId
    );
    if (exitProductIndex !== -1) {
      newCartList.splice(exitProductIndex, 1, {
        ...state.cartList[exitProductIndex],
        quantity: state.cartList[exitProductIndex].quantity + quantity,
      });
    } else {
      newCartList = [...state.cartList, action.payload];
    }
    localStorage.setItem("cart", JSON.stringify(newCartList));
    return {
      ...state,
      cartList: newCartList,
    };
  },
});

export default categoryReducer;
