<template>
    <button class="button" @click="clique" :disabled="disabled">
        <span class="icon">
            <slot></slot>
        </span>
        <span>{{ text }}</span>
    </button>    
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ButtonTask',
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        text: {
            type: String,
            default: ''
        }
    },
    emits: ['aoClicar'],
    methods: {
        clique () {
            this.$emit('aoClicar');
        }
    }
});
</script>