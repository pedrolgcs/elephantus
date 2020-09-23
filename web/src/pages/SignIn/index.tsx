import React, { useCallback, useRef } from 'react';
import { FiMail, FiLock, FiLink2 } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

// styles
import { Container, Content, Background } from './styles';

// images
import logoImg from '../../assets/elephant.png';

// utils
import getValidationErros from '../../utils/getValidationErros';

// components
import Input from '../../components/Input';
import Button from '../../components/Button';

// context
import { useAuth } from '../../hooks/auth';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { signIn } = useAuth();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      // clean errors
      formRef.current?.setErrors({});

      try {
        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Informe um e-mail válido')
            .required('Nome obrigatório'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, { abortEarly: false });

        signIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err);

          formRef.current?.setErrors(errors);

          return;
        }
        console.log(err);
      }
    },
    [signIn],
  );

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="elephantus" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu logon</h1>
          <Input name="email" icon={FiMail} type="text" placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />
          <Button type="submit">Entrar</Button>
        </Form>

        <a href="/signup">
          <FiLink2 />
          Esqueci minha senha
        </a>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
