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
  Upload,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import slug from "slug";

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

  const initialValues = {
    name: "",
    price: undefined,
    categoryId: undefined,
    content: "",
    options: [],
    images: [],
  };

  useEffect(() => {
    dispatch(getCategoryListAction());
  }, []);

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleCreateProduct = async (values) => {
    const { options, images, ...productValues } = values;
    const newImages = [];
    for (let i = 0; i < images.length; i++) {
      const imgBase64 = await convertImageToBase64(images[i].originFileObj);
      await newImages.push({
        name: images[i].name,
        type: images[i].type,
        image: imgBase64,
      });
    }
    await dispatch(
      createProductAction({
        values: {
          ...productValues,
          slug: slug(productValues.name),
        },
        options: options,
        images: newImages,
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
          initialValues={initialValues}
          onFinish={(values) => handleCreateProduct(values)}
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
          <Form.Item label="Options">
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
                      <Button
                        ghost
                        danger
                        onClick={() => callback.remove(field.name)}
                      >
                        Delete
                      </Button>
                    </Card>
                  ))}
                  <Button
                    type="dashed"
                    block
                    icon={<PlusOutlined />}
                    onClick={() => callback.add()}
                  >
                    Add option
                  </Button>
                </>
              )}
            </Form.List>
          </Form.Item>
          <Form.Item
            label="Images"
            name="images"
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) return e;
              return e?.fileList;
            }}
          >
            <Upload listType="picture-card" beforeUpload={Upload.LIST_IGNORE}>
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
          <Form.Item label="Content" name="content">
            <ReactQuill
              theme="snow"
              onChange={(value) => {
                createForm.setFieldsValue({ content: value });
              }}
            />
          </Form.Item>
        </Form>
      </Spin>
    </S.Wrapper>
  );
};

export default CreateProductPage;
