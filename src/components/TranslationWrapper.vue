<template>
    <div class="translation-wrapper-component">
        <div class="actions">
            <div class="action" id="swap">
                <div class="action-button" @click="onSwapClick">
                    <svg viewBox="0 0 512 512">
                        <path
                            d="M0 168v-16c0-13.255 10.745-24 24-24h360V80c0-21.367 25.899-32.042 40.971-16.971l80 80c9.372 9.373 9.372 24.569 0 33.941l-80 80C409.956 271.982 384 261.456 384 240v-48H24c-13.255 0-24-10.745-24-24zm488 152H128v-48c0-21.314-25.862-32.08-40.971-16.971l-80 80c-9.372 9.373-9.372 24.569 0 33.941l80 80C102.057 463.997 128 453.437 128 432v-48h360c13.255 0 24-10.745 24-24v-16c0-13.255-10.745-24-24-24z"
                        ></path>
                    </svg>
                    <div class="action-title">Swap</div>
                </div>
            </div>
            <div
                class="action"
                id="clear"
                :class="{ disabled: !$store.state.input && !$store.getters.currentTranslationOutput }"
                @click="onClearClick"
            >
                <div class="action-button">
                    <svg viewBox="0 0 448 512">
                        <path
                            d="M0 84V56c0-13.3 10.7-24 24-24h112l9.4-18.7c4-8.2 12.3-13.3 21.4-13.3h114.3c9.1 0 17.4 5.1 21.5 13.3L312 32h112c13.3 0 24 10.7 24 24v28c0 6.6-5.4 12-12 12H12C5.4 96 0 90.6 0 84zm416 56v324c0 26.5-21.5 48-48 48H80c-26.5 0-48-21.5-48-48V140c0-6.6 5.4-12 12-12h360c6.6 0 12 5.4 12 12zm-272 68c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208zm96 0c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208zm96 0c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208z"
                        ></path>
                    </svg>
                    <div class="action-title">Clear</div>
                </div>
            </div>
            <div
                class="action"
                id="erase-cache"
                @click="onEraseCacheClick"
                title="Clear Cache"
            >
                <div class="action-button">
                    <svg viewBox="0 0 640 512">
                        <path
                            d="M120 376c-13.3 0-24 10.7-24 24s10.7 24 24 24 24-10.7 24-24-10.7-24-24-24zm80 0c-13.3 0-24 10.7-24 24s10.7 24 24 24 24-10.7 24-24-10.7-24-24-24zm80 0c-13.3 0-24 10.7-24 24s10.7 24 24 24 24-10.7 24-24-10.7-24-24-24zm80 0c-13.3 0-24 10.7-24 24s10.7 24 24 24 24-10.7 24-24-10.7-24-24-24zm238.6 49.4c-14.5-14.5-22.6-34.1-22.6-54.6V269.2c0-20.5 8.1-40.1 22.6-54.6l36.7-36.7c6.2-6.2 6.2-16.4 0-22.6l-22.6-22.6c-6.2-6.2-16.4-6.2-22.6 0l-36.7 36.7c-26.5 26.5-41.4 62.4-41.4 99.9V288h-64v-50.9c0-8.7-1.8-17.2-5.2-25.2L364.5 29.1C356.9 11.4 339.6 0 320.3 0H176c-26.5 0-48 21.5-48 48v112h-16c-26.5 0-48 21.5-48 48v91.2C26.3 317.2 0 355.4 0 400c0 61.9 50.1 112 112 112h256c61.9 0 112-50.1 112-112 0-17.3-4.2-33.4-11.2-48H512v18.7c0 37.5 14.9 73.4 41.4 99.9l36.7 36.7c6.2 6.2 16.4 6.2 22.6 0l22.6-22.6c6.2-6.2 6.2-16.4 0-22.6l-36.7-36.7zM192 64h117.8l68.6 160H256l-64-64V64zm176 384H112c-26.5 0-48-21.5-48-48s21.5-48 48-48h256c26.5 0 48 21.5 48 48s-21.5 48-48 48z"
                        ></path>
                    </svg>
                </div>
            </div>
        </div>
        <textarea
            class="textarea input"
            @keydown.enter.exact.prevent
            @keyup.enter.exact="onEnterPress"
            @input="onInput"
            v-model="$store.state.input"
            autofocus
        ></textarea>
        <div class="controllers">
            <div class="language-controller">
                <div class="selected">
                    {{ $store.getters.languageByContollerId('FROM').title }}
                </div>
                <div class="list">
                    <div
                        class="language"
                        v-for="language in $store.state.avaliableLanguages"
                        :key="language.languageId"
                        @click="onLanguageClick('FROM', language)"
                    >
                        {{ language.title }}
                    </div>
                </div>
            </div>
            <div
                class="translate-button"
                :class="{ disabled: !isTranslationRequired }"
                @click="translate"
            >
                <svg viewBox="0 0 448 512">
                    <path
                        fill="currentColor"
                        d="M448 360V24c0-13.3-10.7-24-24-24H96C43 0 0 43 0 96v320c0 53 43 96 96 96h328c13.3 0 24-10.7 24-24v-16c0-7.5-3.5-14.3-8.9-18.7-4.2-15.4-4.2-59.3 0-74.7 5.4-4.3 8.9-11.1 8.9-18.6zM128 134c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm0 64c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm253.4 250H96c-17.7 0-32-14.3-32-32 0-17.6 14.4-32 32-32h285.4c-1.9 17.1-1.9 46.9 0 64z"
                    ></path>
                </svg>
                Translate
            </div>
            <div class="language-controller">
                <div class="selected">
                    {{ $store.getters.languageByContollerId('TO').title }}
                </div>
                <div class="list">
                    <div
                        class="language"
                        v-for="language in $store.state.avaliableLanguages"
                        :key="language.languageId"
                        @click="onLanguageClick('TO', language)"
                    >
                        {{ language.title }}
                    </div>
                </div>
            </div>
        </div>
        <Loader v-if="$store.state.loadingState.loading"></Loader>
        <textarea
            v-else
            class="textarea output"
            disabled
            v-model="$store.getters.currentTranslationOutput"
        ></textarea>
        <a class="powered-by-link" href="http://translate.yandex.ru/"
            >Powered by Yandex.Translate</a
        >
    </div>
</template>

<script>
    import {
        SET_INPUT,
        INCREMENT_CURRENT_TRANSLATION_ID,
        TRANSLATE_ACTION,
        SWAP_LANGUAGES_ACTION,
        SET_LANGUAGE_BY_CONTROLLER_ID,
        GET_AVALIABLE_LANGUAGES_ACTION,
        TRY_TO_LOAD_EXISTING_TRANSLATION
    } from '@/store/types';

    import { VUEX_PERSISTEDSTATE_KEY } from '@/consts';

    import Loader from '@/components/Loader';

    // TODO: MapState
    export default {
        name: 'translation-wrapper',
        components: { Loader },
        methods: {
            translate() {
                this.$store.dispatch(TRANSLATE_ACTION, {
                    text: this.$store.state.input,
                    lang: this.$store.getters.lang
                });
            },
            onInput({ target }) {
                this.$store.commit(SET_INPUT, { value: target.value });

                target.style.height = 'auto';
                target.style.height = `${target.scrollHeight}px`;

                this.$store.dispatch(TRY_TO_LOAD_EXISTING_TRANSLATION, {
                    input: target.value,
                    lang: this.$store.getters.lang
                });
            },
            onClearClick() {
                this.$store.commit(SET_INPUT, { value: '' });
                this.$store.dispatch(INCREMENT_CURRENT_TRANSLATION_ID);
            },
            onSwapClick() {
                this.$store.dispatch(SWAP_LANGUAGES_ACTION);
            },
            onEraseCacheClick() {
                delete window.localStorage[VUEX_PERSISTEDSTATE_KEY];
            },
            onLanguageClick(controllerId, language) {
                this.$store.commit(SET_LANGUAGE_BY_CONTROLLER_ID, {
                    controllerId,
                    languageId: language.languageId
                });
            },
            onEnterPress() {
                if (this.isTranslationRequired) this.translate();
            }
        },
        computed: {
            isTranslationRequired() {
                return !!(
                    this.$store.state.input &&
                    !this.$store.state.loadingState.loading &&
                    !this.$store.getters.alreadyTranslated.length
                );
            }
        },
        mounted() {
            if (!window.localStorage[VUEX_PERSISTEDSTATE_KEY])
                this.$store.dispatch(GET_AVALIABLE_LANGUAGES_ACTION);

            this.$store.dispatch(TRY_TO_LOAD_EXISTING_TRANSLATION, {
                input: this.$store.state.input,
                lang: this.$store.getters.lang
            });
        }
    };
</script>

<style>
    ::-webkit-scrollbar {
        display: none;
    }

    :root {
        --default-font: 'PT Sans', sans-serif;
        --default-transition-time: 0.2s;

        --background-color: #282c34;
        --font-color: #abb2bf;

        --dark-grey: #333842;
        --medium-grey: #3f4550;
        --light-grey: #d7dae0;

        --block-color1: var(--dark-grey);
        --block-color2: var(--medium-grey);
        --block-color3: var(--font-color);
        --block-color4: var(--light-grey);
    }

    body {
        margin: 0;
    }
</style>

<style scoped>
    @font-face {
        font-family: 'PT Sans';
        src: url('./../assets/fonts/PTSansRegular.ttf');
    }

    .translation-wrapper-component {
        font-family: var(--default-font);

        display: flex;
        flex-direction: column;

        box-sizing: border-box;
        width: 270px;
        padding: 10px;

        color: var(--font-color);
        background-color: var(--background-color);

        align-items: center;
    }

    .actions {
        display: flex;
        align-items: center;
        padding: 5px;
    }

    .action {
        font-size: 13px;
        transition: var(--default-transition-time);
        height: 100%;
    }

    .action#erase-cache {
        font-size: 0.8em;
    }

    .action#erase-cache svg {
        height: 16px;
        width: 16px;
    }

    .action#erase-cache > .action-button:hover {
        background-color: rgba(232, 17, 35, 0.9);
    }

    .action.disabled {
        pointer-events: none;

        opacity: 0.75;
    }

    .action-button {
        display: flex;

        padding: 5px 15px;

        cursor: pointer;
        user-select: none;
        transition: var(--default-transition-time);

        align-items: center;
    }

    .action-button > svg {
        width: 13px;
        height: 13px;

        fill: currentColor;
    }

    .action-button > svg + .action-title {
        margin-left: 5px;
    }

    .action-button:hover {
        color: var(--light-grey);
        background-color: var(--medium-grey);
    }

    .textarea {
        font-family: inherit;
        font-size: 14px;

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

    .textarea.input {
        max-height: 10em;
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

    .language-controller {
        position: relative;

        box-sizing: border-box;
        width: 70px;
        height: 100%;

        cursor: pointer;
        user-select: none;

        background-color: var(--dark-grey);

        flex-grow: 0;
    }

    .language-controller:hover > .selected {
        border-top: 1px solid var(--medium-grey);
        border-right: 1px solid var(--medium-grey);
        border-bottom: 1px solid var(--dark-grey);
        border-left: 1px solid var(--medium-grey);
    }

    .selected {
        font-size: 14px;

        position: relative;
        z-index: 5;

        display: flex;

        box-sizing: border-box;
        height: 100%;

        transition: var(--default-transition-time);

        border: 1px solid transparent;

        align-items: center;
        justify-content: center;
    }

    .list {
        position: absolute;
        z-index: 4;
        top: calc(100% - 1px);

        overflow: hidden;
        overflow-y: auto;

        box-sizing: border-box;
        width: calc(100% + 40px);
        max-height: 0;

        transition: var(--default-transition-time);

        border: 0 solid transparent;
        background-color: var(--dark-grey);
    }

    .language-controller:nth-child(1) .list {
        left: 0;
    }

    .language-controller:nth-child(3) .list {
        right: 0;
    }

    .language-controller:hover > .list {
        max-height: 200px;

        border-width: 1px;
        border-color: var(--medium-grey);
    }

    .language {
        box-sizing: border-box;
        padding: 5px;

        transition: var(--default-transition-time);
        text-align: center;
    }

    .language:hover {
        background-color: var(--medium-grey);
    }

    .translate-button {
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
    }

    .translate-button.disabled {
        pointer-events: none;

        opacity: 0.75;
    }

    .translate-button:hover {
        color: var(--light-grey);
        background-color: var(--medium-grey);
    }

    .translate-button > svg {
        width: 15px;
        height: 15px;
        margin-right: 5px;
    }

    .powered-by-link {
        font-size: 10px;

        margin-top: 5px;

        text-decoration: none;

        color: inherit;

        align-self: flex-end;
    }
</style>
