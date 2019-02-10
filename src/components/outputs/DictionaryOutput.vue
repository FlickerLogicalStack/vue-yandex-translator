<template>
    <div class="dictionary-output-component">
        <NestedTranslation
            v-for="group in $store.getters.currentOutput"
            :key="group.title"
            v-bind="group"
        ></NestedTranslation>
    </div>
</template>

<script>
    import NestedTranslation from '@/components/ui/NestedTranslation';

    export default {
        components: { NestedTranslation }
    };
</script>
