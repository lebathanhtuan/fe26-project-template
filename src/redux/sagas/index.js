import { fork } from "redux-saga/effects";

import productSaga from "./product.saga";
import categorySaga from "./category.saga";
import userSaga from "./user.saga";
import locationSaga from "./location.saga";

export default function* rootSaga() {
  yield fork(productSaga);
  yield fork(categorySaga);
  yield fork(userSaga);
  yield fork(locationSaga);
}
