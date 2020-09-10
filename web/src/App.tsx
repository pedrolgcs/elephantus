import React from 'react';

// styles
import GlobalStyle from './styles/global';

// pages temporary
import SignIn from './pages/SignIn';

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <SignIn />
  </>
);

export default App;
