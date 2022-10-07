import { Button, Space } from "antd";
import { useSelector } from "react-redux";
import * as S from "./styles";

export default function Header(props) {
  const { isShowSidebar, setIsShowSidebar, isShowDrawer, setIsShowDrawer } =
    props;

  const { userInfo } = useSelector((state) => state.user);

  return (
    <S.HeaderContainer>
      <Space>
        <Button onClick={() => setIsShowSidebar(!isShowSidebar)}>
          Mở/Đóng Sidebar
        </Button>
        <h2 className="logo">Header</h2>
      </Space>
      <Space>
        <h2>{userInfo.data.fullName}</h2>
        <Button onClick={() => setIsShowDrawer(!isShowDrawer)}>
          Mở/Đóng Drawer
        </Button>
      </Space>
    </S.HeaderContainer>
  );
}
