import { useState, useMemo } from "react";
import { Row, Col, Button, Radio, Card, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";

import {
  orderProductAction,
  guestOrderProductAction,
} from "../../../../redux/actions";

const Payment = ({ setStep }) => {
  const [paymentForm] = Form.useForm();
  const dispatch = useDispatch();

  const { cartList, checkoutInfo } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user);
  const totalPrice = cartList
    .map((item) => item.price * item.quantity)
    .reduce((total, price) => total + price, 0);

  const handleSubmitPaymentForm = (values) => {
    console.log(
      "🚀 ~ file: Payment.jsx ~ line 21 ~ handleSubmitPaymentForm ~ values",
      values
    );
    if (userInfo.data.id) {
      dispatch(
        orderProductAction({
          ...checkoutInfo,
          ...values,
          userId: userInfo.data.id,
          totalPrice: totalPrice,
          status: "pending",
          products: cartList.map((item) => ({
            productId: item.productId,
            productName: item.name,
            price: item.price,
            quantity: item.quantity,
            ...(item.optionName && {
              optionName: item.optionName,
            }),
          })),
        })
      );
    } else {
      dispatch(
        guestOrderProductAction({
          ...checkoutInfo,
          ...values,
          totalPrice: totalPrice,
          products: cartList.map((item) => ({
            productId: item.productId,
            productName: item.name,
            price: item.price,
            quantity: item.quantity,
            ...(item.optionName && {
              optionName: item.optionName,
            }),
          })),
        })
      );
    }
  };

  return (
    <>
      <div>Payment</div>
      <Form
        form={paymentForm}
        layout="vertical"
        name="paymentForm"
        onFinish={(values) => handleSubmitPaymentForm(values)}
      >
        <Card size="small">
          <Form.Item label="Method" name="method">
            <Radio.Group>
              <Row>
                <Col span={24}>
                  <Radio value="cod">COD</Radio>
                </Col>
                <Col span={24}>
                  <Radio value="visa">VISA</Radio>
                </Col>
                <Col span={24}>
                  <Radio value="atm">ATM</Radio>
                </Col>
              </Row>
            </Radio.Group>
          </Form.Item>
        </Card>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.method !== currentValues.method
          }
        >
          {({ getFieldValue }) =>
            getFieldValue("method") === "visa" && (
              <Card size="small">
                <Form.Item label="Card number" name="cardNumber">
                  <Input />
                </Form.Item>
                <Form.Item label="Card name" name="cardName">
                  <Input />
                </Form.Item>
                <Form.Item label="Date" name="date">
                  <Input />
                </Form.Item>
                <Form.Item label="Code" name="code">
                  <Input />
                </Form.Item>
              </Card>
            )
          }
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.method !== currentValues.method
          }
        >
          {({ getFieldValue }) =>
            getFieldValue("method") === "atm" && (
              <Card size="small">
                <Form.Item label="Bank" name="bank">
                  <Radio.Group>
                    <Row>
                      <Col span={24}>
                        <Radio value="vietcombank">VietcomBank</Radio>
                      </Col>
                      <Col span={24}>
                        <Radio value="vietinbank">VietinBank</Radio>
                      </Col>
                    </Row>
                  </Radio.Group>
                </Form.Item>
              </Card>
            )
          }
        </Form.Item>
      </Form>
      <Row justify="space-between">
        <Button onClick={() => setStep(1)}>Back</Button>
        <Button type="primary" onClick={() => paymentForm.submit()}>
          Submit
        </Button>
      </Row>
    </>
  );
};

export default Payment;
