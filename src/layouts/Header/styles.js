import styled, { css } from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  height: 56px;
  background-color: #00474f;
  color: white;

  & > .logo {
    font-size: 30px;

    &:hover {
      color: red;
    }
  }

  ${(props) =>
    props.theme === "light" &&
    css`
      background-color: yellow;
      color: black;
    `}
`;

export const HeaderLogo = styled.div`
  display: flex;
  align-items: center;
`;

export const HeaderAccount = styled.div`
  display: flex;
  align-items: center;
`;
