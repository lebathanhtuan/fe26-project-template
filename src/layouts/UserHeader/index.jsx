import { Space, Button, Dropdown, Menu, Badge } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "../../constants/routes";
import { logoutAction } from "../../redux/actions";

import * as S from "./styles";

export default function Header(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.user);
  const { cartList } = useSelector((state) => state.cart);

  return (
    <S.HeaderContainer>
      <h2 onClick={() => navigate(ROUTES.USER.HOME)}>Logo</h2>
      <Space>
        <Badge count={cartList.length} size="small">
          <Button
            type="text"
            icon={<ShoppingCartOutlined style={{ color: "white" }} />}
            onClick={() => navigate(ROUTES.USER.CHECKOUT)}
          ></Button>
        </Badge>
        {userInfo.data.id ? (
          <Dropdown
            overlay={
              <Menu>
                {userInfo.data.role === "admin" && (
                  <Menu.Item
                    onClick={() => {
                      navigate(ROUTES.ADMIN.DASHBOARD);
                    }}
                  >
                    Go dashboard
                  </Menu.Item>
                )}
                <Menu.Item onClick={() => navigate(ROUTES.USER.PROFILE)}>
                  My profile
                </Menu.Item>
                <Menu.Item onClick={() => dispatch(logoutAction())}>
                  Logout
                </Menu.Item>
              </Menu>
            }
          >
            <h4>{userInfo.data.fullName}</h4>
          </Dropdown>
        ) : (
          <Button onClick={() => navigate(ROUTES.LOGIN)}>Login</Button>
        )}
      </Space>
    </S.HeaderContainer>
  );
}
