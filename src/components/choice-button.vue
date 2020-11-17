<template>
  <button class="flex flex-row space-x-1">
    <div
      class="flex-1 text-center rounded border-2 border-black px-2 h-20 flex"
      :class="{
        'text-black bg-gray': !isCorrect,
        'text-white bg-black': isCorrect
      }"
    >
      <H3 class="m-auto">{{ choice.label }}</H3>
    </div>
    <div class="w-1/6 rounded border-2 bg-white"></div>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ChoiceLetter } from '../constants/choice-letter';
import H3 from './typography/h3.vue';

export interface Choice {
  letter: ChoiceLetter;
  label: String;
}

export default defineComponent({
  props: {
    choice: {
      type: Object as PropType<Choice>,
      required: true
    },
    isCorrect: {
      type: Boolean,
      default: false
    }
  },
  components: {
    H3
  }
});
</script>
