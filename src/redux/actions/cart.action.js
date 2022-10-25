import { createAction } from "@reduxjs/toolkit";

import { CART_ACTION, REQUEST } from "../constants";

export const addToCartAction = createAction(REQUEST(CART_ACTION.ADD_TO_CART));
