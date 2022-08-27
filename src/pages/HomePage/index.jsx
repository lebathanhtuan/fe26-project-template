import { useState } from "react";

import Item from "../../Item";

const HomePage = (props) => {
  const [productForm, setProductForm] = useState({
    productName: "",
    price: 0,
    content: "",
    isNew: false,
    options: [],
  });
  const [productErrors, setProductErrors] = useState({
    productName: "",
    price: "",
    content: "",
    isNew: "",
    options: "",
  });
  console.log(
    "🚀 ~ file: index.jsx ~ line 20 ~ HomePage ~ productErrors",
    productErrors
  );

  const { list } = props;

  const handleAddToCart = (name) => {
    console.log("handleAddToCart", name);
  };

  const handleChangeField = (e) => {
    const { name, value } = e.target;
    setProductForm({
      ...productForm,
      [name]: value,
    });
  };

  const handleChangeIsNew = (e) => {
    setProductForm({
      ...productForm,
      isNew: e.target.checked,
    });
  };

  const handleChangeOption = (e) => {
    const { value, checked } = e.target;
    setProductForm({
      ...productForm,
      options: checked
        ? [...productForm.options, value]
        : productForm.options.filter((item) => item !== value),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { productName, price, content } = productForm;
    const newProductErrors = { ...productErrors };

    let isValid = true;

    if (!productName) {
      newProductErrors.productName = "Bạn cần nhập tên sản phẩm!";
      isValid = false;
    } else {
      newProductErrors.productName = "";
    }

    if (!price) {
      newProductErrors.price = "Bạn cần nhập giá sản phẩm!";
      isValid = false;
    }

    if (!content) {
      newProductErrors.content = "Bạn cần nhập nội dung sản phẩm!";
      isValid = false;
    }

    if (isValid) {
      // Submit
    } else {
      setProductErrors(newProductErrors);
    }
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
      <form style={{ border: "1px solid black", padding: 12 }}>
        <div>
          <label>Tên sản phẩm: </label>
          <input
            type="text"
            name="productName"
            onChange={(e) => handleChangeField(e)}
          />
        </div>
        <span>{productErrors.productName}</span>
        <div>
          <label>Giá: </label>
          <input
            type="number"
            name="price"
            onChange={(e) => handleChangeField(e)}
          />
        </div>
        <span>{productErrors.price}</span>
        <div>
          <label>Nội dung: </label>
          <textarea name="content" onChange={(e) => handleChangeField(e)} />
        </div>
        <span>{productErrors.content}</span>
        <div>
          <input
            type="checkbox"
            name="isNew"
            id="isNew"
            onChange={(e) => handleChangeIsNew(e)}
          />
          <label htmlFor="isNew">Sản phẩm mới</label>
        </div>
        <div>
          <label>Tùy chọn: </label>
          <input
            type="checkbox"
            name="options"
            value="1"
            onChange={(e) => handleChangeOption(e)}
          />
          Tùy chọn 1
          <input
            type="checkbox"
            name="options"
            value="2"
            onChange={(e) => handleChangeOption(e)}
          />
          Tùy chọn 2
        </div>
        <button onClick={(e) => handleSubmit(e)}>Tạo sản phẩm</button>
      </form>
      <div>
        <span>Tìm kiếm:</span>
        <input type="text" name="search" />
      </div>
      {renderProductList()}
    </>
  );
};

export default HomePage;
