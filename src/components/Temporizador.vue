<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">
        <CronometroSimples :tempoEmSegundos="tempoEmSegundos" />
        <ButtonTask @aoClicar="iniciar" :disabled="cronometroRodando" text="play"><i class="fas fa-play"></i></ButtonTask>
        <ButtonTask @aoClicar="finalizar" :disabled="!cronometroRodando" text="stop"><i class="fas fa-stop"></i></ButtonTask>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CronometroSimples from './CronometroSimples.vue';
import ButtonTask from './ButtonTask.vue';

export default defineComponent({
    name: 'Temporizador',
    emits: ['aoTemporizadorFinalizado'],
    data () {
        return {
            tempoEmSegundos: 0,
            cronometro: 0,
            cronometroRodando: false
        }
    },
    methods: {
        iniciar () {
            this.cronometroRodando = true;
            this.cronometro = setInterval(() => {
                this.tempoEmSegundos += 1;
            }, 1000);
        },
        finalizar() {
            this.cronometroRodando = false;
            clearInterval(this.cronometro);
            this.$emit('aoTemporizadorFinalizado', this.tempoEmSegundos);
            this.tempoEmSegundos = 0;
        }
    },
    components: {
        CronometroSimples,
        ButtonTask
    }
});
</script>