import React from "react";
import { Button, Steps, Table, InputNumber } from "antd";
import { useNavigate, Link, generatePath } from "react-router-dom";
import { useSelector } from "react-redux";

import { ROUTES } from "../../../constants/routes";

import * as S from "./styles";

const CheckoutPage = () => {
  const navigate = useNavigate();

  const { cartList } = useSelector((state) => state.cart);

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
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price.toLocaleString()} VND`,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity) => <InputNumber value={quantity} />,
    },
    {
      title: "Total price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (_, record) =>
        `${(record.price * record.quantity).toLocaleString()} VND`,
    },
  ];

  return (
    <S.Wrapper>
      <Steps current={1}>
        <Steps.Step title="Finished" description="This is a description." />
        <Steps.Step
          title="In Progress"
          subTitle="Left 00:00:08"
          description="This is a description."
        />
        <Steps.Step title="Waiting" description="This is a description." />
      </Steps>
      <Table columns={tableColumn} dataSource={cartList} rowKey="id" />
      <Button onClick={() => navigate(ROUTES.USER.PRODUCT_LIST)}>
        Go to product list
      </Button>
    </S.Wrapper>
  );
};

export default CheckoutPage;
