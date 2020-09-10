import React from 'react';
import { FiLogIn } from 'react-icons/fi';

// styles
import { Container, Content, Background } from './styles';

// images
import logoImg from '../../assets/logo.svg';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="elephantus" />
        <form>
          <h1>Faça seu logon</h1>
          <input type="text" placeholder="E-mail" />
          <input type="password" placeholder="Senha" />
          <button type="submit">Entrar</button>

          <a href="forgot">Esqueci minha senha</a>
        </form>

        <a href="create">
          <FiLogIn />
          Criar conta
        </a>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
