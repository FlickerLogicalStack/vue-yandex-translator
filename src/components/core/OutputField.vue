<template>
    <div class="output-field-component">
        <component :is="currentComponent"></component>
    </div>
</template>

<script>
    import NestedTranslation from '@/components/ui/NestedTranslation';

    export default {
        name: 'OutputField',
        components: { NestedTranslation },
        computed: {
            currentComponent() {
                if (this.$store.getters.currentTranslation)
                    return this.$store.state.translationOutputsMap[
                        this.$store.getters.currentTranslation.processorId
                    ];
                return null;
            }
        }
    };
</script>

<style scoped>
    .output-field-component {
        font-family: inherit;
        font-size: inherit;

        box-sizing: border-box;
        width: 100%;
        height: 240px;
        padding: 5px;

        resize: none;
        transition: var(--default-transition-time);

        color: inherit;
        border: none;
        outline: none;
        background-color: inherit;
        background-color: var(--dark-grey);

        white-space: pre-wrap;
        overflow-y: auto;
    }
</style>
