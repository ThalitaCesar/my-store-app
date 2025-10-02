import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useAuth } from "../../contexts/AuthContext";
import { globalStyles } from "../../styles/styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/MainNavigator";
import { useNavigation } from "@react-navigation/native";

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Login">;

export default function LoginScreen() {
  const { signIn } = useAuth();
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");
      await signIn(email, password);
    } catch (err: any) {
      setError(err.message || "Erro ao fazer login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Login</Text>

      {error ? <Text style={globalStyles.error}>{error}</Text> : null}

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        mode="outlined"
        style={globalStyles.input}
      />

      <TextInput
        label="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        mode="outlined"
        style={globalStyles.input}
      />

      <Button
        mode="contained"
        onPress={handleLogin}
        loading={loading}
        style={[globalStyles.button, { marginTop: 10 }]} 
      >
        Entrar
      </Button>

      <View style={globalStyles.linkContainer}>
        <Text style={globalStyles.linkText}>
          Não tem conta?{" "}
          <Text
            style={globalStyles.link}
            onPress={() => navigation.navigate("SignUp")}
          >
            Cadastre-se
          </Text>
        </Text>
      </View>

    </View>
  );
}
