import React from 'react';
import { FiMail, FiLock } from 'react-icons/fi';

// styles
import { Container, Content } from './styles';

// images
import logoImg from '../../assets/elephant.png';

// components
import Input from '../../components/Input';
import Button from '../../components/Button';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="elephantus" />
        <form>
          <h1>Faça seu logon</h1>
          <Input name="email" icon={FiMail} type="text" placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />
          <Button type="submit">Entrar</Button>
        </form>
      </Content>
    </Container>
  );
};

export default SignIn;
