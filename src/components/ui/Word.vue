<template>
    <span
        class="word-component"
        :class="{hover: isHovered, selectable: selectable}"
        @mouseover="onMouseOver"
        @mouseleave="onMouseLeave"
    >
        <div class="word" v-html="text" @click="onWordClick"></div>
        <div
            class="tooltip"
            :class="{show: tooltipShown}"
            ref="tooltip"
            @click="onTooltipClick"
        >
            Copied: <b>{{ text }}</b>
        </div>
    </span>
</template>

<script>
    import { copyToClipboard } from '../../utils/index.js';

    export default {
        name: 'Word',
        data: () => ({
            isHovered: false,
            tooltipShown: false,
            tooltipTimeout: null
        }),
        props: {
            text: {
                type: String,
                required: true
            },
            selectable: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            onMouseOver() {
                if (this.selectable) this.isHovered = true;
            },
            onMouseLeave() {
                this.isHovered = false;
            },
            onWordClick() {
                copyToClipboard(this.text);

                this.tooltipShown = true;
                if (this.tooltipTimeout != null)
                    clearTimeout(this.tooltipTimeout);

                this.tooltipTimeout = setTimeout(
                    () => (this.tooltipShown = false),
                    1000
                );
            },
            onTooltipClick() {
                this.tooltipShown = false;
                if (this.tooltipTimeout) clearTimeout(this.tooltipTimeout);
            }
        }
    };
</script>

<style scoped>
    .word-component.selectable {
        position: relative;

        cursor: pointer;
        transition: var(--default-transition-time);
    }

    .word {
        user-select: none;
    }

    .word-component.selectable.hover > .word {
        color: var(--light-blue);
    }

    .tooltip {
        font-size: 0.8em;

        position: absolute;
        top: -50%;
        left: 50%;

        visibility: hidden;

        box-sizing: border-box;
        padding: 3px;

        user-select: none;
        transition: var(--default-transition-time);
        transform: translate(-50%, -50%);
        white-space: nowrap;

        opacity: 0;
        border-radius: 6px;
        background-color: var(--background-color);
    }

    .tooltip.show {
        visibility: visible;

        opacity: 1;
    }
</style>
