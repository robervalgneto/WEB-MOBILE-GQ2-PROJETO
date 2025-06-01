import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MangueTour</Text>
      <Text style={styles.subtitle}>
        Uma jornada cultural pelo Recife
      </Text>
      <Text style={styles.description}>
        Descubra os pontos emblemáticos do movimento manguebeat e explore a arte, música e história dessa cultura única.
      </Text>

      <Pressable
        onPress={() => router.push("/locais")}
        style={({ pressed }) => [
          styles.button,
          pressed && { opacity: 0.8 },
        ]}
      >
        <Text style={styles.buttonText}>Explorar Locais</Text>
      </Pressable>

      <Pressable
        onPress={() => router.push("/sobre")}
        style={({ pressed }) => [
          styles.linkButton,
          pressed && { opacity: 0.6 },
        ]}
      >
        <Text style={styles.linkButtonText}>Sobre o MangueTour</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
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
  },
  linkButton: {
    padding: 10,
  },
  linkButtonText: {
    color: "#5C3A21",
    textDecorationLine: "underline",
    fontSize: 16,
  },
});
