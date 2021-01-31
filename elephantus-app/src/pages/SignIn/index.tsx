import React, { useRef, useMemo, useCallback } from 'react';
import { View, Text, Alert } from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';

// components
import Backgraound from '../../components/Background';
import InputMask from '../../components/Form/InputMask';
import Button from '../../components/Form/Button';

// utils
import getValidationErros from '../../utils/getValidationsError';

// hooks
import { useAuth } from '../../hooks/auth';

// images
import logoImg from '../../assets/logo.png';

// styles
import * as Styled from './styles';

interface SignInFormData {
  cpf: string;
}

const SignIn: React.FC = () => {
  // refs
  const bottomSheetRef = useRef<BottomSheet>(null);
  const formRef = useRef<FormHandles>(null);

  const { signIn, user } = useAuth();

  // variables
  const snapPoints = useMemo(() => ['0.1%', '25%', '50%', '80%'], []);

  const handleSignIn = useCallback(
    async (data: SignInFormData) => {
      formRef.current?.setErrors({});

      try {
        const schema = Yup.object().shape({
          cpf: Yup.string().required('Cpf obrigatório').length(11),
        });

        await schema.validate(data, { abortEarly: false });

        await signIn({
          cpf: data.cpf,
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err);
          formRef.current?.setErrors(errors);
          return;
        }

        Alert.alert(
          'Error na autenticação',
          'Ocorreu um erro ao fazer logon, virique seus dados',
        );
      }
    },
    [signIn],
  );

  return (
    <Backgraound scrollable>
      <Styled.Container>
        <Styled.Logo source={logoImg} />
        <Styled.Title>bem vindo</Styled.Title>
        <Form ref={formRef} onSubmit={handleSignIn}>
          <InputMask
            type="cpf"
            name="cpf"
            placeholder="CPF"
            icon="tag"
            returnKeyType="send"
            onSubmitEditing={() => formRef.current?.submitForm()}
          />
        </Form>
        <Button onPress={() => formRef.current?.submitForm()}>Entrar</Button>
      </Styled.Container>

      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        animateOnMount
      >
        <View
          style={{
            backgroundColor: '#EDF6F9',
            flex: 1,
            borderRadius: 20,
            padding: 30,
          }}
        >
          <BottomSheetScrollView>
            <Text>Awesome 🎉</Text>
          </BottomSheetScrollView>
        </View>
      </BottomSheet>
    </Backgraound>
  );
};

export default SignIn;
