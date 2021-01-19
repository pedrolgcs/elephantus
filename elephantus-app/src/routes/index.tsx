import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// pages
import SignIn from '../pages/SignIn';

const Auth = createStackNavigator();

const Routes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName="SignIn"
  >
    <Auth.Screen name="SignIn" component={SignIn} />
  </Auth.Navigator>
);

export default Routes;
