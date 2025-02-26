import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import ProductListScreen from '../screens/ProductListScreen/ProductListScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen/ProductDetailScreen';
import CustomDrawer from './CustomDrawer ';
import CategoryListScreen from '../screens/CategoryListScreen/CategoryListScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// Stack Navigator for Product Screens
const ProductStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ProductList" component={ProductListScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
};

const CategorStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Categories" component={CategoryListScreen} />
    </Stack.Navigator>
  );
};

const RootNavigation = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Login"
      drawerContent={props => <CustomDrawer {...props} />} 
      screenOptions={{headerShown: false}}>
      <Drawer.Screen name="Login" component={LoginScreen} />
      <Drawer.Screen name="Products" component={ProductStack} />
      <Drawer.Screen name="Category" component={CategorStack} />
    </Drawer.Navigator>
  );
};

export default RootNavigation;
