import { useState } from "react";
import { Button, Form, Card, Space, Input, InputNumber, Select } from "antd";
import { useNavigate } from "react-router-dom";

function Item({
  name,
  price,
  categoryId,
  category,
  id,
  categoryList,
  handleUpdateProduct,
  handleDeleteProduct,
}) {
  const [isUpdate, setIsUpdate] = useState(false);

  let navigate = useNavigate();

  const [updateForm] = Form.useForm();

  const renderCategoryOptions = () => {
    return categoryList.data.map((item, index) => {
      return (
        <Select.Option key={item.id} values={item.id}>
          {item.name}
        </Select.Option>
      );
    });
  };

  const renderProductContent = () => {
    if (!isUpdate) {
      return (
        <>
          <h3>Tên: {name}</h3>
          <h4>Giá: {price.toLocaleString()} VND</h4>
          <h4>Hãng: {category.name}</h4>
        </>
      );
    }
    return (
      <Form
        form={updateForm}
        layout="vertical"
        initialValues={{
          name: name,
          price: price,
          categoryId: categoryId.toString(),
        }}
        onFinish={(values) => {
          handleUpdateProduct(values, id);
          setIsUpdate(false);
        }}
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
      </Form>
    );
  };

  return (
    <Card size="small" style={{ marginTop: 16 }}>
      {renderProductContent()}
      <Space style={{ marginTop: 8 }}>
        {isUpdate ? (
          <>
            <Button type="primary" onClick={() => updateForm.submit()}>
              Lưu
            </Button>
            <Button onClick={() => setIsUpdate(false)}>Hủy</Button>
          </>
        ) : (
          <Button type="primary" ghost onClick={() => setIsUpdate(true)}>
            Sửa
          </Button>
        )}
        <Button onClick={() => navigate(`/product/${id}`)}>Chi tiết</Button>
        <Button danger onClick={() => handleDeleteProduct(id)}>
          Xóa
        </Button>
      </Space>
    </Card>
  );
}

export default Item;
