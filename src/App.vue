<template>
  <div id="app">
    <link href="https://fonts.googleapis.com/css?family=PT+Sans" rel="stylesheet">
    <TranslationWrapper/>
  </div>
</template>

<script>
import TranslationWrapper from './components/TranslationWrapper.vue';

export default {
    name: 'app',
    components: {
        TranslationWrapper
    }
};
</script>
