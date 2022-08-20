const List = () => {
  const productList = [
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
  ];

  const handleAddToCart = (name) => {
    console.log("handleAddToCart", name);
  };

  const handleAddProduct = () => {
    console.log("handleAddProduct");
  };

  const handleChangeText = (e) => {
    console.log("handleChangeText", {
      name: e.target.name,
      value: e.target.value,
    });
  };

  const handleChangeSelect = (e) => {
    console.log("handleChangeSelect", e.target.value);
  };

  const renderProductList = () => {
    return productList.map((item, index) => {
      return (
        <div key={index} style={{ border: "1px solid black" }}>
          {item.isNew && (
            <div>
              <h3 style={{ color: "red" }}>New</h3>
            </div>
          )}
          <h2>{item.name}</h2>
          <h3>{item.price}</h3>
          <button onClick={() => handleAddToCart(item.name)}>Mua</button>
        </div>
      );
    });
  };

  return (
    <>
      <div>List</div>
      <button onClick={() => handleAddProduct()}>Add product</button>
      <input type="text" name="search" onChange={(e) => handleChangeText(e)} />
      <select onChange={(e) => handleChangeSelect(e)}>
        <option value="1">1</option>
        <option value="2">2</option>
      </select>
      {renderProductList()}
    </>
  );
};

export default List;
