<template>
    <div class="language-controller-component">
        <div class="selected">
            {{ $store.getters.languageByContollerId(id).title }}
        </div>
        <div class="list">
            <div
                class="language"
                v-for="language in $store.state.avaliableLanguages"
                :key="language.languageId"
                @click="onLanguageClick(language)"
            >
                {{ language.title }}
            </div>
        </div>
    </div>
</template>

<script>
    import { SET_LANGUAGE_BY_CONTROLLER_ID } from '@/store/types/mutations';

    export default {
        name: 'LanguageController',
        props: {
            id: {
                type: String,
                required: true
            }
        },
        methods: {
            onLanguageClick(language) {
                this.$store.commit(SET_LANGUAGE_BY_CONTROLLER_ID, {
                    controllerId: this.id,
                    languageId: language.languageId
                });
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

        cursor: pointer;
        user-select: none;

        background-color: var(--dark-grey);

        flex-grow: 0;

        --langauge-height: 30px;
    }

    .language-controller-component:hover > .selected {
        border-top: 1px solid var(--medium-grey);
        border-right: 1px solid var(--medium-grey);
        border-bottom: 1px solid var(--dark-grey);
        border-left: 1px solid var(--medium-grey);
    }

    .selected {
        font-size: inherit;

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

    .language-controller-component:nth-child(1) .list {
        left: 0;
    }

    .language-controller-component:nth-child(3) .list {
        right: 0;
    }

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
