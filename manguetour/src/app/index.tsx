import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [isCadastro, setIsCadastro] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");

  const handleLogin = () => {
    alert(`Login: ${email}`);
    setMostrarLogin(false);
  };

  const handleCadastro = () => {
    alert(`Cadastro: ${nome} (${email})`);
    setMostrarLogin(false);
  };

  return (
    <View style={styles.container}>
      {}
      <View style={styles.navbar}>
        <Pressable onPress={() => router.push("/")} style={styles.navItem}>
          <Text style={styles.navText}>Home</Text>
        </Pressable>
        <Pressable onPress={() => router.push("/locais")} style={styles.navItem}>
          <Text style={styles.navText}>Locais</Text>
        </Pressable>
        <Pressable onPress={() => router.push("/sobre")} style={styles.navItem}>
          <Text style={styles.navText}>Sobre</Text>
        </Pressable>
        <Pressable onPress={() => setMostrarLogin(true)} style={styles.loginButton}>
          <Text style={styles.navText}>Login</Text>
        </Pressable>
      </View>

      <Text style={styles.title}>MangueTour</Text>
      <Text style={styles.subtitle}>Uma jornada cultural pelo Recife</Text>
      <Text style={styles.description}>
        Descubra os pontos emblemáticos do movimento manguebeat e explore a arte,
        música e história dessa cultura única.
      </Text>

      <Pressable
        onPress={() => router.push("/locais")}
        style={({ pressed }) => [styles.button, pressed && { opacity: 0.8 }]}
      >
        <Text style={styles.buttonText}>Explorar Locais</Text>
      </Pressable>

      <Pressable
        onPress={() => router.push("/sobre")}
        style={({ pressed }) => [styles.linkButton, pressed && { opacity: 0.6 }]}
      >
        <Text style={styles.linkButtonText}>Sobre o MangueTour</Text>
      </Pressable>

      {/* Caixa de Login/Cadastro */}
      {mostrarLogin && (
        <KeyboardAvoidingView
          style={styles.loginBoxContainer}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View style={styles.loginBox}>
            <Text style={styles.loginTitle}>
              {isCadastro ? "Cadastro" : "Login"}
            </Text>

            {isCadastro && (
              <TextInput
                placeholder="Nome"
                placeholderTextColor="#bbb"
                style={styles.input}
                value={nome}
                onChangeText={setNome}
              />
            )}

            <TextInput
              placeholder="Email"
              placeholderTextColor="#bbb"
              style={styles.input}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              placeholder="Senha"
              placeholderTextColor="#bbb"
              style={styles.input}
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
            />

            <Pressable
              style={({ pressed }) => [
                styles.button,
                pressed && { backgroundColor: "#5C3A21" },
              ]}
              onPress={isCadastro ? handleCadastro : handleLogin}
            >
              <Text style={styles.buttonText}>
                {isCadastro ? "Cadastrar" : "Entrar"}
              </Text>
            </Pressable>

            <Pressable onPress={() => setIsCadastro(!isCadastro)}>
              <Text style={styles.linkButtonText}>
                {isCadastro ? "Já tem conta? Faça login" : "Criar nova conta"}
              </Text>
            </Pressable>

            <Pressable onPress={() => setMostrarLogin(false)}>
              <Text style={[styles.linkButtonText, { marginTop: 12 }]}>
                Fechar
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    alignItems: "center",
    paddingTop: 80,
    paddingHorizontal: 24,
  },
  navbar: {
    position: "absolute",
    top: 0,
    width: "100%",
    backgroundColor: "#8B5E3C",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 24,
    zIndex: 10,
  },
  navItem: {
    paddingHorizontal: 8,
  },
  navText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  loginButton: {
    backgroundColor: "#5C3A21",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#5C3A21",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    fontStyle: "italic",
    marginBottom: 12,
    color: "#8B5E3C",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#444",
    marginBottom: 32,
    maxWidth: 340,
  },
  button: {
    backgroundColor: "#8B5E3C",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  linkButton: {
    padding: 10,
  },
  linkButtonText: {
    color: "#5C3A21",
    textDecorationLine: "underline",
    fontSize: 16,
    textAlign: "center",
  },
  loginBoxContainer: {
    position: "absolute",
    top: 100,
    right: 24,
    zIndex: 20,
  },
  loginBox: {
    width: 280,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  loginTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
    color: "#8B5E3C",
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 12,
  },
});
