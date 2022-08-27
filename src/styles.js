import styled, { css } from "styled-components";

export const MainContainer = styled.div`
  position: relative;
  display: flex;
  flex: 1;
`;

export const MainContent = styled.div`
  margin-left: 0px;
  width: 100%;
  transition: all 0.3s;

  ${(props) =>
    props.isShowSidebar &&
    css`
      margin-left: 200px;
      width: calc(100% - 200px);
    `}
`;

export const DrawerOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: ${(props) => (props.isShowDrawer ? "block" : "none")};
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
`;

export const DrawerContainer = styled.div`
  position: fixed;
  top: 0;
  right: ${(props) => (props.isShowDrawer ? "0px" : "-200px")};
  width: 200px;
  height: 100vh;
  background-color: #08979c;
  overflow: hidden;
  transition: all 0.3s;
`;
