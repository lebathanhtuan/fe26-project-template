import { takeEvery, debounce, put } from "redux-saga/effects";
import axios from "axios";

import { PRODUCT_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";

function* getProductListSaga(action) {
  try {
    const { params, more } = action.payload;
    const result = yield axios.get("http://localhost:4000/products", {
      params: {
        _expand: "category",
        _page: params.page,
        _limit: params.limit,
        ...(params.categoryId && {
          categoryId: params.categoryId,
        }),
        ...(params.keyword && {
          q: params.keyword,
        }),
      },
    });
    yield put({
      type: SUCCESS(PRODUCT_ACTION.GET_PRODUCT_LIST),
      payload: {
        data: result.data,
        meta: {
          total: parseInt(result.headers["x-total-count"]),
          page: params.page,
          limit: params.limit,
        },
        more: more,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(PRODUCT_ACTION.GET_PRODUCT_LIST),
      payload: {
        error: "Đã có lỗi xảy ra!",
      },
    });
  }
}

function* getProductDetailSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios.get(`http://localhost:4000/products/${id}`, {
      params: {
        _expand: "category",
        _embed: "options",
      },
    });
    yield put({
      type: SUCCESS(PRODUCT_ACTION.GET_PRODUCT_DETAIL),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(PRODUCT_ACTION.GET_PRODUCT_DETAIL),
      payload: {
        error: "Đã có lỗi xảy ra!",
      },
    });
  }
}

function* createProductSaga(action) {
  try {
    const { values, options, callback } = action.payload;
    const result = yield axios.post("http://localhost:4000/products", values);
    for (let i = 0; i <= options.length; i++) {
      yield axios.post("http://localhost:4000/options", {
        productId: result.data.id,
        name: options[i].name,
        bonusPrice: options[i].bonusPrice,
      });
    }

    yield put({
      type: "CREATE_PRODUCT_SUCCESS",
      payload: {
        data: result.data,
      },
    });
    yield callback.goToList();
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
    const { id, values, options, callback } = action.payload;
    const result = yield axios.patch(
      `http://localhost:4000/products/${id}`,
      values
    );
    for (let i = 0; i <= options.length; i++) {
      if (options[i].id) {
        yield axios.patch(`http://localhost:4000/options/${options[i].id}`, {
          productId: result.data.id,
          name: options[i].name,
          bonusPrice: options[i].bonusPrice,
        });
      } else {
        yield axios.post("http://localhost:4000/options", {
          productId: result.data.id,
          name: options[i].name,
          bonusPrice: options[i].bonusPrice,
        });
      }
    }
    yield put({
      type: "UPDATE_PRODUCT_SUCCESS",
      payload: {
        data: result.data,
      },
    });
    yield callback.goToList();
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
  yield debounce(
    500,
    REQUEST(PRODUCT_ACTION.GET_PRODUCT_LIST),
    getProductListSaga
  );
  yield takeEvery(
    REQUEST(PRODUCT_ACTION.GET_PRODUCT_DETAIL),
    getProductDetailSaga
  );
  yield takeEvery("CREATE_PRODUCT_REQUEST", createProductSaga);
  yield takeEvery("UPDATE_PRODUCT_REQUEST", updateProductSaga);
  yield takeEvery("DELETE_PRODUCT_REQUEST", deleteProductSaga);
}
