<template>
  <div ref="container" class="w-full h-full"></div>
</template>

<script>
import { defineComponent, ref, onMounted, watch } from 'vue';
import lottie, { AnimationConfigWithData } from 'lottie-web';

export default defineComponent({
  props: {
    animationData: {
      type: Object,
      required: true
    },
    config: {
      type: AnimationConfigWithData,
      default: {}
    },
    isPlaying: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const container = ref(null);
    const animation = ref(null);

    onMounted(() => {
      animation.value = lottie.loadAnimation({
        animationData: props.animationData,
        container: container.value,
        autoplay: true,
        loop: true,
        ...props.config
      });
    });

    watch(
      () => props.isPlaying,
      () => {
        if (props.isPlaying) {
          animation.value.play();
        } else {
          animation.value.stop();
        }
      }
    );

    return {
      container
    };
  }
});
</script>
