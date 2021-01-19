/* eslint-disable global-require */
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

// routes
import Routes from './src/routes';

const App: React.FC = () => {
  // load-fonts
  const [fontsLoaded] = useFonts({
    'Nunito-Light': require('./assets/fonts/Nunito-Light.ttf'),
    'Nunito-Regular': require('./assets/fonts/Nunito-Regular.ttf'),
    'Nunito-Bold': require('./assets/fonts/Nunito-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#f1f8f8" />
      <Routes />
    </NavigationContainer>
  );
};

export default App;
