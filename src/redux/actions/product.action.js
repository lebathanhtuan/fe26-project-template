import { createAction } from "@reduxjs/toolkit";

import { PRODUCT_ACTION, REQUEST } from "../constants";

export const getProductListAction = createAction(
  REQUEST(PRODUCT_ACTION.GET_PRODUCT_LIST)
);
export const getProductDetailAction = createAction(
  REQUEST(PRODUCT_ACTION.GET_PRODUCT_DETAIL)
);
export const createProductAction = createAction("CREATE_PRODUCT_REQUEST");
export const updateProductAction = createAction("UPDATE_PRODUCT_REQUEST");
export const deleteProductAction = createAction("DELETE_PRODUCT_REQUEST");
