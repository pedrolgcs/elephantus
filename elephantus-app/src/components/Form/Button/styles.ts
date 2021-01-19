import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  width: 100%;
  height: 60px;
  background: #6dc9f7;
  border-radius: 10px;

  justify-content: center;
  align-items: center;
`;

export const Text = styled.Text`
  font-family: 'Nunito-Bold';
  color: #fbfbff;
  font-size: 18px;
`;
