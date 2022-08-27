import { useState } from "react";
import { Button, Checkbox, Form, Input, InputNumber } from "antd";

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

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const { productName, price, content } = productForm;
  //   const newProductErrors = { ...productErrors };

  //   let isValid = true;

  //   if (!productName) {
  //     newProductErrors.productName = "Bạn cần nhập tên sản phẩm!";
  //     isValid = false;
  //   } else {
  //     newProductErrors.productName = "";
  //   }

  //   if (!price) {
  //     newProductErrors.price = "Bạn cần nhập giá sản phẩm!";
  //     isValid = false;
  //   }

  //   if (!content) {
  //     newProductErrors.content = "Bạn cần nhập nội dung sản phẩm!";
  //     isValid = false;
  //   }

  //   if (isValid) {
  //     // Submit
  //   } else {
  //     setProductErrors(newProductErrors);
  //   }
  // };

  const handleSubmit = (values) => {
    console.log(
      "🚀 ~ file: index.jsx ~ line 89 ~ handleSubmit ~ values",
      values
    );
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
      <Button type="primary">Ahihi</Button>
      <div>Danh sách sản phẩm</div>
      <Form
        name="createProduct"
        layout="vertical"
        onFinish={(values) => handleSubmit(values)}
      >
        <Form.Item
          label="Tên sản phẩm"
          name="productName"
          rules={[
            {
              required: true,
              message: "Bạn cần nhập tên sản phẩm!",
            },
            {
              type: "string",
              min: 4,
              message: "Tên sản phẩm phải lớn hơn 4 kí tự!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Giá"
          name="price"
          rules={[
            {
              required: true,
              message: "Bạn cần nhập tên sản phẩm!",
            },
            {
              type: "number",
              min: 100000,
              message: "Giá sản phẩm phải lớn hơn 100.000!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item label="Nội dung" name="content">
          <Input.TextArea
            autoSize={{
              minRows: 2,
              maxRows: 6,
            }}
          />
        </Form.Item>
        <Form.Item name="isNew" valuePropName="checked">
          <Checkbox>Sản phẩm mới</Checkbox>
        </Form.Item>
        <Form.Item label="Tùy chọn" name="options">
          <Checkbox.Group>
            <Checkbox value="1">Tùy chọn 1</Checkbox>
            <Checkbox value="2">Tùy chọn 2</Checkbox>
          </Checkbox.Group>
        </Form.Item>
        <Button htmlType="submit">Thêm sản phẩm</Button>
      </Form>
      <div>
        <span>Tìm kiếm:</span>
        <input type="text" name="search" />
      </div>
      {renderProductList()}
    </>
  );
};

export default HomePage;
