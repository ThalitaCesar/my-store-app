import 'react-native-gesture-handler';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainNavigator from './src/navigation/MainNavigator';
import { buildTheme } from './src/theme/theme';
import { FavoritesProvider } from './src/context/FavoritesContext';

const queryClient = new QueryClient();

buildTheme();

export default function App() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <PaperProvider>
          <FavoritesProvider>
            <NavigationContainer>
              <MainNavigator />
            </NavigationContainer>
          </FavoritesProvider>
        </PaperProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
