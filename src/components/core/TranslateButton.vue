<template>
    <div
        class="translate-button-component"
        :class="{ disabled: !$store.getters.isTranslationRequired }"
        @click="onClick"
    >
        <DictionaryIcon
            class="dictionary-avaliability"
            v-show="isDictionaryAvaliable"
        ></DictionaryIcon>
        Translate
    </div>
</template>

<script>
    import { TRANSLATE_ACTION } from '@/store/types/actions';
    import { DICTIONARY } from '@/consts';

    import DictionaryIcon from '@/assets/svg/dictionary.svg';

    export default {
        components: {
            DictionaryIcon
        },
        methods: {
            onClick() {
                this.$store.dispatch(TRANSLATE_ACTION);
            }
        },
        computed: {
            isDictionaryAvaliable() {
                return this.$store.getters.avaliableTranslationTypes.includes(
                    DICTIONARY
                );
            }
        }
    };
</script>

<style scoped>
    .translate-button-component {
        display: flex;

        height: 100%;
        margin: 0 10px;
        padding: 0 10px;

        cursor: pointer;
        user-select: none;
        transition: var(--default-transition-time);

        color: inherit;
        background-color: var(--dark-grey);

        flex-grow: 1;
        align-items: center;
        justify-content: center;

        position: relative;
    }

    .translate-button-component.disabled {
        pointer-events: none;

        opacity: 0.75;
    }

    .translate-button-component:hover {
        color: var(--light-grey);
        background-color: var(--light-blue);
    }

    .translate-button-component > svg {
        width: 15px;
        height: 15px;
        margin-right: 5px;
    }
</style>
