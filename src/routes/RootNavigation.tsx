import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import ProductListScreen from '../screens/ProductListScreen/ProductListScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen/ProductDetailScreen';

const Stack = createStackNavigator();

const RootNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Login'}
      screenOptions={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ProductList" component={ProductListScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigation;
