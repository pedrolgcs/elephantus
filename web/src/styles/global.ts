import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  html {
    font-size: 62.5%;
  }

  body {
    background: var(--white);
    color: var(--text);
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-family: 'Roboto Slab', serif;
    font-size: 1.6rem;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }

  :root {
    --white: #f7f7f7;

    --text: #313131;
    --input: #FFF8F0;
    --placeholder: #666360;
    --inputFocus: #70ABAF;
    --inputError: #f25748;
    --inputSuccess: #70B77E;

    --buttonRed: #f25748;

    /* utils */
    --link: #1B9AAA;

    /* tooltip */
    --tooltipText: #f7f7f7;
    --tooltipInfo: #70ABAF;
    --tooltipError: #f25748;

    /* toast */
    --toastInfo: #ebf8ff;
    --toastInfoText: #3172b7;
    --toastSuccess: #e6fffa;
    --toastSuccessText: #2e656a;
    --toastError: #fddede;
    --toastErrorText: #c53030;
  }

`;
