import styled, { css } from 'styled-components';

interface ContainerProps {
  type?: 'success' | 'error' | 'info';
  hasDescription: boolean;
}

const toastTypeVariation = {
  info: css`
    background: var(--toastInfo);
    color: var(--toastInfoText);
  `,
  success: css`
    background: var(--toastSuccess);
    color: var(--toastSuccessText);
  `,
  error: css`
    background: var(--toastError);
    color: var(--toastErrorText);
  `,
};

export const Container = styled.div<ContainerProps>`
  display: flex;

  width: 350px;
  border-radius: 10px;
  position: relative;
  padding: 16px 30px 16px 16px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);

  ${props => toastTypeVariation[props.type || 'info']}

  & + div {
    margin-top: 8px;
  }

  > svg {
    margin: 4px 12px 0 0;
  }

  div {
    flex: 1;

    p {
      margin-top: 4px;
      font-size: 14px;
      opacity: 0.8;
      line-height: 20px;
    }
  }

  button {
    position: absolute;
    right: 16px;
    top: 19px;
    opacity: 0.6;
    border: 0;
    background: transparent;
    color: inherit;
  }

  ${props =>
    !props.hasDescription &&
    css`
      align-items: center;

      svg {
        margin-top: 0;
      }
    `}
`;
