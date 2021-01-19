import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';

import * as Styled from './styles';

interface ButtonProps extends RectButtonProperties {
  color?: string;
  children: string;
}

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <Styled.Container {...rest}>
      <Styled.Text>{children}</Styled.Text>
    </Styled.Container>
  );
};

export default Button;
