<template>
    <span
        class="word-component"
        :class="{hover: isHovered, selectable: selectable}"
        @mouseover="onMouseOver"
        @mouseleave="onMouseLeave"
        @click="onClick"
        v-html="text"
    ></span>
</template>

<script>
    import { SET_INPUT } from '@/store/types';

    export default {
        name: 'Word',
        data: () => ({
            isHovered: false
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
            onClick() {
                this.$store.commit(SET_INPUT, this.text);
            }
        }
    };
</script>

<style scoped>
    .word-component.selectable {
        transition: var(--default-transition-time);
        cursor: pointer;
    }

    .word-component.selectable.hover {
        color: var(--light-blue);
    }
</style>
