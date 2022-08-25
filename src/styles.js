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
