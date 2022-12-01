<template>
    <section>
        <form @submit.prevent="salvar">
            <div class="field">
                <label for="nomeDoProjeto" class="label">
                    Nome do Projeto
                </label>
                <input type="text" class="input" id="nomeDoProjeto" v-model="nomeDoProjeto">
            </div>
            <div class="field">
                <button class="button" type="submit">
                    Salvar
                </button>
            </div>
        </form>
    </section>    
</template>

<script lang="ts">
import { TipoNotificacao } from '@/interfaces/INotificacao';
import { useStore } from '@/store';
import { ADICIONA_PROJETO, ALTERA_PROJETO } from '@/store/mutations-type';
import { defineComponent, ref } from 'vue';
import useNotificador from '@/hooks/notificador';
import { ALTERAR_PROJETO, CADASTRAR_PROJETO } from '@/store/actions-type';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'Formulario',
    props: {
        id: {
            type: String
        }
    },
  
    setup(props) {
        const { notificar } = useNotificador();
        const store = useStore();
        const router = useRouter();
        const nomeDoProjeto = ref('');

        if(props.id) {
            const projeto = store.state.projeto.projetos.find(projeto => projeto.id == props.id);
            nomeDoProjeto.value = projeto?.nome || '';
        }

        const salvoComSucesso = () => {
            nomeDoProjeto.value = '';
            notificar(TipoNotificacao.SUCESSO, 'Sucesso', 'Projeto salvo com sucesso');            
            router.push('/projetos');
        }

        const salvar = () => {
            if(props.id) {
                store.dispatch(ALTERAR_PROJETO, {
                    id: props.id,
                    nome: nomeDoProjeto.value
                }).then(() => salvoComSucesso());
            } else {
                store.dispatch(CADASTRAR_PROJETO, nomeDoProjeto.value)
                    .then(() => {
                        salvoComSucesso();
                    });
            }
            
        }

        return {
            nomeDoProjeto,
            salvar
        }
    }
});
</script>
