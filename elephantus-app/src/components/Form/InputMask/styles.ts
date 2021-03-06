import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { TextInputMask } from 'react-native-masked-text';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

interface InputProps {
  isErrored: boolean;
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background-color: #f1f8f8;
  border-radius: 10px;
  margin-bottom: 10px;

  border-width: 2px;
  border-color: #f1f8f8;

  ${props =>
    props.isErrored &&
    css`
      border-color: #eda097;
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: #6dc9b1;
    `}

  flex-direction: row;
  align-items: center;
`;

export const TextInput = styled(TextInputMask)`
  flex: 1;
  color: #3f4045;
  font-size: 17px;
  font-family: 'Nunito-Regular';
`;

export const InputIcon = styled(Feather)<InputProps>`
  margin-right: 15px;

  color: #b1b1b1;

  ${({ isFilled, isFocused }) =>
    isFilled || isFocused
      ? css`
          color: #6dc9b1;
        `
      : null}

  ${props =>
    props.isErrored &&
    css`
      color: #eda097;
    `}
`;
