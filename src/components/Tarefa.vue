<template>
    <Box>
        <div class="columns clickable" @click="tarefaClicada">
            <div class="column is-4">
                {{ tarefa.descricao || 'Tarefa sem descrição' }}
            </div>
            <div class="column is-3">
                {{ tarefa.projeto?.nome || 'Tarefa sem projeto' }}
            </div>
            <div class="column">
                <CronometroSimples :tempoEmSegundos="tarefa.duracaoEmSegundos" />
            </div>
        </div>
    </Box>
</template>

<script lang="ts">
import ITarefa from '@/interfaces/ITarefa';
import { defineComponent, PropType } from 'vue';
import CronometroSimples from './CronometroSimples.vue';
import Box from './Box.vue';

export default defineComponent({
    name: 'Tarefa',
    emits: ['aoTarefaClicada'],
    props: {
        tarefa: {
            type: Object as PropType<ITarefa>,
            required: true
        }
    },
    components: {
        CronometroSimples,
        Box
    },
    
    setup(props, { emit }) {
        const tarefaClicada = () => {
            emit('aoTarefaClicada', props.tarefa);
        }

        return {
            tarefaClicada
        }
    }
});
</script>

<style scoped>
.clickable {
    cursor: pointer;
}
</style>