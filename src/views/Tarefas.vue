<template>
  <FormularioMain @aoSalvarTarefa="salvarTarefa"/>
  <div class="lista">
      <div class="field">
        <p class="control has-icons-left">
          <input type="text" class="input" placeholder="Digite para Filtrar" v-model="filtro">
          <span class="icon is-small is-left">
            <i class="fas fa-search"></i>
          </span>
        </p>
      </div>
      <Tarefa v-for="(tarefa, i) in tarefas" :key="i" :tarefa="tarefa" @aoTarefaClicada="selecionarTarefa"/>
      <Box v-if="listaEstaVazia">
      Você não está muito produtivo hoje :(
      </Box>
      <Modal :mostrar="(tarefaSelecionada != null)" v-if="tarefaSelecionada">
        <template v-slot:header>
            <p class="modal-card-title">Editando uma tarefa</p>
            <button class="delete" aria-label="close" @click="fecharModal"></button>
        </template>
        <template v-slot:body>
          <div class="field">
              <label for="textoTarefa" class="label">Descrição</label>
              <input type="text" class="input" id="textoTarefa" v-model="tarefaSelecionada.descricao">
          </div>
        </template>
        <template v-slot:footer>
            <button class="button is-success" @click="atualizarTarefa">Salvar Alterções</button>
            <button class="button" @click="fecharModal">Cancelar</button>
        </template>
      </Modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from 'vue';
import FormularioMain from '../components/FormularioMain.vue';
import Tarefa from '../components/Tarefa.vue';
import ITarefa from '../interfaces/ITarefa';
import Box from '../components/Box.vue';
import Modal from '../components/Modal.vue';
import { useStore } from '@/store';
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS } from '@/store/actions-type';

export default defineComponent({
  name: 'App',
  components: { 
    FormularioMain,  
    Tarefa,
    Box,
    Modal
  },

  setup () {
    const store = useStore();
    store.dispatch(OBTER_TAREFAS);
    store.dispatch(OBTER_PROJETOS);

    const tarefaSelecionada = ref(null as ITarefa | null);
    const tarefas = computed(() => store.state.tarefa.tarefas);
    const listaEstaVazia = computed(() => tarefas.value?.length == 0);
    const filtro = ref('');

    const salvarTarefa = (tarefa: ITarefa) => {
      store.dispatch(CADASTRAR_TAREFA, tarefa);
    }

    const selecionarTarefa = (tarefa: ITarefa) => {
      tarefaSelecionada.value = tarefa;
    }

    const fecharModal = () => {
      tarefaSelecionada.value = null;
    }

    const atualizarTarefa = () => {
      store.dispatch(ALTERAR_TAREFA, tarefaSelecionada.value)
        .then(() => fecharModal());
    }

    watchEffect(() => {
      store.dispatch(OBTER_TAREFAS, filtro.value);
    })

    return {
      tarefas,
      tarefaSelecionada,
      listaEstaVazia,
      filtro,
      salvarTarefa,
      selecionarTarefa,
      fecharModal,
      atualizarTarefa,
    }
  }
});
</script>

<style>
.lista {
    padding: 1.25rem;
}
</style>
