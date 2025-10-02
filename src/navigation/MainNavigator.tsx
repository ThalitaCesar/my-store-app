import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../contexts/AuthContext";
import LoginScreen from "../screens/Auth/LoginScreen";
import SignUpScreen from "../screens/Auth/SignUpScreen";
import AppTabs from "./AppTabs";
import AppHeader from "../components/Header";

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function MainNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  return (
    <Stack.Navigator>
      {user ? (
        <Stack.Screen
          name="Home"
          component={AppTabs}
          options={{
            headerTitle: () => <AppHeader appName="My Store App" />,
          }}
        />
      ) : (
        <>
         <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerTitle: () => <AppHeader appName="My Store App" showMenu={false} />,
            }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{
              headerTitle: () => <AppHeader appName="My Store App" showMenu={false} />,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
