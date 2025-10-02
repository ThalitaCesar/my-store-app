import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useAuth } from "../../contexts/AuthContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/MainNavigator";
import { globalStyles } from "../../styles/styles";

type SignUpScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "SignUp">;

export default function SignUpScreen() {
  const { signUp } = useAuth();
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    try {
      setLoading(true);
      setError("");
      await signUp(email, password);
      navigation.replace("Login");
    } catch (err: any) {
      setError(err.message || "Erro ao criar conta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Criar Conta</Text>

      {error ? <Text style={globalStyles.error}>{error}</Text> : null}

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
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
        onPress={handleSignUp}
        loading={loading}
        style={[globalStyles.button, { marginTop: 10 }]} 
      >
        Cadastrar
      </Button>

      <View style={globalStyles.linkContainer}>
        <Text style={globalStyles.linkText}>
          Já tem conta?{" "}
          <Text
            style={globalStyles.link}
            onPress={() => navigation.goBack()}
          >
            Entrar
          </Text>
        </Text>
      </View>
    </View>
  );
}
