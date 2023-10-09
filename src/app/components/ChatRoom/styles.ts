import styled from "styled-components";

export const ChatContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const InputContainer = styled.div`
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
`;

export const MessageRow = styled.div`
  padding: 4px;
  margin-bottom: 4px;
  &:hover {
    // Add any hover styles here
  }
`;
