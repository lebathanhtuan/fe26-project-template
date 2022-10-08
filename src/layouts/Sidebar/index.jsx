import { Button } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

import { SIDEBAR_ITEMS } from "./constants";
import * as S from "./styles";

function Sidebar(props) {
  const { isShowSidebar } = props;
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const renderSidebarItems = () => {
    return SIDEBAR_ITEMS.map((item, index) => {
      return (
        <S.SidebarItem
          key={index}
          to={item.path}
          active={pathname === item.path}
        >
          {item.title}
        </S.SidebarItem>
      );
    });
  };

  return (
    <S.SidebarContainer isShowSidebar={isShowSidebar}>
      <S.SidebarContent>
        {renderSidebarItems()}
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
