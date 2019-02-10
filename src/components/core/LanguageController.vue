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
        <div class="list-wrapper">
            <div class="list">
                <div
                    class="language"
                    v-for="language in languagesList"
                    :key="language.languageId"
                    @mousedown="onLanguageClick(language)"
                >
                    {{ language.title }}
                </div>
                <div v-show="!languagesList.length" class="no-matches-info">
                    No matches
                </div>
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
            copyTitleToBuffer() {
                this.searchBuffer = this.languageTitle;
            },

            setLanguage(language) {
                this.$store.commit(SET_LANGUAGE_BY_CONTROLLER_ID, {
                    controllerId: this.id,
                    languageId: language.languageId
                });
            },

            onLanguageClick(language) {
                this.setLanguage(language);
                this.copyTitleToBuffer();
            },

            onInputBlur() {
                this.activeSearch = false;
                this.copyTitleToBuffer();
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
                    language.title
                        .toLowerCase()
                        .includes(this.searchBuffer.toLowerCase())
                );
            }
        },
        created() {
            this.copyTitleToBuffer();
        },
        watch: {
            languageTitle(value) {
                this.searchBuffer = value;
            }
        }
    };
</script>

<style scoped>
    .language-controller-component {
        position: relative;

        box-sizing: border-box;
        width: 70px;
        height: 100%;

        user-select: none;

        background-color: var(--dark-grey);

        flex-grow: 0;

        --langauge-height: 30px;
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
        padding: 0;
    }

    .language-controller-component:hover > .language-input,
    .language-input:focus {
        border-top: 1px solid var(--medium-grey);
        border-right: 1px solid var(--medium-grey);
        border-bottom: 1px solid transparent;
        border-left: 1px solid var(--medium-grey);
    }

    .list-wrapper {
        position: absolute;
        z-index: 4;
        background-color: var(--dark-grey);
        top: calc(100% - 1px);
        width: calc(100% + 40px);

        max-height: 0;
        overflow: scroll;
        transition: max-height var(--default-transition-time);
    }

    .language-controller-component:nth-child(1) > .list-wrapper {
        left: 0;
    }

    .language-controller-component:nth-child(3) > .list-wrapper {
        right: 0;
    }

    .language-controller-component:hover > .list-wrapper,
    .language-input:focus + .list-wrapper {
        max-height: calc(var(--langauge-height) * 8);
    }

    .list {
        border: 1px solid var(--medium-grey);
    }

    .list:empty {
        border: none;
    }

    .list > * {
        line-height: var(--langauge-height);
        text-align: center;
    }

    .language {
        transition: var(--default-transition-time);
        cursor: pointer;
    }

    .language:hover {
        background-color: var(--light-blue);
    }
</style>
