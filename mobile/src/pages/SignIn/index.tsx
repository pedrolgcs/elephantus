import React, { useRef, useMemo } from 'react';
import { View, Text } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

// components
import Backgraound from '../../components/Backgraound';
import Input from '../../components/Input';
import Button from '../../components/Button';

// images
import logoImg from '../../assets/logo.png';

// styles
import * as Styled from './styles';

const SignIn: React.FC = () => {
  // refs
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['0.1%', '25%', '50%', '80%'], []);

  return (
    <Backgraound>
      <Styled.Container>
        <Styled.Logo source={logoImg} />
        <Input name="cpf" placeholder="CPF" icon="tag" />
        <Button onPress={() => console.log('deu')}>Entrar</Button>
      </Styled.Container>

      <BottomSheet ref={bottomSheetRef} index={0} snapPoints={snapPoints}>
        <View
          style={{
            backgroundColor: '#BED8EE',
            flex: 1,
            borderRadius: 20,
            padding: 30,
          }}
        >
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheet>
    </Backgraound>
  );
};

export default SignIn;
