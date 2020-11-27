<template>
  <button
    class="flex flex-row space-x-1"
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false"
  >
    <div
      class="flex-1 flex text-center rounded border-2 border-black px-2 h-20 md:h-24"
      :class="[
        isCorrect
          ? 'text-white bg-black'
          : isHovering
          ? 'text-black bg-darkgray'
          : 'text-black bg-gray'
      ]"
    >
      <H3 class="m-auto">{{ choice.label }}</H3>
    </div>
    <div class="w-1/6 rounded border-2 bg-white p-1 md:p-2 h-20 md:h-24">
      <LottiePlayer
        :animationData="chooseAnimation"
        :config="{ autoplay: isCorrect }"
        :isPlaying="isCorrect || isHovering"
      />
    </div>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import LottiePlayer from './lottie-player.vue';
import { ChoiceLetter } from '../constants/choice-letter';
import H3 from './typography/h3.vue';
import chooseAnimation from '../assets/lotties/choose.json';

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
    H3,
    LottiePlayer
  },
  setup() {
    const isHovering = ref(false);

    return {
      chooseAnimation,
      isHovering
    };
  }
});
</script>
