<template>
  <div
    class="flex flex-row bg-black border-2 border-black text-white h-12 p-1 justify-center space-x-4"
  >
    <P class="my-auto">Share</P>
    <a
      v-for="{ service, icon, href } in socialLinks"
      :key="service"
      :href="href"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img class="h-full" :src="icon" :alt="service" />
    </a>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import P from './typography/p.vue';

export default defineComponent({
  props: {
    score: {
      type: String,
      required: true
    }
  },
  components: {
    P
  },
  setup(props) {
    const socialLinks = computed(() => {
      const encodedUrl = encodeURI(
        `${process.env.VUE_APP_HOST_DOMAIN}share/${props.score}.html`
      );

      return [
        {
          service: 'Facebook',
          icon: require('../assets/images/social-facebook.svg'),
          href: `http://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
        },
        {
          service: 'Twitter',
          icon: require('../assets/images/social-twitter.svg'),
          href: `https://twitter.com/intent/tweet?url=${encodedUrl}`
        },
        {
          service: 'Line',
          icon: require('../assets/images/social-line.svg'),
          href: `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`
        }
      ];
    });

    return {
      socialLinks
    };
  }
});
</script>
