import { useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Form,
  Input,
  Select,
  InputNumber,
  Space,
  Spin,
  Card,
} from "antd";
import ReactQuill from "react-quill";

import * as S from "./styles";

import { ROUTES } from "../../../constants/routes";
import {
  getProductDetailAction,
  getCategoryListAction,
  updateProductAction,
} from "../../../redux/actions";

const UpdateProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [updateForm] = Form.useForm();

  const { productDetail } = useSelector((state) => state.product);
  const { categoryList } = useSelector((state) => state.category);

  const initialValues = {
    name: productDetail.data.name,
    price: productDetail.data.price,
    categoryId: productDetail.data.categoryId,
    content: productDetail.data.content,
    options: productDetail.data.options,
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
    const { options, ...productValues } = values;
    dispatch(
      updateProductAction({
        id: id,
        values: productValues,
        options: options,
        initialOptionIds: productDetail.data.options.map((item) => item.id),
        callback: {
          goToList: () => navigate(ROUTES.ADMIN.PRODUCT_LIST),
        },
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
          <Form.Item label="Category" name="categoryId">
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
              onChange={(value) =>
                updateForm.setFieldsValue({ content: value })
              }
            />
          </Form.Item>
          <Form.List name="options">
            {(fields, callback) => (
              <>
                {fields.map((field) => {
                  return (
                    <Card
                      key={`card-${field.key}`}
                      size="small"
                      style={{ marginBottom: 16 }}
                    >
                      <Form.Item
                        {...field}
                        label="Option name"
                        name={[field.name, "name"]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        label="Bonus price"
                        name={[field.name, "bonusPrice"]}
                      >
                        <InputNumber
                          formatter={(value) =>
                            value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          }
                          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                          style={{ width: 200 }}
                        />
                      </Form.Item>
                      <Button
                        ghost
                        danger
                        onClick={() => {
                          callback.remove(field.name);
                          // call API delete by id
                        }}
                      >
                        Delete
                      </Button>
                    </Card>
                  );
                })}
                <Button onClick={() => callback.add()}>Add option</Button>
              </>
            )}
          </Form.List>
        </Form>
      </Spin>
    </S.Wrapper>
  );
};

export default UpdateProductPage;
