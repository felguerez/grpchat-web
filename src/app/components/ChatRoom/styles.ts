import styled, { css } from "styled-components";
const aolTheme = css`
  background-color: #000;
  color: #00ff00;
`;
//
/* For the AOL-inspired colors */
// .aol-theme .navbar {
//   background-color: #000;
//   color: #00ff00;
// }
//
// .aol-theme .navbar button {
//   background-color: #ff4500;
// }
//
// .aol-theme .MessagesContainer {
//   background-color: #000;
//   color: #00ff00;
// }
//
// .aol-theme .InputContainer {
//   background-color: #333;
//   color: #00ff00;
// }


export const ChatContainer = styled.div<{theme?: string }>`
  height: 100%;
  display: flex;
  flex-direction: column;
  ${({ theme }) => theme === "aol" && aolTheme}

`;

export const MessagesContainer = styled.div<{theme?: string }>`
  flex: 1;
  overflow-y: auto;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  ${({ theme }) => theme === "aol" && aolTheme}

`;

export const InputContainer = styled.div<{theme?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.25rem;
  width: 100%;
  form {
    width: 100%;
    display: flex;
    input:not([type='submit']) {
      padding: 0.5rem;
      flex: 1;
      margin-right: 1rem;
    }
    input[type='submit'] {
      margin-right: 0.25rem;
    }
  }
  ${({ theme }) => theme === "aol" && css`
    background-color: #333;
    color: #00ff00;
  `}
`;

export const MessageRow = styled.div`
  padding: 4px;
  margin-bottom: 4px;
  &:hover {
    // Add any hover styles here
  }
`;
