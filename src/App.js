import { useState } from "react";

import "./App.css";

import Header, { name, age } from "./Header";
import Footer from "./Footer";
import List from "./List";

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
  const name = "Tuấn";
  const age = 20;

  const handleAddProduct = () => {
    const newProduct = {
      name: "Product 4",
      price: "$400",
      isNew: true,
    };
    const newProductList = [...productList, newProduct];
    console.log(
      "🚀 ~ file: App.js ~ line 37 ~ handleAddProduct ~ newProductList",
      newProductList
    );
    setProductList(newProductList);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Header name={name} age={age} />
      </header>
      <List list={productList} />
      <button onClick={() => handleAddProduct()}>Add Product</button>
      <Footer name={name} age={age} text>
        ABC
      </Footer>
    </div>
  );
}

export default App;
