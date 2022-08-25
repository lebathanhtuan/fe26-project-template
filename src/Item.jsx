import { useState } from "react";

function Item(props) {
  const [selected, setSelected] = useState(false);
  console.log("🚀 ~ file: Item.jsx ~ line 5 ~ Item ~ selected", selected);
  const { name, price, isNew, handleAddToCart } = props;

  // const handleSelectProduct = () => {
  //   setSelected(!selected);
  // };

  return (
    <div style={{ border: `3px solid ${selected ? "red" : "black"}` }}>
      {isNew && (
        <div>
          <h3 style={{ color: "red" }}>New</h3>
        </div>
      )}
      <h2>{name}</h2>
      <h3>{price}</h3>
      <button onClick={() => setSelected(!selected)}>Chọn</button>
      <button onClick={() => handleAddToCart(name)}>Mua</button>
    </div>
  );
}

export default Item;
