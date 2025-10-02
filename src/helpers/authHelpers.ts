import { signIn as signInService } from "../services/authService";

export const validateEmail = (email: string) => email.includes("@");

export const validatePassword = (password: string) => password.length >= 6;

export const loginUser = async (email: string, password: string) => {
  if (!validateEmail(email)) {
    throw new Error("Digite um email válido.");
  }
  if (!validatePassword(password)) {
    throw new Error("A senha deve ter pelo menos 6 caracteres.");
  }
  return signInService(email, password);
};
