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
    import { SET_INPUT } from '@/store/types/mutations';
    import {
        TRY_TO_LOAD_EXISTING_TRANSLATION_ACTION,
        TRANSLATE_ACTION
    } from '@/store/types/actions';

    export default {
        methods: {
            onInput({ target }) {
                this.$store.commit(SET_INPUT, target.value);

                target.style.height = 'auto';
                target.style.height = `${target.scrollHeight}px`;

                this.$store.dispatch(TRY_TO_LOAD_EXISTING_TRANSLATION_ACTION);
            },
            onEnterPress() {
                if (this.$store.getters.isTranslationRequired)
                    this.$store.dispatch(TRANSLATE_ACTION);
            }
        }
    };
</script>

<style scoped>
    .textarea.input {
        max-height: 10em;
        font-size: inherit;
    }
</style>
