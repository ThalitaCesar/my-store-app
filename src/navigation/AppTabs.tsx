import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductListScreen from '../screens/Products/ProductListScreen';
import FavoritesScreen from '../screens/Products/FavoritesScreen';
import { IconButton } from 'react-native-paper';
import { auth } from '../config/firebaseConfig';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './MainNavigator'; // Stack que contém Login e Home

export type TabParamList = {
  Products: undefined;
  Favorites: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function AppTabs() {
  const stackNavigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#6200ee',
        tabBarInactiveTintColor: '#6b6b6b',
      }}
    >
      <Tab.Screen
        name="Products"
        component={ProductListScreen}
        options={{
          title: 'Produtos',
          headerRight: () => (
            <IconButton
              icon="logout"
              size={24}
              onPress={async () => {
                await auth.signOut();
                stackNavigation.replace('Login'); // agora funciona
              }}
            />
          ),
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="store" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: 'Favoritos',
          headerRight: () => (
            <IconButton
              icon="logout"
              size={24}
              onPress={async () => {
                await auth.signOut();
                stackNavigation.replace('Login');
              }}
            />
          ),
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="favorite" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
