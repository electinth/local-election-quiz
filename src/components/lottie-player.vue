<template>
  <div ref="container" class="w-full h-full"></div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
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
    }
  },
  setup(props) {
    const container = ref(null);

    onMounted(() => {
      lottie.loadAnimation({
        animationData: props.animationData,
        container: container.value,
        autoplay: true,
        loop: true,
        ...props.config
      });
    });

    return {
      container
    };
  }
});
</script>
