import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

// images
import signInBackgroundImg from '../../assets/sign-in-background.png';

// animations
const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translatey(-100px);
  }
  to {
    opacity: 1;
    transform: translateY();
  }
`;

export const Container = styled.div`
  min-height: 100vh;

  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 700px;

  animation: ${appearFromLeft} 1.5s;

  img {
    width: 15rem;
    height: 15rem;
  }

  form {
    margin: 3rem 0;
    width: 38rem;

    h1 {
      margin-bottom: 2.4rem;
    }

    /* margin top input */
    div {
      & + div {
        margin-top: 10px;
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
    color: var(--link);
    display: block;
    font-size: 1.8rem;
    margin-top: 2.4rem;
    text-decoration: none;
    transition: color 0.5s;

    &:hover {
      color: ${shade(0.2, '#1B9AAA')};
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

      div {
        margin: 0 auto;
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
