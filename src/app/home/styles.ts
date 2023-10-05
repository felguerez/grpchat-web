'use client';
import styled from "styled-components";

export const Messages = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-color: azure;
`;
export const Message = styled.div`
  padding: 4px;
  color: black;
  &:hover {
    background-color: antiquewhite;
  }
`;