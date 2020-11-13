<template>
  <div>
    <LottiePlayer :animationData="stepAnimation" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LottiePlayer from '../components/lottie-player.vue';
import stepAnimation from '../assets/lotties/step.json';

export default defineComponent({
  components: {
    LottiePlayer
  },
  setup() {
    return {
      stepAnimation
    };
  }
});
</script>
