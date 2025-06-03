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

const locaisDetalhes: Record<
  string,
  { nome: string; imagem: any; descricao: string; endereco: string }
> = {
  "1": {
    nome: "Marco Zero — O Coração do Mangue",
    imagem: require("@/assets/marco_zero.jpg"),
    descricao:
      "Esse é o ponto de partida, literalmente. O Marco Zero é onde tudo começa e tudo ferve: palcos de carnaval, maracatu latejando, e o cheiro de maresia misturado com ideias revolucionárias. Aqui, Chico Science já deu o recado com suas letras cortantes, e o mangue virou símbolo. Do lado, esculturas de Brennand e o oceano encontrando o Capibaribe — é arte, cultura e resistência brotando do chão de pedra. Por que é manguebeat? Porque é o epicentro do movimento, onde Recife gritou pro mundo que tinha um cérebro eletrônico plugado num caranguejo.",
    endereco: "Praça Rio Branco, Recife Antigo, Recife - PE, 50030-230",
  },
  "2": {
    nome: "Rua da Moeda — O QG da Lama Sonora",
    imagem: require("@/assets/rua_da_moeda.jpg"),
    descricao:
      "Sabe aquele lugar onde você sente que pode trombar com uma banda tocando embolada com sampler no meio da rua? Pois é, a Rua da Moeda é esse lugar. Antiga, charmosa e pulsante, aqui os bares são vitrines do underground recifense, e as calçadas têm mais histórias que muito museu.Por que é manguebeat? Porque era (e é) ponto de encontro da galera mangue. Onde se tramava som, arte e revolução. Bebida na mão, ideia na cabeça e o som dos tambores no peito.",
    endereco: "Rua da Moeda, Recife Antigo, Recife - PE, 50030-040 ",
  },
  "3": {
    nome: "Parque das Esculturas de Francisco Brennand",
    imagem: require("@/assets/parque_das_esculturas.jpg"),
    descricao:
      "Do outro lado do Marco Zero, atravessando de barquinho, você chega num parque surreal. As esculturas brotam da água como se fossem totens de outra dimensão. Uma mistura de misticismo, natureza e urbanismo — parece cenário de um clipe do Nação Zumbi. Por que é manguebeat? Porque é arte com cheiro de mangue, misturando barro, história e imaginação — tudo que o manguebeat sempre fez com som.",
    endereco: "Em frente ao Marco Zero, Recife Antigo, Recife - PE, 51010-145",
  },
  "4": {
    nome: "Bar Estelita — Resistência com Guitarra na Veia",
    imagem: require("@/assets/estelita.jpg"),
    descricao:
      "O Estelita não é só um bar — é trincheira, é palco, é barricada cultural. De dia parece um galpão abandonado, à noite vira santuário do som marginal. Por lá já passaram bandas, poetas, performers, DJs e todo tipo de criatura do mangue. A galera senta na calçada, toma uma gelada e discute o mundo — do underground ao alto-falante. Por que é manguebeat? Porque representa tudo que o movimento defende: arte independente, crítica social e o direito à cidade. O Estelita lutou (e luta) contra a especulação imobiliária e é símbolo de resistência criativa em Recife. Se o caranguejo do mangue tivesse uma cervejaria, seria aqui",
    endereco: "Av. Saturnino de Brito, Cabanga, Recife - PE, 50090-310",
  },
  "5": {
    nome: "Instituto Ricardo Brennand — Um Castelo no Fim do Mangue",
    imagem: require("@/assets/instituto_ricardo_brennand.jpg"),
    descricao:
      "No meio de um bosque encantado em plena Várzea, ergue-se um castelo que parece ter saído de um sonho medieval. O Instituto Ricardo Brennand é arte em escala épica: armaduras, pinturas, esculturas e um acervo que vai de Frans Post a armas centenárias. Tudo envolto por jardins milimetricamente selvagens. É um mergulho num Recife que se conecta com o mundo, mas com os pés fincados no barro da sua história. Por que é manguebeat? Porque é uma explosão de estética, mistura o velho com o novo e transforma cultura em resistência silenciosa. Se o manguebeat tem raízes, aqui é onde ele dialoga com o passado pra moldar o futuro.",
    endereco: "Alameda Antônio Brennand, Várzea, Recife - PE, 50741-904",
  },
  "6": {
    nome: "Alto da Sé — O Mirante do Frevo e da Fé",
    imagem: require("@/assets/alto_da_se.jpg"),
    descricao:
      "Subindo as ladeiras de Olinda, você chega ao topo onde o tempo para e a vista abraça o Recife inteiro. O Alto da Sé é onde o batuque ecoa forte no chão de pedra colonial, misturando o som das ladeiras com o cheiro de tapioca feita na hora. Aqui tem feira, tem arte, tem igreja antiga e tem por do sol que parece milagre. Um lugar onde o sagrado e o profano dançam frevo juntos. Por que é manguebeat? Porque do alto se vê tudo — inclusive a beleza da mistura. O mangue pulsa aqui também, entre as ladeiras históricas e as antenas de TV captando o som das alfaias.",
    endereco: "Praça da Sé, Sítio Histórico de Olinda - PE, 53120-130",
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

      <Text style={styles.descricao}>{local.descricao}</Text>
      <Text style={styles.endereco}>📍 {local.endereco}</Text>

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
    height: 250,
    borderRadius: 10,
    marginBottom: 24,
  },
  descricao: {
    fontSize: 16,
    color: "#333",
    marginTop: -8,
    marginBottom: 8,
    textAlign: "justify",
  },
  endereco: {
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
    marginBottom: 24,
    alignSelf: "flex-start",
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
