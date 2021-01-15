import React from 'react';
import { TextInputProps } from 'react-native';

// styles
import * as Styled from './styles';

export interface InputProps extends TextInputProps {
  name: string;
  icon?: string;
}

const Input: React.FC<InputProps> = ({ name, icon, ...rest }) => {
  return (
    <Styled.Container>
      {icon && <Styled.InputIcon name={icon} size={20} color="#3F4045" />}
      <Styled.TextInput {...rest} keyboardAppearance="default" />
    </Styled.Container>
  );
};

export default Input;
