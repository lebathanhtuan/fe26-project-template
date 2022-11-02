import { Row, Button, Table, InputNumber } from "antd";
import { useNavigate, Link, generatePath } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { ROUTES } from "../../../../constants/routes";
import {
  updateCartItemAction,
  deleteCartItemAction,
} from "../../../../redux/actions";

const CheckoutPage = ({ setStep }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartList } = useSelector((state) => state.cart);
  const totalPrice = cartList
    .map((item) => item.price * item.quantity)
    .reduce((total, price) => total + price);

  const handleChangeQuantity = (productId, value) => {
    dispatch(
      updateCartItemAction({
        productId: productId,
        quantity: value,
      })
    );
  };

  const handleDeleteCartItem = (productId) => {
    dispatch(
      deleteCartItemAction({
        productId: productId,
      })
    );
  };

  const tableColumn = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => {
        return (
          <Link
            to={generatePath(ROUTES.USER.PRODUCT_DETAIL, {
              id: `${record.slug}.${record.id}`,
            })}
          >
            {record.name}
          </Link>
        );
      },
    },
    {
      title: "Unit Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price.toLocaleString()} VND`,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity, record) => (
        <InputNumber
          min={1}
          value={quantity}
          onChange={(value) => handleChangeQuantity(record.productId, value)}
        />
      ),
    },
    {
      title: "Total price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (_, record) =>
        `${(record.price * record.quantity).toLocaleString()} VND`,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Button
          ghost
          danger
          onClick={() => handleDeleteCartItem(record.productId)}
        >
          Remove
        </Button>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={tableColumn}
        dataSource={cartList}
        rowKey="id"
        pagination={false}
      />
      <h3>Total: {totalPrice.toLocaleString()} VND</h3>
      <Row justify="space-between">
        <Button onClick={() => navigate(ROUTES.USER.PRODUCT_LIST)}>
          Go to product list
        </Button>
        <Button type="primary" onClick={() => setStep(1)}>
          Next
        </Button>
      </Row>
    </>
  );
};

export default CheckoutPage;
