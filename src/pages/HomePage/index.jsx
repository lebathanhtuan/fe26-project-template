import { useState } from "react";

import Item from "../../Item";

const HomePage = (props) => {
  const { list } = props;

  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  const handlePlusCount = () => {
    // count = count + 1;
    setCount(count + 1);
  };

  const handleMinusCount = () => {
    // count = count - 1;
    setCount(count - 1);
  };

  const handleAddToCart = (name) => {
    console.log("handleAddToCart", name);
  };

  const handleChangeText = (e) => {
    setText(e.target.value);
  };

  const renderProductList = () => {
    return list.map((item, index) => {
      return (
        <Item
          key={index}
          handleAddToCart={handleAddToCart}
          name={item.name}
          price={item.price}
          isNew={item.isNew}
        />
      );
    });
  };

  return (
    <>
      <div>Danh sách sản phẩm</div>
      <div>
        <span>Tìm kiếm:</span>
        <input
          type="text"
          name="search"
          onChange={(e) => handleChangeText(e)}
        />
      </div>
      {renderProductList()}
    </>
  );
};

export default HomePage;
