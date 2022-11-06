import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import "moment/locale/vi";

import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";
import LoginLayout from "./layouts/LoginLayout";

import AdminProductListPage from "./pages/admin/ProductListPage";
import AdminCreateProductPage from "./pages/admin/CreateProductPage";
import AdminUpdateProductPage from "./pages/admin/UpdateProductPage";

import HomePage from "./pages/user/HomePage";
import ProductListPage from "./pages/user/ProductListPage";
import ProductDetailPage from "./pages/user/ProductDetailPage";
import CheckoutPage from "./pages/user/CheckoutPage";
import AboutPage from "./pages/AboutPage";
import ProfilePage from "./pages/user/ProfilePage";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import { ROUTES } from "./constants/routes";
import { getUserInfoAction } from "./redux/actions";

import styles from "./App.module.css";
import * as S from "./styles";

function App() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const decodeInfo = jwtDecode(accessToken);
      dispatch(getUserInfoAction({ id: decodeInfo.sub }));
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className={styles.globalContainer}>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path={ROUTES.ADMIN.DASHBOARD} element={<div>Dashboard</div>} />
          <Route
            path={ROUTES.ADMIN.PRODUCT_LIST}
            element={<AdminProductListPage />}
          />
          <Route
            path={ROUTES.ADMIN.CREATE_PRODUCT}
            element={<AdminCreateProductPage />}
          />
          <Route
            path={ROUTES.ADMIN.UPDATE_PRODUCT}
            element={<AdminUpdateProductPage />}
          />
        </Route>
        <Route element={<UserLayout />}>
          <Route path={ROUTES.USER.HOME} element={<HomePage />} />
          <Route
            path={ROUTES.USER.PRODUCT_LIST}
            element={<ProductListPage />}
          />
          <Route
            path={ROUTES.USER.PRODUCT_DETAIL}
            element={<ProductDetailPage />}
          />
          <Route path={ROUTES.USER.CHECKOUT} element={<CheckoutPage />} />
          <Route path={ROUTES.USER.ABOUT} element={<AboutPage />} />
          <Route path={ROUTES.USER.PROFILE} element={<ProfilePage />} />
        </Route>
        <Route element={<LoginLayout />}>
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
