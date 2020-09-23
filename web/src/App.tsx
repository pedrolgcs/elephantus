import React from 'react';

// styles
import GlobalStyle from './styles/global';

// context
import AppProvider from './hooks';

// pages temporary
import SignIn from './pages/SignIn';

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <AppProvider>
      <SignIn />
    </AppProvider>
  </>
);

export default App;
