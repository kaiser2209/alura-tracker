<template>
   <section>
        <strong class="display">
            {{ tempoDecorrido }}
        </strong>
    </section> 
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
    name: 'CronometroSimples',
    props: {
        tempoEmSegundos : {
            type: Number,
            default: 0
        }
    },

    setup(props) {
        const tempoDecorrido = computed(() => new Date(props.tempoEmSegundos * 1000).toISOString().substring(11, 19));

        return {
            tempoDecorrido
        }
    }
});
</script>

<style scoped>
.display {
    color: var(--texto-primario);
}
</style>