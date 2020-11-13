<template>
  <button class="flex flex-row space-x-1">
    <div
      class="flex-1 text-center rounded border-2 px-2 h-16 flex"
      :class="{
        'text-black bg-gray': !isCorrected,
        'text-white bg-black': isCorrected
      }"
    >
      <P class="m-auto">{{ choice.label }}</P>
    </div>
    <div class="w-1/6 rounded border-2 bg-white"></div>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ChoiceLetter } from '../constants/choice-letter';
import P from './typography/p.vue';

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
    isCorrected: {
      type: Boolean,
      default: false
    }
  },
  components: {
    P
  }
});
</script>
