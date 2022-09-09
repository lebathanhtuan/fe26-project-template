import { useState, createContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { Routes, Route } from "react-router-dom";

import AdminLayout from "./layouts/AdminLayout";
import LoginLayout from "./layouts/LoginLayout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import LoginPage from "./pages/LoginPage";

import styles from "./App.module.css";
import * as S from "./styles";

export const AppContext = createContext();

function App() {
  const [productList, setProductList] = useState([]);
  const [theme, setTheme] = useState("light");

  const handleCreateProduct = (values) => {
    const newProduct = {
      ...values,
      id: uuidv4(),
    };
    const newProductList = [newProduct, ...productList];
    setProductList(newProductList);
  };

  const handleUpdateProduct = (values, id) => {
    const newProductList = [...productList];
    const newProduct = {
      ...values,
      id: id,
    };
    const index = productList.findIndex((item) => item.id === id);
    newProductList.splice(index, 1, newProduct);
    setProductList(newProductList);
  };

  const handleDeleteProduct = (id) => {
    const newProductList = productList.filter((item) => item.id !== id);
    setProductList(newProductList);
  };

  return (
    <AppContext.Provider
      value={{
        theme: theme,
        name: "Tuấn",
        productList: productList,
      }}
    >
      <div className={styles.globalContainer}>
        <Routes>
          <Route element={<AdminLayout />}>
            <Route
              path="/"
              element={
                <HomePage
                  productList={productList}
                  handleCreateProduct={handleCreateProduct}
                  handleUpdateProduct={handleUpdateProduct}
                  handleDeleteProduct={handleDeleteProduct}
                />
              }
            />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
          </Route>
          <Route element={<LoginLayout />}>
            <Route path="/login" element={<LoginPage />} />
            {/* <Route path="/register" element={<Register />} /> */}
          </Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
