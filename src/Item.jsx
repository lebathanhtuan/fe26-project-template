import { useState } from "react";
import { Button, Form, Card, Space, Input, InputNumber, Checkbox } from "antd";

function Item(props) {
  const [isUpdate, setIsUpdate] = useState(false);

  const [updateForm] = Form.useForm();

  const { name, price, isNew, id, handleUpdateProduct, handleDeleteProduct } =
    props;

  const renderProductContent = () => {
    if (!isUpdate) {
      return (
        <>
          <h3>
            Tên: {name} {isNew && "[Mới]"}
          </h3>
          <h4>Giá: {price.toLocaleString()} VND</h4>
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
          isNew: isNew,
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
        <Form.Item name="isNew" valuePropName="checked">
          <Checkbox>Sản phẩm mới</Checkbox>
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
        <Button danger onClick={() => handleDeleteProduct(id)}>
          Xóa
        </Button>
      </Space>
    </Card>
  );
}

export default Item;
