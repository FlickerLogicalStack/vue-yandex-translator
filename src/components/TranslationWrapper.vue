<template>
    <div class="translation-wrapper-component">
        <div class="actions">
            <Action id="swap">
                <div class="action-button" @click="onSwapClick">
                    <svg viewBox="0 0 512 512">
                        <path
                            d="M0 168v-16c0-13.255 10.745-24 24-24h360V80c0-21.367 25.899-32.042 40.971-16.971l80 80c9.372 9.373 9.372 24.569 0 33.941l-80 80C409.956 271.982 384 261.456 384 240v-48H24c-13.255 0-24-10.745-24-24zm488 152H128v-48c0-21.314-25.862-32.08-40.971-16.971l-80 80c-9.372 9.373-9.372 24.569 0 33.941l80 80C102.057 463.997 128 453.437 128 432v-48h360c13.255 0 24-10.745 24-24v-16c0-13.255-10.745-24-24-24z"
                        ></path>
                    </svg>
                    <div class="action-title">Swap</div>
                </div>
            </Action>
            <Action id="erase-cache" title="Clear Cache">
                <div class="action-button" @click="onEraseCacheClick">
                    <svg viewBox="0 0 640 512">
                        <path
                            d="M120 376c-13.3 0-24 10.7-24 24s10.7 24 24 24 24-10.7 24-24-10.7-24-24-24zm80 0c-13.3 0-24 10.7-24 24s10.7 24 24 24 24-10.7 24-24-10.7-24-24-24zm80 0c-13.3 0-24 10.7-24 24s10.7 24 24 24 24-10.7 24-24-10.7-24-24-24zm80 0c-13.3 0-24 10.7-24 24s10.7 24 24 24 24-10.7 24-24-10.7-24-24-24zm238.6 49.4c-14.5-14.5-22.6-34.1-22.6-54.6V269.2c0-20.5 8.1-40.1 22.6-54.6l36.7-36.7c6.2-6.2 6.2-16.4 0-22.6l-22.6-22.6c-6.2-6.2-16.4-6.2-22.6 0l-36.7 36.7c-26.5 26.5-41.4 62.4-41.4 99.9V288h-64v-50.9c0-8.7-1.8-17.2-5.2-25.2L364.5 29.1C356.9 11.4 339.6 0 320.3 0H176c-26.5 0-48 21.5-48 48v112h-16c-26.5 0-48 21.5-48 48v91.2C26.3 317.2 0 355.4 0 400c0 61.9 50.1 112 112 112h256c61.9 0 112-50.1 112-112 0-17.3-4.2-33.4-11.2-48H512v18.7c0 37.5 14.9 73.4 41.4 99.9l36.7 36.7c6.2 6.2 16.4 6.2 22.6 0l22.6-22.6c6.2-6.2 6.2-16.4 0-22.6l-36.7-36.7zM192 64h117.8l68.6 160H256l-64-64V64zm176 384H112c-26.5 0-48-21.5-48-48s21.5-48 48-48h256c26.5 0 48 21.5 48 48s-21.5 48-48 48z"
                        ></path>
                    </svg>
                </div>
            </Action>
            <Action
                id="clear"
                :class="{ disabled: !$store.state.input && !$store.getters.currentOutput }"
            >
                <div class="action-button" @click="onClearClick">
                    <svg viewBox="0 0 448 512">
                        <path
                            d="M0 84V56c0-13.3 10.7-24 24-24h112l9.4-18.7c4-8.2 12.3-13.3 21.4-13.3h114.3c9.1 0 17.4 5.1 21.5 13.3L312 32h112c13.3 0 24 10.7 24 24v28c0 6.6-5.4 12-12 12H12C5.4 96 0 90.6 0 84zm416 56v324c0 26.5-21.5 48-48 48H80c-26.5 0-48-21.5-48-48V140c0-6.6 5.4-12 12-12h360c6.6 0 12 5.4 12 12zm-272 68c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208zm96 0c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208zm96 0c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208z"
                        ></path>
                    </svg>
                    <div class="action-title">Clear</div>
                </div>
            </Action>
        </div>

        <InputField @on-enter-press="translate"></InputField>

        <div class="controllers">
            <LanguageController :id="`FROM`"></LanguageController>
            <TranslateButton @on-button-click="translate"></TranslateButton>
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
    import {
        SET_INPUT,
        INCREMENT_CURRENT_TRANSLATION_ID,
        SWAP_LANGUAGES_ACTION,
        TRANSLATE_ACTION,
        FETCH_AVALIABLE_LANGUAGES_ACTION,
        TRY_TO_LOAD_EXISTING_TRANSLATION,
        ERASE_ALL_DATA,
        FETCH_AVALIABLE_LANGUAGES_PAIRS_ACTION
    } from '@/store/types';

    import { VUEX_PERSISTEDSTATE_KEY } from '@/consts';

    import Action from '@/components/core/Action';
    import InputField from '@/components/core/InputField';
    import TranslateButton from '@/components/core/TranslateButton';
    import LanguageController from '@/components/core/LanguageController';
    import OutputField from '@/components/core/OutputField';
    import Loader from '@/components/core/Loader';

    export default {
        name: 'translation-wrapper',
        components: {
            Action,
            InputField,
            LanguageController,
            TranslateButton,
            OutputField,
            Loader
        },
        methods: {
            onClearClick() {
                this.$store.commit(SET_INPUT, '');
                this.$store.dispatch(INCREMENT_CURRENT_TRANSLATION_ID);
            },
            onEraseCacheClick() {
                this.$store.dispatch(ERASE_ALL_DATA);
            },
            onSwapClick() {
                this.$store.dispatch(SWAP_LANGUAGES_ACTION);

                this.$store.dispatch(TRY_TO_LOAD_EXISTING_TRANSLATION);
            },
            translate() {
                this.$store.dispatch(TRANSLATE_ACTION);
            }
        },

        mounted() {
            if (!window.localStorage[VUEX_PERSISTEDSTATE_KEY]) {
                this.$store.dispatch(FETCH_AVALIABLE_LANGUAGES_PAIRS_ACTION);
                this.$store.dispatch(FETCH_AVALIABLE_LANGUAGES_ACTION);
            }

            this.$store.dispatch(TRY_TO_LOAD_EXISTING_TRANSLATION);
        }
    };
</script>

<style>
    @import '../assets/css/globalSettings.css';
</style>

<style>
    .translation-wrapper-component {
        font-family: var(--default-font);

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
