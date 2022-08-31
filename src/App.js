import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Header from "./layouts/Header";
import Sidebar from "./layouts/Sidebar";
import Footer from "./layouts/Footer";
import HomePage from "./pages/HomePage";

import styles from "./App.module.css";
import * as S from "./styles";

function App() {
  const [productList, setProductList] = useState([]);
  const [isShowSidebar, setIsShowSidebar] = useState(true);
  const [isShowDrawer, setIsShowDrawer] = useState(false);

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
    <div className={styles.globalContainer}>
      <Header
        isShowSidebar={isShowSidebar}
        setIsShowSidebar={setIsShowSidebar}
        isShowDrawer={isShowDrawer}
        setIsShowDrawer={setIsShowDrawer}
      />
      <S.MainContainer>
        <Sidebar isShowSidebar={isShowSidebar} />
        <S.MainContent isShowSidebar={isShowSidebar}>
          <HomePage
            productList={productList}
            handleCreateProduct={handleCreateProduct}
            handleUpdateProduct={handleUpdateProduct}
            handleDeleteProduct={handleDeleteProduct}
          />
        </S.MainContent>
        <S.DrawerOverlay
          isShowDrawer={isShowDrawer}
          onClick={() => setIsShowDrawer(false)}
        />
        <S.DrawerContainer isShowDrawer={isShowDrawer}>
          Drawer content
        </S.DrawerContainer>
      </S.MainContainer>
      <Footer />
    </div>
  );
}

export default App;
