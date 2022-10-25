import styled, { css } from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  height: 56px;
  background-color: #00474f;

  & h2 {
    color: white;
  }
`;

export const HeaderLogo = styled.div`
  display: flex;
  align-items: center;
`;

export const HeaderAccount = styled.div`
  display: flex;
  align-items: center;
`;
