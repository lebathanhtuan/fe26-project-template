import { useState } from "react";
import * as S from "./styles";

export default function Header(props) {
  const [theme, setTheme] = useState("dark");
  const { name, isShowSidebar, setIsShowSidebar } = props;
  return (
    <S.HeaderContainer theme={theme}>
      <S.HeaderLogo>
        <button onClick={() => setIsShowSidebar(!isShowSidebar)}>
          Mở/Đóng Sidebar
        </button>
        <h2 className="logo">Header</h2>
      </S.HeaderLogo>

      <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        Đổi theme
      </button>
      <h2>{name}</h2>
    </S.HeaderContainer>
  );
}
