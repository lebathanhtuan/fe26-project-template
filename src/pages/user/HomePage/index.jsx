import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "../../../constants/routes";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>HomePage</div>
      <Button onClick={() => navigate(ROUTES.USER.PRODUCT_LIST)}>
        Go to product list
      </Button>
    </>
  );
};

export default HomePage;
