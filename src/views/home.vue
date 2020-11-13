<template>
  <div
    class="flex flex-1 flex-col md:flex-row-reverse px-8 py-4 w-full max-w-screen-xl m-auto"
  >
    <div
      class="flex flex-1 flex-col justify-center items-center md:items-start space-y-12"
    >
      <div class="text-center md:text-left space-y-4">
        <H1>พร้อมแค่ไหน..<br />กับประชาธิปไตยใกล้มือ?</H1>
        <H3>วัดความรู้ความเข้าใจเกี่ยวกับ "เลือกตั้งท้องถิ่น”</H3>
      </div>
      <Button>เริ่มเล่น</Button>
    </div>
    <div class="flex-1 w-full md:w-1/2 md:pr-12">
      <LottiePlayer :animationData="stepAnimation" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LottiePlayer from '../components/lottie-player.vue';
import stepAnimation from '../assets/lotties/step.json';
import H1 from '../components/typography/h1.vue';
import H3 from '../components/typography/h3.vue';
import Button from '../components/button.vue';

export default defineComponent({
  components: {
    LottiePlayer,
    H1,
    H3,
    Button
  },
  setup() {
    return {
      stepAnimation
    };
  }
});
</script>
