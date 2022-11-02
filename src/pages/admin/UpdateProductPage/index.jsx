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
  Upload,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";

import { ROUTES } from "../../../constants/routes";
import {
  getProductDetailAction,
  getCategoryListAction,
  updateProductAction,
  clearProductDetailAction,
} from "../../../redux/actions";
import {
  convertBase64ToImage,
  convertImageToBase64,
} from "../../../utils/file";

import * as S from "./styles";

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
      setImagesField(productDetail.data.images);
    }
  }, [productDetail.data]);

  useEffect(() => {
    return () => dispatch(clearProductDetailAction());
  }, []);

  const setImagesField = async (images) => {
    const newImages = [];

    for (let i = 0; i < images.length; i++) {
      const imageFile = await convertBase64ToImage(
        images[i].url,
        images[i].name,
        images[i].type
      );
      await newImages.push({
        id: images[i].id,
        lastModified: imageFile.lastModified,
        lastModifiedDate: imageFile.lastModifiedDate,
        name: imageFile.name,
        size: imageFile.size,
        type: imageFile.type,
        thumbUrl: images[i].thumbUrl,
        originFileObj: imageFile,
      });
    }
    await updateForm.setFieldValue("images", newImages);
  };

  const handleUpdateProduct = async (values) => {
    const { options, images, ...productValues } = values;
    console.log(
      "🚀 ~ file: index.jsx ~ line 114 ~ handleUpdateProduct ~ images",
      images
    );
    const newImages = [];
    for (let i = 0; i < images.length; i++) {
      const imgBase64 = await convertImageToBase64(images[i].originFileObj);
      await newImages.push({
        ...(images[i].id && { id: images[i].id }),
        name: images[i].name,
        type: images[i].type,
        thumbUrl: images[i].thumbUrl,
        url: imgBase64,
      });
    }
    console.log(
      "🚀 ~ file: index.jsx ~ line 108 ~ handleUpdateProduct ~ newImages",
      newImages
    );
    dispatch(
      updateProductAction({
        id: id,
        values: productValues,
        options: options,
        initialOptionIds: productDetail.data.options.map((item) => item.id),
        images: newImages,
        initialImageIds: productDetail.data.images.map((item) => item.id),
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
          <Form.Item label="Options">
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
              onChange={(value) =>
                updateForm.setFieldsValue({ content: value })
              }
            />
          </Form.Item>
        </Form>
      </Spin>
    </S.Wrapper>
  );
};

export default UpdateProductPage;
