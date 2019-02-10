<template>
    <div
        class="translation-wrapper-component"
        @keyup.ctrl.plus.exact="changeInterfaceSize(1)"
        @keyup.ctrl.minus.exact="changeInterfaceSize(-1)"
    >
        <div class="actions">
            <Action id="swap" :class="{disabled: isLanguagesAreSame}">
                <div class="action-button" @click="onSwapClick">
                    <SwapIcon></SwapIcon>
                    <div class="action-title">Swap</div>
                </div>
            </Action>
            <Action id="erase-cache" title="Clear Cache">
                <div class="action-button" @click="onEraseCacheClick">
                    <BulldozerIcon></BulldozerIcon>
                </div>
            </Action>
            <Action
                id="clear"
                :class="{ disabled: !$store.state.input && !$store.getters.currentOutput }"
            >
                <div class="action-button" @click="onClearClick">
                    <TrashIcon></TrashIcon>
                    <div class="action-title">Clear</div>
                </div>
            </Action>
        </div>

        <InputField></InputField>

        <div class="controllers">
            <LanguageController :id="`FROM`"></LanguageController>
            <TranslateButton></TranslateButton>
            <LanguageController :id="`TO`"></LanguageController>
        </div>

        <keep-alive>
            <Loader v-if="$store.state.loadingState.loading"></Loader>
            <OutputField v-else></OutputField>
        </keep-alive>

        <a class="powered-by-link" href="http://translate.yandex.ru/"
            >Powered by Yandex.Translate</a
        >
    </div>
</template>

<script>
    import { SET_INPUT } from '@/store/types/mutations';
    import {
        SET_NEW_TRANSLATION_ID_ACTION,
        ERASE_ALL_DATA_ACTION,
        SWAP_LANGUAGES_ACTION,
        TRY_TO_LOAD_EXISTING_TRANSLATION_ACTION,
        TRANSLATE_ACTION,
        INCREMENT_INTERFACE_SIZE_ACTION,
        FETCH_AVALIABLE_LANGUAGES_PAIRS_ACTION,
        FETCH_AVALIABLE_LANGUAGES_ACTION
    } from '@/store/types/actions';

    import { VUEX_PERSISTEDSTATE_KEY } from '@/consts';

    import Action from '@/components/core/Action';
    import InputField from '@/components/core/InputField';
    import TranslateButton from '@/components/core/TranslateButton';
    import LanguageController from '@/components/core/LanguageController';
    import OutputField from '@/components/core/OutputField';
    import Loader from '@/components/core/Loader';

    import SwapIcon from '@/assets/svg/actions/swap.svg';
    import BulldozerIcon from '@/assets/svg/actions/bulldozer.svg';
    import TrashIcon from '@/assets/svg/actions/trash.svg';

    export default {
        components: {
            Action,
            InputField,
            LanguageController,
            TranslateButton,
            OutputField,
            Loader,

            SwapIcon,
            BulldozerIcon,
            TrashIcon
        },
        methods: {
            onClearClick() {
                this.$store.commit(SET_INPUT, '');
                this.$store.dispatch(SET_NEW_TRANSLATION_ID_ACTION);
            },

            onEraseCacheClick() {
                this.$store.dispatch(ERASE_ALL_DATA_ACTION);
            },

            onSwapClick() {
                this.$store.dispatch(SWAP_LANGUAGES_ACTION);

                this.$store.dispatch(TRY_TO_LOAD_EXISTING_TRANSLATION_ACTION);
            },

            translate() {
                this.$store.dispatch(TRANSLATE_ACTION);
            },

            changeInterfaceSize(value) {
                this.$store.dispatch(INCREMENT_INTERFACE_SIZE_ACTION, value);
            }
        },
        computed: {
            isLanguagesAreSame() {
                return new Set(this.$store.getters.lang.split('-')).size === 1;
            }
        },
        mounted() {
            if (!window.localStorage[VUEX_PERSISTEDSTATE_KEY]) {
                this.$store.dispatch(FETCH_AVALIABLE_LANGUAGES_PAIRS_ACTION);
                this.$store.dispatch(FETCH_AVALIABLE_LANGUAGES_ACTION);
            }

            this.$store.dispatch(TRY_TO_LOAD_EXISTING_TRANSLATION_ACTION);
            this.changeInterfaceSize(0);
        }
    };
</script>

<style>
    @import '../assets/css/globalSettings.css';
</style>

<style>
    .translation-wrapper-component {
        display: flex;
        flex-direction: column;

        box-sizing: border-box;
        width: 290px;
        padding: 10px;
        font-size: inherit;

        color: var(--font-color);
        background-color: var(--background-color);

        align-items: center;
    }

    .actions {
        display: flex;
        align-items: center;
        padding: 5px;
    }

    .actions > *:not(:first-child) {
        margin-left: 5px;
    }

    .textarea {
        font-family: inherit;

        box-sizing: border-box;
        width: 100%;
        min-height: 80px;
        max-height: 230px;
        padding: 5px;

        resize: none;
        transition: var(--default-transition-time);

        color: inherit;
        border: none;
        outline: none;
        background-color: inherit;
        background-color: var(--dark-grey);
    }

    .textarea.output {
        height: 240px;
    }

    .textarea:focus,
    .textarea:hover:not(.output) {
        background-color: var(--medium-grey);
    }

    .controllers {
        display: flex;

        box-sizing: border-box;
        width: 100%;
        height: 40px;
        padding: 5px 0;

        align-items: center;
        justify-content: center;
    }

    .powered-by-link {
        font-size: 0.7em;

        margin-top: 5px;

        text-decoration: none;

        color: inherit;

        align-self: flex-end;

        user-select: none;
    }
</style>
