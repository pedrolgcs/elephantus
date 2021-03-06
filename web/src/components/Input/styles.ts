import styled, { css } from 'styled-components';

// components
import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  background: var(--input);
  border-radius: 10px;
  padding: 16px;
  border: 2px solid var(--input);
  color: var(--placeholder);

  box-shadow: 3px 3px 10px 0 rgba(0, 0, 0, 0.2);

  display: flex;
  align-items: center;

  ${props =>
    props.isErrored &&
    css`
      border-color: var(--inputError);
    `}

  ${props =>
    props.isFocused &&
    css`
      color: var(--inputFocus);
      border-color: var(--inputFocus);
    `}

  ${props =>
    props.isFilled &&
    css`
      color: var(--inputSuccess);
      border-color: transparent;
    `}

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

export const Error = styled(Tooltip)`
  font-size: 20px;
  margin-left: 15px;

  > svg {
    margin: 0;
    color: var(--tooltipError);
  }

  span {
    background: var(--tooltipError);

    &::before {
      border-color: var(--tooltipError) transparent;
    }
  }
`;
