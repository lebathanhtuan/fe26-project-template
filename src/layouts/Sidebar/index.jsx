import * as S from "./styles";

function Sidebar(props) {
  const { isShowSidebar } = props;
  return (
    <S.SidebarContainer isShowSidebar={isShowSidebar}>
      Sidebar Sidebar Sidebar Sidebar Sidebar
    </S.SidebarContainer>
  );
}

export default Sidebar;
