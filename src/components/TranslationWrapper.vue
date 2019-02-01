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
            @keyup.enter.exact="loadData"
            @input="onInput"
            v-model="$store.state.input"
        ></textarea>
        <h1></h1>
        <textarea
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
        SWAP_LANGUAGES_ACTION
    } from '@/store/types';

    export default {
        name: 'translation-wrapper',
        methods: {
            loadData() {
                this.$store.dispatch(TRANSLATE_ACTION, {
                    text: this.$store.state.input,
                    lang: this.languages
                });
            },
            onInput({ target }) {
                this.$store.commit(SET_INPUT, { value: target.value });
            },
            onClearClick() {
                this.$store.commit(SET_INPUT, { value: '' });
                this.$store.commit(INCREMENT_CURRENT_TRANSLATION_ID);
            },
            onSwapClick() {
                this.$store.dispatch(SWAP_LANGUAGES_ACTION);
            }
        },
        computed: {
            languages() {
                return this.$store.state.languages
                    .map(language => language.languageId)
                    .join('-');
            }
        }
    };
</script>

<style>
    ::-webkit-scrollbar {
        display: none;
    }

    :root {
        --background-color: #282c34;
        --font-color: #abb2bf;

        --dark-grey: #333842;
        --medium-grey: #3f4550;
        --light-grey: #d7dae0;
    }
</style>

<style scoped>
    .translation-wrapper-component {
        min-height: 430px;
        font-family: 'PT Sans', sans-serif;

        background-color: var(--background-color);
        color: var(--font-color);
        width: 270px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px;
        box-sizing: border-box;
    }

    .actions {
        display: flex;
        padding: 5px;
    }

    .action {
        transition: 0.2s;
    }

    .action.disabled {
        pointer-events: none;
        opacity: 0.75;
    }

    .action-button {
        display: flex;
        align-items: center;
        cursor: pointer;
        font-size: 13px;
        padding: 5px 15px;
        transition: 0.2s;
        user-select: none;
    }

    .action-button > svg {
        fill: currentColor;
        width: 13px;
        height: 13px;
        margin-right: 5px;
    }

    .action-button:hover {
        color: var(--light-grey);
        background-color: var(--medium-grey);
    }

    .textarea {
        font-family: inherit;
        outline: none;
        background-color: inherit;
        color: inherit;
        resize: none;
        width: 100%;
        max-height: 230px;
        min-height: 80px;
        font-size: 14px;
        box-sizing: border-box;
        border: none;
        background-color: var(--dark-grey);
        padding: 5px;

        transition: background-color 0.2s;
    }

    .textarea.output {
        flex-grow: 1;
    }

    .textarea:focus,
    .textarea:hover:not(.output) {
        background-color: var(--medium-grey);
    }

    .powered-by-link {
        text-decoration: none;
        align-self: flex-end;
        margin-top: 5px;
        font-size: 10px;
        color: inherit;
    }
</style>
