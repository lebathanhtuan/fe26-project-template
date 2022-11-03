import { Outlet } from "react-router-dom";

import Header from "../UserHeader";
import Footer from "../Footer";

import * as S from "./styles";

const UserLayout = () => {
  return (
    <>
      <Header />
      <S.MainContainer>
        <S.MainContent>
          <Outlet />
        </S.MainContent>
      </S.MainContainer>
      <Footer />
    </>
  );
};

export default UserLayout;
