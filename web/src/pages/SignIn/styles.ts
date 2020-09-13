import styled from 'styled-components';
import { shade } from 'polished';

import signInBackgroundImg from '../../assets/sign-in-background.png';

export const Container = styled.div`
  min-height: 100vh;

  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 700px;

  form {
    margin: 8rem 0;
    width: 34rem;

    h1 {
      margin-bottom: 2.4rem;
    }

    input {
      background: #232129;
      color: #f4ede8;
      border-radius: 1rem;
      border: 2px solid #232129;
      padding: 1.6rem;
      width: 100%;

      &::placeholder {
        color: #666360;
      }

      & + input {
        margin-top: 0.8rem;
      }
    }

    button {
      background: #ff9000;
      height: 56px;
      border-radius: 1rem;
      border: 0;
      padding: 0 1.6rem;
      width: 100%;
      color: #312e38;
      font-weight: 500;
      margin-top: 1.6rem;
      transition: background-color 0.5s;

      &:hover {
        background: ${shade(0.2, '#ff9000')};
      }
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 2.4rem;
      text-decoration: none;
      transition: color 0.5s;
      text-align: center;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }

  > a {
    color: #ff9000;
    display: block;
    margin-top: 2.4rem;
    text-decoration: none;
    transition: color 0.5s;

    &:hover {
      color: ${shade(0.2, '#ff9000')};
    }

    svg {
      margin-right: 1.6rem;
    }

    display: flex;
    align-items: center;
    justify-content: center;
  }

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 540px) {
    margin: 5rem 0;

    form {
      width: 100%;
      text-align: center;

      input {
        width: 90%;
      }

      button {
        width: 90%;
      }
    }

    > a {
      margin-top: 1rem;
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signInBackgroundImg}) no-repeat center;
  background-size: cover;
`;
