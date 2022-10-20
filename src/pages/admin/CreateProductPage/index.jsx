import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
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

import { ROUTES } from "../../../constants/routes";
import {
  getCategoryListAction,
  createProductAction,
} from "../../../redux/actions";

import * as S from "./styles";

const CreateProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [createForm] = Form.useForm();

  const { productDetail } = useSelector((state) => state.product);
  const { categoryList } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategoryListAction());
  }, []);

  const handleCreateProduct = (values) => {
    const { options, ...productValues } = values;
    dispatch(
      createProductAction({
        values: productValues,
        options: options,
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
        <h3>Create Product</h3>
        <Button type="primary" onClick={() => createForm.submit()}>
          Create
        </Button>
      </S.TopWrapper>
      <Spin spinning={productDetail.loading}>
        <Form
          form={createForm}
          layout="vertical"
          onFinish={(values) => handleCreateProduct(values)}
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
                createForm.setFieldsValue({ content: value });
              }}
            />
          </Form.Item>
          <Form.List name="options">
            {(fields, callback) => (
              <>
                {fields.map((field) => (
                  <Card
                    key={field.key}
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
                  </Card>
                ))}
                <Button onClick={() => callback.add()}>Add option</Button>
              </>
            )}
          </Form.List>
        </Form>
      </Spin>
    </S.Wrapper>
  );
};

export default CreateProductPage;
