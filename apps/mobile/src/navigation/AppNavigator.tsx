import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAppSelector } from '../app/hooks';
import AuthStackNavigator from './AuthStackNavigator';
import MainTabNavigator from './MainTabNavigator';

export default function AppNavigator() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainTabNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}
