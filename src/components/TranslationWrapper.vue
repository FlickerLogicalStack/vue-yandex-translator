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
                :class="{
                    disabled: !$store.state.input && !$store.getters.currentTranslationOutput
                }"
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
        </div>
        <textarea
            class="textarea input"
            @keydown.enter.exact.prevent
            @keyup.enter.exact="translate"
            @input="onInput"
            v-model="$store.state.input"
            autofocus
        ></textarea>
        <div class="controllers">
            <div class="language-controller">
                <div class="selected">
                    {{ languageTitleByControllerId('FROM') }}
                </div>
                <div class="list">
                    <div
                        class="language"
                        v-for="language in $store.state.avaliableLanguages"
                        @click="onLanguageCLick('FROM', language)"
                    >
                        {{ language.title }}
                    </div>
                </div>
            </div>
            <div
                class="translate-button"
                :class="{ disabled: !$store.state.input || $store.state.loadingState.loading }"
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
                    {{ languageTitleByControllerId('TO') }}
                </div>
                <div class="list">
                    <div
                        class="language"
                        v-for="language in $store.state.avaliableLanguages"
                        @click="onLanguageCLick('TO', language)"
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
        GET_AVALIABLE_LANGUAGES_ACTION
    } from '@/store/types';

    import Loader from '@/components/Loader';

    // TODO: MapState
    export default {
        name: 'translation-wrapper',
        components: { Loader },
        methods: {
            translate() {
                this.$store.dispatch(TRANSLATE_ACTION, {
                    text: this.$store.state.input,
                    lang: this.languages
                });
            },
            onInput({ target }) {
                this.$store.commit(SET_INPUT, { value: target.value });

                target.style.height = 'auto';
                target.style.height = `${target.scrollHeight}px`;
            },
            onClearClick() {
                this.$store.commit(SET_INPUT, { value: '' });
                this.$store.commit(INCREMENT_CURRENT_TRANSLATION_ID);
            },
            onSwapClick() {
                this.$store.dispatch(SWAP_LANGUAGES_ACTION);
            },
            languageTitleByControllerId(controllerId) {
                const languageId = this.$store.state.languages.find(
                    language => language.controllerId === controllerId
                ).languageId;
                return this.$store.state.avaliableLanguages.find(
                    language => language.languageId === languageId
                ).title;
            },
            onLanguageCLick(controllerId, language) {
                this.$store.commit(SET_LANGUAGE_BY_CONTROLLER_ID, {
                    controllerId,
                    languageId: language.languageId
                });
            }
        },
        computed: {
            languages() {
                return this.$store.state.languages
                    .map(language => language.languageId)
                    .join('-');
            }
        },
        mounted() {
            this.$store.dispatch(GET_AVALIABLE_LANGUAGES_ACTION);
        }
    };
</script>

<style>
    ::-webkit-scrollbar {
        display: none;
    }

    :root {
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
</style>

<style scoped>
    .translation-wrapper-component {
        font-family: 'PT Sans', sans-serif;

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

        padding: 5px;
    }

    .action {
        transition: var(--default-transition-time);
    }

    .action.disabled {
        pointer-events: none;

        opacity: 0.75;
    }

    .action-button {
        font-size: 13px;

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
        margin-right: 5px;

        fill: currentColor;
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
