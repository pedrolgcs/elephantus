import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { TextInputMask } from 'react-native-masked-text';

export const Container = styled.View`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background-color: #f1f8f8;
  border-radius: 10px;
  margin-bottom: 10px;

  flex-direction: row;
  align-items: center;
`;

export const TextInput = styled(TextInputMask)`
  flex: 1;
  color: #3f4045;
  font-size: 17px;
  font-family: 'Nunito-Regular';
`;

export const InputIcon = styled(Feather)`
  margin-right: 15px;
`;
