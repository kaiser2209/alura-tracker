<template>
    <div class="box formulario">
        <div class="columns">
            <div class="column is-5" role="form" aria-label="Formulário para criação de uma nova tarefa">
                <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?" v-model="descricao">
            </div>
            <div class="column is-3">
                <div class="select">
                    <select v-model="idProjeto">
                        <option value="">Selecione o projeto</option>
                        <option v-for="projeto in projetos" :value="projeto.id" :key="projeto.id">{{ projeto.nome }}</option>
                    </select>
                </div>
            </div>
            <div class="column">
                <Temporizador @aoTemporizadorFinalizado="finalizarTarefa"/>
                
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { TipoNotificacao } from '@/interfaces/INotificacao';
import { key } from '@/store';
import { NOTIFICAR } from '@/store/mutations-type';
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import Temporizador from './Temporizador.vue';

export default defineComponent({
    name: 'FormularioMain',
    emits: ['aoSalvarTarefa'],
    components: {
        Temporizador
    },
    data() {
        return {
            descricao: '',
            idProjeto: ''
        }
    },
    methods: {
        finalizarTarefa(tempoDecorrido: number): void {
            const projeto = this.projetos.find(projeto => projeto.id == this.idProjeto);

            if(!projeto) {
                this.store.commit(NOTIFICAR, {
                    titulo: 'Erro ao salvar tarefa',
                    texto: 'Selecione um projeto antes de finalizar a tarefa',
                    tipo: TipoNotificacao.FALHA
                })

                return;
            }

            this.$emit('aoSalvarTarefa', {
                duracaoEmSegundos: tempoDecorrido,
                descricao: this.descricao,
                projeto: this.projetos.find(projeto => projeto.id == this.idProjeto)
            });
            this.descricao = '';
        }
    },
    setup() {
        const store = useStore(key);
        return {
            projetos: computed(() => store.state.projetos),
            store
        }
    }
});

</script>

<style>
.formulario {
    background-color: var(--bg-primario);
    color: var(--texto-primario);
}
</style>