import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

const locaisDetalhes: Record<string, { nome: string; imagem: any }> = {
  "1": {
    nome: "Marco Zero — O Coração do Mangue",
    imagem: require("@/assets/marco_zero.jpg"),
  },
  "2": {
    nome: "Rua da Moeda — O QG da Lama Sonora",
    imagem: require("@/assets/rua_da_moeda.jpg"),
  },
  "3": {
    nome: "Parque das Esculturas de Francisco Brennand",
    imagem: require("@/assets/parque_das_esculturas.jpg"),
  },
  "4": {
    nome: "Bar Estelita — Resistência com Guitarra na Veia",
    imagem: require("@/assets/estelita.jpg"),
  },
  "5": {
    nome: "Instituto Ricardo Brennand — Um Castelo no Fim do Mangue",
    imagem: require("@/assets/instituto_ricardo_brennand.jpg"),
  },
  "6": {
    nome: "Alto da Sé — O Mirante do Frevo e da Fé",
    imagem: require("@/assets/alto_da_se.jpg"),
  },
};

export default function Detalhes() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const local = locaisDetalhes[id ?? ""];

  const [comentario, setComentario] = useState("");
  const [comentarios, setComentarios] = useState<string[]>([]);

  const enviarComentario = () => {
    if (comentario.trim()) {
      setComentarios((prev) => [...prev, comentario.trim()]);
      setComentario("");
    }
  };

  if (!local) {
    return (
      <View style={styles.container}>
        <Text style={styles.nome}>Local não encontrado</Text>
        <Pressable onPress={() => router.back()} style={styles.voltarBotao}>
          <Text style={styles.textBotao}>← Voltar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.nome}>{local.nome}</Text>
      <Image source={local.imagem} style={styles.imagem} resizeMode="cover" />

      <Text style={styles.comentarioTitulo}>Comentários</Text>
      {comentarios.map((c, i) => (
        <Text key={i} style={styles.comentario}>
          {c}
        </Text>
      ))}

      <TextInput
        placeholder="Deixa teu rastro no mangue"
        value={comentario}
        onChangeText={setComentario}
        style={styles.input}
      />

      <Pressable onPress={enviarComentario} style={styles.botao}>
        <Text style={styles.textBotao}>Enviar</Text>
      </Pressable>

      <Pressable onPress={() => router.back()} style={styles.voltarBotao}>
        <Text style={styles.textBotao}>← Voltar</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  nome: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
    color: "#5C3A21",
    textAlign: "center",
  },
  imagem: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    marginBottom: 24,
  },
  comentarioTitulo: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
    alignSelf: "flex-start",
  },
  comentario: {
    alignSelf: "flex-start",
    backgroundColor: "#f2f2f2",
    padding: 10,
    marginBottom: 6,
    borderRadius: 6,
    width: "100%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    width: "100%",
    borderRadius: 8,
    marginTop: 16,
  },
  botao: {
    backgroundColor: "#8B5E3C",
    padding: 14,
    borderRadius: 8,
    marginTop: 12,
    width: "100%",
    alignItems: "center",
  },
  textBotao: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  voltarBotao: {
    marginTop: 24,
    backgroundColor: "#8B5E3C",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
  },
});
