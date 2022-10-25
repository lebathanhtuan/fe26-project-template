import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";

import { ROUTES } from "../../constants/routes";

import Header from "../AdminHeader";
import Sidebar from "../Sidebar";
import Footer from "../Footer";

import * as S from "./styles";

function AdminLayout() {
  const [isShowSidebar, setIsShowSidebar] = useState(true);

  const { userInfo } = useSelector((state) => state.user);

  const accessToken = localStorage.getItem("accessToken");

  if (accessToken && userInfo.loading) {
    return (
      <S.LoadingWrapper>
        <LoadingOutlined style={{ fontSize: 32 }} />
      </S.LoadingWrapper>
    );
  } else if (userInfo.data.role !== "admin") {
    return <Navigate to={ROUTES.USER.HOME} />;
  }
  return (
    <>
      <Header
        isShowSidebar={isShowSidebar}
        setIsShowSidebar={setIsShowSidebar}
      />
      <S.MainContainer>
        <Sidebar isShowSidebar={isShowSidebar} />
        <S.MainContent isShowSidebar={isShowSidebar}>
          <Outlet />
        </S.MainContent>
      </S.MainContainer>
      <Footer />
    </>
  );
}

export default AdminLayout;
