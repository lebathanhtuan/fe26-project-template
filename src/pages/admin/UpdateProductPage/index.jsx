import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, Select, InputNumber, Space, Spin } from "antd";
import ReactQuill from "react-quill";

import * as S from "./styles";

import {
  getProductDetailAction,
  getCategoryListAction,
  updateProductAction,
} from "../../../redux/actions";

const UpdateProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [updateForm] = Form.useForm();

  const { productDetail } = useSelector((state) => state.product);
  const { categoryList } = useSelector((state) => state.category);

  const initialValues = {
    name: productDetail.data.name,
    price: productDetail.data.price,
    categoryId: productDetail.data.categoryId,
    content: productDetail.data.content,
  };

  useEffect(() => {
    dispatch(getProductDetailAction({ id: id }));
    dispatch(getCategoryListAction());
  }, [id]);

  useEffect(() => {
    if (productDetail.data.id) {
      updateForm.resetFields();
    }
  }, [productDetail.data]);

  const handleUpdateProduct = (values) => {
    dispatch(
      updateProductAction({
        id: id,
        values: values,
      })
    );
  };

  const renderProductOptions = useMemo(() => {
    return categoryList.data.map((item) => {
      return (
        <Select.Option key={item.id} value={item.id}>
          {item.name}
        </Select.Option>
      );
    });
  }, [categoryList.data]);

  return (
    <S.Wrapper>
      <S.TopWrapper>
        <h3>Update Product</h3>
        <Button type="primary" onClick={() => updateForm.submit()}>
          Update
        </Button>
      </S.TopWrapper>
      <Spin spinning={productDetail.loading}>
        <Form
          form={updateForm}
          layout="vertical"
          initialValues={initialValues}
          onFinish={(values) => handleUpdateProduct(values)}
        >
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Cateogry" name="categoryId">
            <Select>{renderProductOptions}</Select>
          </Form.Item>
          <Space>
            <Form.Item label="Price" name="price">
              <InputNumber
                formatter={(value) =>
                  value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                style={{ width: 200 }}
              />
            </Form.Item>
            <span>VND</span>
          </Space>
          <Form.Item label="Content" name="content">
            <ReactQuill
              theme="snow"
              onChange={(value) => {
                console.log(value);
                updateForm.setFieldsValue({ content: value });
              }}
            />
          </Form.Item>
        </Form>
      </Spin>
    </S.Wrapper>
  );
};

export default UpdateProductPage;
