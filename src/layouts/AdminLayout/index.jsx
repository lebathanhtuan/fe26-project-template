import { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "../Header";
import Sidebar from "../Sidebar";
import Footer from "../Footer";

import * as S from "./styles";

function AdminLayout() {
  const [isShowSidebar, setIsShowSidebar] = useState(true);
  const [isShowDrawer, setIsShowDrawer] = useState(false);

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
