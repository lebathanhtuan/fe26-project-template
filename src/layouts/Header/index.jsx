import { Button, Space } from "antd";
import * as S from "./styles";

export default function Header(props) {
  const { isShowSidebar, setIsShowSidebar, isShowDrawer, setIsShowDrawer } =
    props;
  const name = "Tuấn";
  return (
    <S.HeaderContainer>
      <Space>
        <Button onClick={() => setIsShowSidebar(!isShowSidebar)}>
          Mở/Đóng Sidebar
        </Button>
        <h2 className="logo">Header</h2>
      </Space>
      <Space>
        <h2>{name}</h2>
        <Button onClick={() => setIsShowDrawer(!isShowDrawer)}>
          Mở/Đóng Drawer
        </Button>
      </Space>
    </S.HeaderContainer>
  );
}
