import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export const SidebarContainer = styled.div`
  position: absolute;
  left: ${(props) => (props.isShowSidebar ? "0px" : "-200px")};
  width: 200px;
  height: 100%;
  background-color: #006d75;
  overflow: hidden;
  transition: all 0.3s;
`;

export const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SidebarItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 16px;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #08979c;
    color: white;
  }

  ${(props) =>
    props.active &&
    css`
      border-right: 5px solid #00474f;
      background-color: #08979c;
    `}
`;
