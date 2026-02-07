import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from './types';
import HomeScreen from '../features/stores/screens/HomeScreen';
import ProductListScreen from '../features/products/screens/ProductListScreen';
import CartScreen from '../features/cart/screens/CartScreen';
import ProfileScreen from '../features/auth/screens/ProfileScreen';
import { colors } from '../shared/constants/colors';

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.disabled,
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: '#FFFFFF',
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
      <Tab.Screen name="Products" component={ProductListScreen} options={{ title: 'Prodotti' }} />
      <Tab.Screen name="Cart" component={CartScreen} options={{ title: 'Carrello' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profilo' }} />
    </Tab.Navigator>
  );
}
