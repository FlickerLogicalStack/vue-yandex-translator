<template>
    <div class="language-controller-component">
        <input
            class="language-input"
            v-model="searchBuffer"
            @focus="onInputFocus"
            @blur="onInputBlur"
            @keyup.esc="onInputBlur"
            @keyup.enter="onInputEnter"
        />
        <div class="list">
            <div
                class="language"
                v-for="language in languagesList"
                :key="language.languageId"
                @mousedown="onLanguageClick(language)"
            >
                {{ language.title }}
            </div>
        </div>
    </div>
</template>

<script>
    import { SET_LANGUAGE_BY_CONTROLLER_ID } from '@/store/types/mutations';

    export default {
        props: {
            id: {
                type: String,
                required: true
            }
        },
        data: () => ({
            activeSearch: false,
            searchBuffer: ''
        }),
        methods: {
            setLanguage(language) {
                this.$store.commit(SET_LANGUAGE_BY_CONTROLLER_ID, {
                    controllerId: this.id,
                    languageId: language.languageId
                });
            },
            onLanguageClick(language) {
                this.setLanguage(language);
                this.searchBuffer = this.languageTitle;
            },
            onInputBlur() {
                this.activeSearch = false;

                this.searchBuffer = this.languageTitle;
            },
            onInputFocus() {
                this.activeSearch = true;
            },
            onInputEnter() {
                if (this.matchedLanguages.length === 1) {
                    this.onLanguageClick(...this.matchedLanguages);
                    this.onInputBlur();
                }
            }
        },
        computed: {
            languageTitle() {
                return this.$store.getters.languageByContollerId(this.id).title;
            },
            languagesList() {
                if (this.activeSearch) {
                    return this.matchedLanguages;
                }

                return this.$store.state.avaliableLanguages;
            },
            matchedLanguages() {
                return this.$store.state.avaliableLanguages.filter(language =>
                    language.title.toLowerCase().includes(this.searchBuffer.toLowerCase())
                );
            }
        },
        created() {
            this.searchBuffer = this.languageTitle;
        }
    };
</script>

<style scoped>
    .language-controller-component {
        position: relative;

        box-sizing: border-box;
        width: 70px;
        height: 100%;

        cursor: pointer;
        user-select: none;

        background-color: var(--dark-grey);

        flex-grow: 0;

        --langauge-height: 30px;
    }

    .language-controller-component:hover > .language-input {
        border-top: 1px solid var(--medium-grey);
        border-right: 1px solid var(--medium-grey);
        border-bottom: 1px solid var(--dark-grey);
        border-left: 1px solid var(--medium-grey);
    }

    .language-input {
        position: relative;
        z-index: 5;

        box-sizing: border-box;
        height: 100%;

        transition: var(--default-transition-time);

        border: 1px solid transparent;

        width: 100%;
        background-color: inherit;
        outline: none;
        color: inherit;
        margin: auto;
        font-family: inherit;
        text-align: center;
        font-size: 1em;
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

    .language-controller-component:nth-child(1) .list {
        left: 0;
    }

    .language-controller-component:nth-child(3) .list {
        right: 0;
    }

    input.language-input:focus + .list,
    .language-controller-component:hover > .list {
        max-height: calc(var(--langauge-height) * 8);

        border-width: 1px;
        border-color: var(--medium-grey);
    }

    .language {
        box-sizing: border-box;
        padding: 5px;

        transition: var(--default-transition-time);
        text-align: center;
        height: var(--langauge-height);
    }

    .language:hover {
        background-color: var(--light-blue);
    }
</style>
