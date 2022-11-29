<template>
    <FormularioMain @aoSalvarTarefa="salvarTarefa"/>
    <div class="lista">
        <Tarefa v-for="(tarefa, i) in tarefas" :key="i" :tarefa="tarefa"/>
        <Box v-if="listaEstaVazia">
        Você não está muito produtivo hoje :(
        </Box>
    </div>
  </template>
  
  <script lang="ts">
  import { computed, defineComponent } from 'vue';
  import FormularioMain from '../components/FormularioMain.vue';
  import Tarefa from '../components/Tarefa.vue';
  import ITarefa from '../interfaces/ITarefa';
  import Box from '../components/Box.vue';
import { useStore } from '@/store';
import { ADICONA_TAREFA, NOTIFICAR } from '@/store/mutations-type';
import { TipoNotificacao } from '@/interfaces/INotificacao';
  
  export default defineComponent({
    name: 'App',
    components: { 
      FormularioMain,  
      Tarefa,
      Box
    },
    computed: {
      listaEstaVazia(): boolean {
        return this.tarefas.length === 0;
      }
    },
    methods: {
      salvarTarefa(tarefa: ITarefa) {
        this.store.commit(ADICONA_TAREFA, tarefa);
      },
    },
    setup () {
      const store = useStore();
      return {
        tarefas: computed(() => store.state.tarefas),
        store
      }
    }
  });
  </script>
  
  <style>
  .lista {
      padding: 1.25rem;
  }
  </style>
  