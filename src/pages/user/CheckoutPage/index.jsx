import React, { useState, useMemo } from "react";
import { Button, Steps, Table, InputNumber } from "antd";
import { useNavigate, Link, generatePath } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { ROUTES } from "../../../constants/routes";
import {
  updateCartItemAction,
  deleteCartItemAction,
} from "../../../redux/actions";

import Cart from "./components/Cart";
import Info from "./components/Info";
import Payment from "./components/Payment";
import Success from "./components/Success";
import * as S from "./styles";

const CheckoutPage = () => {
  const [step, setStep] = useState(0);

  const renderCheckoutContent = useMemo(() => {
    switch (step) {
      case 1: {
        return <Info setStep={setStep} />;
      }
      case 2: {
        return <Payment setStep={setStep} />;
      }
      case 3: {
        return <Success setStep={setStep} />;
      }
      case 0:
      default: {
        return <Cart setStep={setStep} />;
      }
    }
  }, [step]);

  return (
    <S.Wrapper>
      <Steps current={step}>
        <Steps.Step title="Cart" />
        <Steps.Step title="Info" />
        <Steps.Step title="Payment" />
        <Steps.Step title="Success" />
      </Steps>

      {renderCheckoutContent}
    </S.Wrapper>
  );
};

export default CheckoutPage;
