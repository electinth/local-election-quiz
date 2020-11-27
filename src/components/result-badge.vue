<template>
  <p
    class="py-1 px-2 font-body text-24 md:text-36"
    :class="isCorrect ? 'bg-green' : 'bg-red'"
  >
    {{ isCorrect ? 'ตอบถูก!' : 'ตอบผิด !' }}
  </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    isCorrect: {
      type: Boolean,
      required: true
    }
  }
});
</script>
