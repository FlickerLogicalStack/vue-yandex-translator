<template>
    <textarea
        class="textarea input component"
        @keydown.enter.exact.prevent
        @keyup.enter.exact="onEnterPress"
        @input="onInput"
        v-model="$store.state.input"
        autofocus
    ></textarea>
</template>

<script>
    import {
        SET_INPUT,
        TRY_TO_LOAD_EXISTING_TRANSLATION,
        TRANSLATE_ACTION
    } from '@/store/types';

    export default {
        name: 'InputField',
        methods: {
            onInput({ target }) {
                this.$store.commit(SET_INPUT, target.value);

                target.style.height = 'auto';
                target.style.height = `${target.scrollHeight}px`;

                this.$store.dispatch(TRY_TO_LOAD_EXISTING_TRANSLATION, {
                    input: target.value,
                    lang: this.$store.getters.lang
                });
            },
            translate() {
                this.$emit('on-enter-press');
            },
            onEnterPress() {
                if (this.$store.getters.isTranslationRequired) this.translate();
            }
        }
    };
</script>

<style scoped>
    .textarea.input {
        max-height: 10em;
    }
</style>
