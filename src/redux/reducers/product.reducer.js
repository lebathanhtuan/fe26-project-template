import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  productList: {
    data: [],
    loading: false,
    error: "",
  },
  productDetail: {
    data: {},
    loading: false,
    error: "",
  },
  createProductData: {
    loading: false,
    error: "",
  },
  updateProductData: {
    loading: false,
    error: "",
  },
  deleteProductData: {
    loading: false,
    error: "",
  },
};

const productReducer = createReducer(initialState, {
  GET_PRODUCT_LIST_REQUEST: (state, action) => {
    return {
      ...state,
      productList: {
        ...state.productList,
        loading: true,
        error: "",
      },
    };
  },
  GET_PRODUCT_LIST_SUCCESS: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      productList: {
        ...state.productList,
        data: data,
        loading: false,
      },
    };
  },
  GET_PRODUCT_LIST_FAIL: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      productList: {
        ...state.productList,
        loading: false,
        error: error,
      },
    };
  },

  CREATE_PRODUCT_REQUEST: (state, action) => {
    return {
      ...state,
      createProductData: {
        ...state.createProductData,
        loading: true,
        error: "",
      },
    };
  },
  CREATE_PRODUCT_SUCCESS: (state, action) => {
    return {
      ...state,
      createProductData: {
        ...state.createProductData,
        loading: false,
      },
    };
  },
  CREATE_PRODUCT_FAIL: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      createProductData: {
        ...state.createProductData,
        loading: false,
        error: error,
      },
    };
  },

  UPDATE_PRODUCT_REQUEST: (state, action) => {
    return {
      ...state,
      updateProductData: {
        ...state.updateProductData,
        loading: true,
        error: "",
      },
    };
  },
  UPDATE_PRODUCT_SUCCESS: (state, action) => {
    return {
      ...state,
      updateProductData: {
        ...state.updateProductData,
        loading: false,
      },
    };
  },
  UPDATE_PRODUCT_FAIL: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      updateProductData: {
        ...state.updateProductData,
        loading: false,
        error: error,
      },
    };
  },

  DELETE_PRODUCT_REQUEST: (state, action) => {
    return {
      ...state,
      deleteProductData: {
        ...state.deleteProductData,
        loading: true,
        error: "",
      },
    };
  },
  DELETE_PRODUCT_SUCCESS: (state, action) => {
    return {
      ...state,
      deleteProductData: {
        ...state.deleteProductData,
        loading: false,
      },
    };
  },
  DELETE_PRODUCT_FAIL: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      deleteProductData: {
        ...state.deleteProductData,
        loading: false,
        error: error,
      },
    };
  },
});

export default productReducer;
