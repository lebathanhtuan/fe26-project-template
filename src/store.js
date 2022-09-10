import { configureStore } from "@reduxjs/toolkit";

import productReducer from "./redux/reducers/product.reducer";

export const store = configureStore({
  reducer: {
    // user: userReducer,
    product: productReducer,
  },
});
