<template>
  <div class="w-screen min-h-screen flex flex-col bg-white">
    <div class="flex flex-row px-4 py-2">
      <img
        src="./assets/images/header-logo.png"
        alt="ELECT x King Prajadhipok's Insitute"
        class="h-6 md:h-8"
      />
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, ref } from 'vue';
import { ProviderName } from './constants/provider';

export default defineComponent({
  setup() {
    provide(ProviderName.UserId, ref<string>());
    provide(ProviderName.Score, ref<number>(0));
  }
});
</script>
