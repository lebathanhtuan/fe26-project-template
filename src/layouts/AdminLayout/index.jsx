import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";

import { ROUTES } from "../../constants/routes";

import Header from "../Header";
import Sidebar from "../Sidebar";
import Footer from "../Footer";

import * as S from "./styles";

function AdminLayout() {
  const [isShowSidebar, setIsShowSidebar] = useState(true);
  const [isShowDrawer, setIsShowDrawer] = useState(false);

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
        isShowDrawer={isShowDrawer}
        setIsShowDrawer={setIsShowDrawer}
      />
      <S.MainContainer>
        <Sidebar isShowSidebar={isShowSidebar} />
        <S.MainContent isShowSidebar={isShowSidebar}>
          <Outlet />
        </S.MainContent>
        <S.DrawerOverlay
          isShowDrawer={isShowDrawer}
          onClick={() => setIsShowDrawer(false)}
        />
        <S.DrawerContainer isShowDrawer={isShowDrawer}>
          Drawer content
        </S.DrawerContainer>
      </S.MainContainer>
      <Footer />
    </>
  );
}

export default AdminLayout;
