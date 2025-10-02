import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductListScreen from '../screens/Products/ProductListScreen';
import FavoritesScreen from '../screens/Products/FavoritesScreen';
import { MaterialIcons } from '@expo/vector-icons';

export type TabParamList = {
  Products: undefined;
  Favorites: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, 
        tabBarActiveTintColor: '#6200ee',
        tabBarInactiveTintColor: '#6b6b6b',
        tabBarShowLabel: false, 
      }}
    >
      <Tab.Screen
        name="Products"
        component={ProductListScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="store" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="favorite" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
