import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import axios from "axios";

interface Comentario {
  objectId: string;
  texto: string;
}

const Comentarios = () => {
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [texto, setTexto] = useState("");
  const [editandoId, setEditandoId] = useState<string | null>(null);

  const APP_ID = "SUA_APP_ID_AQUI";
  const REST_API_KEY = "SUA_REST_API_KEY_AQUI";
  const CLASS_NAME = "Comentario";
  const BASE_URL = `https://parseapi.back4app.com/classes/${CLASS_NAME}`;

  const headers = {
    "X-Parse-Application-Id": APP_ID,
    "X-Parse-REST-API-Key": REST_API_KEY,
    "Content-Type": "application/json",
  };

  const buscarComentarios = async () => {
    try {
      const res = await axios.get(BASE_URL, { headers });
      setComentarios(res.data.results);
    } catch (err) {
      Alert.alert("Erro", "Erro ao buscar comentários.");
    }
  };

  useEffect(() => {
    buscarComentarios();
  }, []);

  const adicionarComentario = async () => {
    if (!texto.trim()) return;
    try {
      const res = await axios.post(BASE_URL, { texto }, { headers });
      setTexto("");
      buscarComentarios();
    } catch (err) {
      Alert.alert("Erro", "Erro ao adicionar comentário.");
    }
  };

  // Atualizar comentário
  const atualizarComentario = async () => {
    if (!texto.trim() || !editandoId) return;
    try {
      await axios.put(`${BASE_URL}/${editandoId}`, { texto }, { headers });
      setTexto("");
      setEditandoId(null);
      buscarComentarios();
    } catch (err) {
      Alert.alert("Erro", "Erro ao atualizar comentário.");
    }
  };


  const deletarComentario = async (id: string) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`, { headers });
      buscarComentarios();
    } catch (err) {
      Alert.alert("Erro", "Erro ao deletar comentário.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Comentários</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu comentário"
        value={texto}
        onChangeText={setTexto}
      />

      <Button
        title={editandoId ? "Atualizar" : "Adicionar"}
        onPress={editandoId ? atualizarComentario : adicionarComentario}
      />

      <FlatList
        data={comentarios}
        keyExtractor={(item) => item.objectId}
        style={{ marginTop: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.texto}>{item.texto}</Text>
            <View style={styles.botoes}>
              <Pressable
                onPress={() => {
                  setTexto(item.texto);
                  setEditandoId(item.objectId);
                }}
              >
                <Text style={styles.link}>Editar</Text>
              </Pressable>
              <Pressable onPress={() => deletarComentario(item.objectId)}>
                <Text style={[styles.link, { color: "red" }]}>Excluir</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Comentarios;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#FAFAFA",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#5C3A21",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: "#FFF",
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#EEE",
  },
  texto: {
    fontSize: 16,
    marginBottom: 8,
  },
  botoes: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  link: {
    color: "#5C3A21",
    fontWeight: "bold",
  },
});
