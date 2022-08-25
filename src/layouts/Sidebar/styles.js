import styled from "styled-components";

export const SidebarContainer = styled.div`
  position: absolute;
  left: ${(props) => (props.isShowSidebar ? "0px" : "-200px")};
  width: 200px;
  height: 100%;
  background-color: #006d75;
  overflow: hidden;
  transition: all 0.3s;
`;
