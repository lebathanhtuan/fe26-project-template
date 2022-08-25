import { useState } from "react";

import Item from "./Item";

const List = (props) => {
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
      <div>List</div>
      <div>
        <button onClick={() => handleMinusCount()}>-</button>
        <span>{count}</span>
        <button onClick={() => handlePlusCount()}>+</button>
      </div>
      <input type="text" name="search" onChange={(e) => handleChangeText(e)} />
      <div>Text: {text}</div>
      {renderProductList()}
    </>
  );
};

export default List;
