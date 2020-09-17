import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  background: var(--input);
  border-radius: 10px;
  padding: 16px;
  border: 2px solid var(--input);
  color: var(--placeholder);

  box-shadow: 5px 5px 10px 0 rgba(0, 0, 0, 0.2);

  display: flex;
  align-items: center;

  input {
    flex: 1;
    color: var(--text);
    background: transparent;
    border: 0;

    &::placeholder {
      color: var(--placeholder);
    }
  }

  svg {
    margin-right: 16px;
    font-size: 20px;
  }
`;
