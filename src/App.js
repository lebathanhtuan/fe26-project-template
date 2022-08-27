import { useState } from "react";

import Header from "./layouts/Header";
import Sidebar from "./layouts/Sidebar";
import Footer from "./layouts/Footer";
import HomePage from "./pages/HomePage";

import styles from "./App.module.css";
import * as S from "./styles";

function App() {
  const [productList, setProductList] = useState([
    {
      name: "Product 1",
      price: "$100",
      isNew: true,
    },
    {
      name: "Product 2",
      price: "$200",
      isNew: false,
    },
    {
      name: "Product 3",
      price: "$300",
      isNew: true,
    },
  ]);
  const [isShowSidebar, setIsShowSidebar] = useState(true);
  const [isShowDrawer, setIsShowDrawer] = useState(false);
  const name = "Tuấn";
  const age = 20;

  const handleAddProduct = () => {
    const newProduct = {
      name: "Product 4",
      price: "$400",
      isNew: true,
    };
    const newProductList = [...productList, newProduct];
    setProductList(newProductList);
  };

  return (
    <div className={styles.globalContainer}>
      <Header
        name={name}
        isShowSidebar={isShowSidebar}
        setIsShowSidebar={setIsShowSidebar}
        isShowDrawer={isShowDrawer}
        setIsShowDrawer={setIsShowDrawer}
      />
      <S.MainContainer>
        <Sidebar isShowSidebar={isShowSidebar} />
        <S.MainContent isShowSidebar={isShowSidebar}>
          <HomePage list={productList} />
          <button onClick={() => handleAddProduct()}>Add Product</button>
        </S.MainContent>
        <S.DrawerOverlay
          isShowDrawer={isShowDrawer}
          onClick={() => setIsShowDrawer(false)}
        />
        <S.DrawerContainer isShowDrawer={isShowDrawer}>ABC</S.DrawerContainer>
      </S.MainContainer>
      <Footer name={name} age={age} text>
        ABC
      </Footer>
    </div>
  );
}

export default App;
