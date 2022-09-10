import { createReducer } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  productList: [],
  productDetail: {},
};

const productReducer = createReducer(initialState, {
  CREATE_PRODUCT: (state, action) => {
    const { values } = action.payload;
    const newProduct = {
      id: uuidv4(),
      ...values,
    };
    return {
      ...state,
      productList: [newProduct, ...state.productList],
    };
  },
  UPDATE_PRODUCT: (state, action) => {
    const { id, values } = action.payload;
    const newProductList = [...state.productList];
    const newProduct = {
      ...values,
      id: id,
    };
    const index = state.productList.findIndex((item) => item.id === id);
    newProductList.splice(index, 1, newProduct);
    return {
      ...state,
      productList: newProductList,
    };
  },
  DELETE_PRODUCT: (state, action) => {
    const { id } = action.payload;
    const newProductList = state.productList.filter((item) => item.id !== id);
    return {
      ...state,
      productList: newProductList,
    };
  },
});

export default productReducer;
