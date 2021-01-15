import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

// routes
import Routes from './routes';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F8F8" />
      <Routes />
    </NavigationContainer>
  );
};

export default App;
