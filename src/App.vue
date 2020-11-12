<template>
  <H1>I'm Vue 3</H1>
  <H2>I'm Vue 3</H2>
  <H3>I'm Vue 3</H3>
  <P class="text-green">Test typography</P>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import H1 from './components/typography/h1.vue';
import H2 from './components/typography/h2.vue';
import H3 from './components/typography/h3.vue';
import P from './components/typography/p.vue';

export default defineComponent({
  name: 'App',
  components: {
    H1,
    H2,
    H3,
    P
  }
});
</script>
