// store/comentariosStore.ts
import { create } from 'zustand';
import Parse from '../parseConfig';

interface Comentario {
  id: string;
  nome: string;
  mensagem: string;
}

interface ComentarioStore {
  comentarios: Comentario[];
  carregarComentarios: () => Promise<void>;
  adicionarComentario: (nome: string, mensagem: string) => Promise<void>;
  atualizarComentario: (id: string, novoTexto: string) => Promise<void>;
  removerComentario: (id: string) => Promise<void>;
}

export const useComentarioStore = create<ComentarioStore>((set) => ({
  comentarios: [],

  carregarComentarios: async () => {
    const Comentario = Parse.Object.extend('Comentario');
    const query = new Parse.Query(Comentario);
    const results = await query.find();
    const comentarios = results.map((item) => ({
      id: item.id,
      nome: item.get('nome'),
      mensagem: item.get('mensagem'),
    }));
    set({ comentarios });
  },

  adicionarComentario: async (nome, mensagem) => {
    const Comentario = Parse.Object.extend('Comentario');
    const novoComentario = new Comentario();
    novoComentario.set('nome', nome);
    novoComentario.set('mensagem', mensagem);
    await novoComentario.save();
    await useComentarioStore.getState().carregarComentarios();
  },

  atualizarComentario: async (id, novoTexto) => {
    const Comentario = Parse.Object.extend('Comentario');
    const query = new Parse.Query(Comentario);
    const comentario = await query.get(id);
    comentario.set('mensagem', novoTexto);
    await comentario.save();
    await useComentarioStore.getState().carregarComentarios();
  },

  removerComentario: async (id) => {
    const Comentario = Parse.Object.extend('Comentario');
    const query = new Parse.Query(Comentario);
    const comentario = await query.get(id);
    await comentario.destroy();
    await useComentarioStore.getState().carregarComentarios();
  },
}));
