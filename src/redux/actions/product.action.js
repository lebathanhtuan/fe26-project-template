import { createAction } from "@reduxjs/toolkit";

export const getProductListAction = createAction("GET_PRODUCT_LIST_REQUEST");
export const createProductAction = createAction("CREATE_PRODUCT_REQUEST");
export const updateProductAction = createAction("UPDATE_PRODUCT_REQUEST");
export const deleteProductAction = createAction("DELETE_PRODUCT_REQUEST");
