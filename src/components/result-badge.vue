<template>
  <H3 class="py-1 px-2" :class="isCorrect ? 'bg-green' : 'bg-red'">
    {{ isCorrect ? 'ตอบถูก!' : 'ตอบผิด !' }}
  </H3>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import H3 from './typography/h3.vue';

export default defineComponent({
  props: {
    isCorrect: {
      type: Boolean,
      required: true
    }
  },
  components: {
    H3
  }
});
</script>
