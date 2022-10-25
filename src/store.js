import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import userReducer from "./redux/reducers/user.reducer";
import productReducer from "./redux/reducers/product.reducer";
import categoryReducer from "./redux/reducers/category.reducer";
import cartReducer from "./redux/reducers/cart.reducer";

import rootSaga from "./redux/sagas";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    category: categoryReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }),
    sagaMiddleware,
  ],
});

sagaMiddleware.run(rootSaga);

export { store };
