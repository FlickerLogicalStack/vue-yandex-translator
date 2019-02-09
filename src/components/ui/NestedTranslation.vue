<template>
    <div class="nested-translation-component" :class="{endpoint: isEndpoint}">
        <div class="title">
            <span
                class="expander"
                :class="{expanded: isExpanded, hidden: isEndpoint}"
                @click="toggle"
            >
                <svg viewBox="0 0 192 512">
                    <path
                        fill="currentColor"
                        d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"
                    />
                </svg>
            </span>
            <span
                v-if="!isEndpoint && !isWord"
                v-html="text"
                class="span-word"
            ></span>
            <Word v-else :text="text" :selectable="selectable"></Word>
        </div>
        <div class="content" v-if="isExpanded && !isEndpoint">
            <NestedTranslation
                v-for="group in groups"
                :key="group.title"
                v-bind="group"
                :level="level + 1"
            ></NestedTranslation>
        </div>
    </div>
</template>

<script>
    import Word from '@/components/ui//Word';

    export default {
        name: 'NestedTranslation',
        components: { Word },
        data: () => ({
            isExpanded: true
        }),
        props: {
            level: {
                type: Number,
                default: 0
            },
            text: {
                type: String,
                required: true
            },
            groups: {
                type: Array,
                default: () => []
            },
            collapsed: {
                type: Boolean,
                default: false
            },
            selectable: {
                type: Boolean,
                default: true
            },
            isWord: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            toggle() {
                if (!this.isEndpoint) {
                    this.isExpanded = !this.isExpanded;
                }
            }
        },
        computed: {
            isEndpoint() {
                return !this.groups || !this.groups.length;
            }
        },
        created() {
            this.isExpanded = !this.collapsed;
        }
    };
</script>

<style scoped>
    .nested-translation-component > * {
        padding-left: 5px;
    }

    .content > .nested-translation-component {
        margin-left: 15px;
    }

    .span-word {
        user-select: none;
    }

    .title {
        display: flex;

        transition: var(--default-transition-time);

        align-items: center;
    }

    .expander {
        display: flex;

        width: 13px;
        height: 13px;
        margin-right: 5px;

        cursor: pointer;
        user-select: none;

        flex-shrink: 0;
    }

    .expander.hidden {
        pointer-events: none;

        opacity: 0;
    }

    .expander.expanded > svg {
        transform: rotate(90deg);
    }

    .expander > svg {
        width: 100%;
        height: 100%;

        transition: var(--default-transition-time);

        align-items: center;
        justify-content: center;
    }

    .expander:hover {
        color: var(--light-blue);
    }

    .nested-translation-component:not(.endpoint) > .title:hover,
    .nested-translation-component:not(.endpoint) > .title:hover + .content {
        background-color: var(--medium-grey);
    }
</style>
