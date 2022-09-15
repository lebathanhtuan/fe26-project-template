import { useEffect } from "react";
import { Button, Checkbox, Form, Input, InputNumber, Card, Select } from "antd";
import { useSelector, useDispatch } from "react-redux";

import {
  getProductListAction,
  getCategoryListAction,
  createProductAction,
  updateProductAction,
  deleteProductAction,
} from "../../redux/actions";

import Item from "./Item";

const HomePage = () => {
  const dispatch = useDispatch();
  const { productList, createProductData } = useSelector(
    (state) => state.product
  );
  const { categoryList } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getProductListAction());
    dispatch(getCategoryListAction());
  }, []);

  const handleCreateProduct = (values) => {
    dispatch(
      createProductAction({
        values: { ...values, categoryId: parseInt(values.categoryId) },
      })
    );
  };

  const handleUpdateProduct = (values, id) => {
    dispatch(
      updateProductAction({
        values: {
          ...values,
          categoryId: parseInt(values.categoryId),
        },
        id: id,
      })
    );
  };

  const handleDeleteProduct = (id) => {
    dispatch(deleteProductAction({ id: id }));
  };

  const renderProductList = () => {
    if (productList.loading) return <div>Loading...</div>;
    return productList.data.map((item, index) => {
      return (
        <Item
          key={item.id}
          id={item.id}
          name={item.name}
          price={item.price}
          category={item.category}
          categoryId={item.categoryId}
          categoryList={categoryList}
          handleUpdateProduct={handleUpdateProduct}
          handleDeleteProduct={handleDeleteProduct}
        />
      );
    });
  };

  const renderCategoryOptions = () => {
    return categoryList.data.map((item, index) => {
      return (
        <Select.Option key={item.id} values={item.id}>
          {item.name}
        </Select.Option>
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
          <Form.Item
            label="Hãng"
            name="categoryId"
            rules={[
              {
                required: true,
                message: "Bạn cần chọn hãng!",
              },
            ]}
          >
            <Select loading={categoryList.loading}>
              {renderCategoryOptions()}
            </Select>
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={createProductData.loading}
          >
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
