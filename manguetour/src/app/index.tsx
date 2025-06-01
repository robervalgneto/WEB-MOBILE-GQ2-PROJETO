import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MangueTour</Text>
      <Text style={styles.description}>
        Um mergulho no coração cultural do Recife, onde o mangue encontra a arte, a música e a resistência. Descubra lugares emblemáticos que representam o espírito do movimento manguebeat.
      </Text>

      <Pressable
        onPress={() => router.push("/locais")}
        style={({ pressed }) => [
          styles.button,
          pressed && { backgroundColor: "#5C3A21" },
        ]}
      >
        <Text style={styles.buttonText}>Locais</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 32,
    color: "#444",
  },
  button: {
    backgroundColor: "#8B5E3C",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
