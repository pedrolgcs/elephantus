import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// pages
import SignIn from '../pages/SignIn';
import Doubts from '../pages/Doubts';

const Auth = createStackNavigator();

const Routes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Auth.Screen name="SignIn" component={SignIn} />
    <Auth.Screen name="Doubts" component={Doubts} />
  </Auth.Navigator>
);

export default Routes;
