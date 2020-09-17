import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

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

  animation: ${appearFromLeft} 1.5s;

  img {
    width: 15rem;
    height: 15rem;
  }

  form {
    margin: 2rem 0;
    width: 35rem;

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
