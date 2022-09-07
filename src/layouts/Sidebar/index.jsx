import { Button } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import * as S from "./styles";

function Sidebar(props) {
  const { isShowSidebar } = props;
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <S.SidebarContainer isShowSidebar={isShowSidebar}>
      <S.SidebarContent>
        <S.SidebarItem to="/" active={pathname === "/"}>
          Trang chủ
        </S.SidebarItem>
        <S.SidebarItem to="/about" active={pathname === "/about"}>
          Giới thiệu
        </S.SidebarItem>
        <Button
          onClick={() =>
            navigate("/login", {
              state: {
                prevPath: pathname,
              },
            })
          }
        >
          Đăng nhập
        </Button>
      </S.SidebarContent>
    </S.SidebarContainer>
  );
}

export default Sidebar;
