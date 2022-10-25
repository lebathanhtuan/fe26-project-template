import { Button, Space, Dropdown, Menu } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

import { logoutAction } from "../../redux/actions";

import * as S from "./styles";

export default function AdminHeader(props) {
  const { isShowSidebar, setIsShowSidebar } = props;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.user);

  return (
    <S.HeaderContainer>
      <Space>
        <Button onClick={() => setIsShowSidebar(!isShowSidebar)}>
          Mở/Đóng Sidebar
        </Button>
        <h2 className="logo">Logo</h2>
      </Space>
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item
              onClick={() => {
                navigate(ROUTES.USER.HOME);
              }}
            >
              Go home
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                dispatch(logoutAction());
                navigate(ROUTES.LOGIN);
              }}
            >
              Logout
            </Menu.Item>
          </Menu>
        }
      >
        <h2>{userInfo.data.fullName}</h2>
      </Dropdown>
    </S.HeaderContainer>
  );
}
