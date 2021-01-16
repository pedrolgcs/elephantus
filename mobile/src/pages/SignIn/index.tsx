import React, { useRef, useMemo, useCallback } from 'react';
import { View, Text } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

// components
import Backgraound from '../../components/Backgraound';
import InputMask from '../../components/InputMask';
import Button from '../../components/Button';

// images
import logoImg from '../../assets/logo.png';

// styles
import * as Styled from './styles';

const SignIn: React.FC = () => {
  // refs
  const bottomSheetRef = useRef<BottomSheet>(null);
  const formRef = useRef<FormHandles>(null);

  // variables
  const snapPoints = useMemo(() => ['0.1%', '25%', '50%', '80%'], []);

  const handleSignIn = useCallback(data => {
    console.log(data, 'deu');
  }, []);

  return (
    <Backgraound scrollable>
      <Styled.Container>
        <Styled.Logo source={logoImg} />
        <Styled.Title>bem vindo</Styled.Title>
        <Form ref={formRef} onSubmit={handleSignIn}>
          <InputMask type="cpf" name="cpf" placeholder="CPF" icon="tag" />
        </Form>
        <Button onPress={() => formRef.current?.submitForm()}>Entrar</Button>
      </Styled.Container>

      <BottomSheet ref={bottomSheetRef} index={0} snapPoints={snapPoints}>
        <View
          style={{
            backgroundColor: '#EDF6F9',
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
