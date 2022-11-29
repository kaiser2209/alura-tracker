import { INotificacao } from "@/interfaces/INotificacao";
import IProjeto from "@/interfaces/IProjeto";
import ITarefa from "@/interfaces/ITarefa";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { ADICIONA_PROJETO, ADICONA_TAREFA, ALTERA_PROJETO, ATUALIZA_TAREFA, EXCLUIR_PROJETO, NOTIFICAR, REMOVE_TAREFA } from "./mutations-type";

interface Estado {
        projetos: IProjeto[];
        tarefas: ITarefa[];
        notificacoes: INotificacao[]
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
    state: {
        projetos: [],
        tarefas: [],
        notificacoes: []
    },
    mutations: {
        [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto
            } as IProjeto;
            state.projetos.push(projeto);
        },
        [ALTERA_PROJETO](state, projeto: IProjeto) {
            const index = state.projetos.findIndex(proj => proj.id === projeto.id);
            state.projetos[index] = projeto;
        },
        [EXCLUIR_PROJETO](state, id: string) {
            state.projetos = state.projetos.filter(projeto => projeto.id != id);
        },
        [ADICONA_TAREFA](state, tarefa: ITarefa) {
            tarefa.id = new Date().toISOString();
            state.tarefas.push(tarefa);
        },
        [ATUALIZA_TAREFA](state, tarefa: ITarefa) {
            const index = state.tarefas.findIndex(t => t.id === tarefa.id);
            state.tarefas[index] = tarefa;
        },
        [REMOVE_TAREFA](state, id: string) {
            state.tarefas = state.tarefas.filter(tarefa => tarefa.id != id);
        },
        [NOTIFICAR](state, notificacao: INotificacao) {
            notificacao.id = new Date().getTime();
            state.notificacoes.push(notificacao);

            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(n => n.id != notificacao.id);
            }, 3000);
        }
    }
});

export function useStore(): Store<Estado> {
    return vuexUseStore(key);
}