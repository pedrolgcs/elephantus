import React from 'react';
import { BrowserRouter } from 'react-router-dom';

// styles
import GlobalStyle from './styles/global';

// context
import AppProvider from './hooks';

// routes
import Routes from './routes';

const App: React.FC = () => (
  <BrowserRouter>
    <GlobalStyle />
    <AppProvider>
      <Routes />
    </AppProvider>
  </BrowserRouter>
);

export default App;
