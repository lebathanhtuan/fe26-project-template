import { createAction } from "@reduxjs/toolkit";

export const createProductAction = createAction("CREATE_PRODUCT");
export const updateProductAction = createAction("UPDATE_PRODUCT");
export const deleteProductAction = createAction("DELETE_PRODUCT");
