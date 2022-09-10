import { Button, Checkbox, Form, Input, InputNumber, Card } from "antd";
import { useSelector, useDispatch } from "react-redux";

import {
  createProductAction,
  updateProductAction,
  deleteProductAction,
} from "../../redux/actions";

import Item from "./Item";

const HomePage = () => {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.product);

  const handleCreateProduct = (values) => {
    dispatch(createProductAction({ values: values }));
  };

  const handleUpdateProduct = (values, id) => {
    dispatch(updateProductAction({ values: values, id: id }));
  };

  const handleDeleteProduct = (id) => {
    dispatch(deleteProductAction({ id: id }));
  };

  const renderProductList = () => {
    return productList.map((item, index) => {
      return (
        <Item
          key={item.id}
          id={item.id}
          name={item.name}
          price={item.price}
          isNew={item.isNew}
          handleUpdateProduct={handleUpdateProduct}
          handleDeleteProduct={handleDeleteProduct}
        />
      );
    });
  };

  return (
    <>
      <Card size="small" title="Thêm sản phẩm mới">
        <Form
          name="createProduct"
          layout="vertical"
          onFinish={(values) => handleCreateProduct(values)}
        >
          <Form.Item
            label="Tên sản phẩm"
            name="name"
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
                min: 10000,
                message: "Giá sản phẩm phải lớn hơn 100.000!",
              },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="isNew" valuePropName="checked">
            <Checkbox>Sản phẩm mới</Checkbox>
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Thêm sản phẩm
          </Button>
        </Form>
      </Card>
      {/* <div>Danh sách sản phẩm</div> */}
      {renderProductList()}
    </>
  );
};

export default HomePage;
