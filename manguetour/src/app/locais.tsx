import React from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";

type Local = {
  id: string;
  nome: string;
};

const pontosTuristicos: Local[] = [
  { id: "1", nome: "Marco Zero — O Coração do Mangue" },
  { id: "2", nome: "Rua da Moeda — O QG da Lama Sonora" },
  { id: "3", nome: "Parque das Esculturas de Francisco Brennand" },
  { id: "4", nome: "Bar Estelita — Resistência com Guitarra na Veia" },
  { id: "5", nome: "Instituto Ricardo Brennand — Um Castelo no Fim do Mangue" },
  { id: "6", nome: "Alto da Sé — O Mirante do Frevo e da Fé" },
];

export default function Locais() {
  const router = useRouter();

  const renderItem = ({ item }: { item: Local }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.nome}>{item.nome}</Text>
      <Pressable
        style={({ pressed }) => [
          styles.botao,
          pressed && { backgroundColor: "#5C3A21" },
        ]}
        onPress={() => router.push(`/detalhes/${item.id}`)}
      >
        <Text style={styles.textBotao}>Ver Detalhes</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={pontosTuristicos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListFooterComponent={() => (
          <Pressable
            style={({ pressed }) => [
              styles.voltarBotao,
              pressed && { backgroundColor: "#5C3A21" },
            ]}
            onPress={() => router.push("/")}
          >
            <Text style={styles.textBotao}>Voltar para a Home</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
  },
  listContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 40,
  },
  itemContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 12,
    alignItems: "center",
  },
  nome: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#2c3e50",
    textAlign: "center",
  },
  botao: {
    backgroundColor: "#8B5E3C",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginTop: 6,
  },
  textBotao: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  voltarBotao: {
    backgroundColor: "#8B5E3C",
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 8,
    marginTop: 32,
    alignSelf: "center",
  },
});
