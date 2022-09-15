import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

function* getProductListSaga() {
  try {
    const result = yield axios.get(
      "http://localhost:4000/products?_expand=category"
    );
    yield put({
      type: "GET_PRODUCT_LIST_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: "GET_PRODUCT_LIST_FAIL",
      payload: {
        error: "Đã có lỗi xảy ra!",
      },
    });
  }
}

function* createProductSaga(action) {
  try {
    const { values } = action.payload;
    const result = yield axios.post("http://localhost:4000/products", values);
    yield put({
      type: "CREATE_PRODUCT_SUCCESS",
      payload: {
        data: result.data,
      },
    });
    yield put({ type: "GET_PRODUCT_LIST_REQUEST" });
  } catch (e) {
    yield put({
      type: "CREATE_PRODUCT_FAIL",
      payload: {
        error: "Đã có lỗi xảy ra!",
      },
    });
  }
}

function* updateProductSaga(action) {
  try {
    const { values, id } = action.payload;
    const result = yield axios.patch(
      `http://localhost:4000/products/${id}`,
      values
    );
    yield put({
      type: "UPDATE_PRODUCT_SUCCESS",
      payload: {
        data: result.data,
      },
    });
    yield put({ type: "GET_PRODUCT_LIST_REQUEST" });
  } catch (e) {
    yield put({
      type: "UPDATE_PRODUCT_FAIL",
      payload: {
        error: "Đã có lỗi xảy ra!",
      },
    });
  }
}

function* deleteProductSaga(action) {
  try {
    const { id } = action.payload;
    yield axios.delete(`http://localhost:4000/products/${id}`);
    yield put({ type: "DELETE_PRODUCT_SUCCESS" });
    yield put({ type: "GET_PRODUCT_LIST_REQUEST" });
  } catch (e) {
    yield put({
      type: "DELETE_PRODUCT_FAIL",
      payload: {
        error: "Đã có lỗi xảy ra!",
      },
    });
  }
}

export default function* productSaga() {
  yield takeEvery("GET_PRODUCT_LIST_REQUEST", getProductListSaga);
  yield takeEvery("CREATE_PRODUCT_REQUEST", createProductSaga);
  yield takeEvery("UPDATE_PRODUCT_REQUEST", updateProductSaga);
  yield takeEvery("DELETE_PRODUCT_REQUEST", deleteProductSaga);
}
