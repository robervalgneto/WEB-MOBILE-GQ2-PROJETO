import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Sobre() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sobre o MangueTour</Text>

      <View style={styles.descriptionBox}>
        <Text style={styles.description}>
          O MangueTour é uma plataforma interativa que conecta você às raízes culturais do Recife. 
          Através de pontos turísticos icônicos e da influência do movimento manguebeat, 
          oferece um mergulho na história, arte e resistência que moldaram a cidade.
        </Text>
      </View>

      <Pressable
        onPress={() => router.back()}
        style={({ pressed }) => [
          styles.button,
          pressed && { opacity: 0.8 },
        ]}
      >
        <Text style={styles.buttonText}>Voltar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFDF9",
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#5C3A21",
  },
  descriptionBox: {
    backgroundColor: "#8B5E3C",
    padding: 20,
    borderRadius: 12,
    marginBottom: 32,
    maxWidth: 380,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#fff",
  },
  button: {
    backgroundColor: "#8B5E3C",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
