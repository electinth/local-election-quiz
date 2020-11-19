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
import { v4 as uuidv4 } from 'uuid';
import { defineComponent, provide, ref } from 'vue';
import { QuizResult } from './components/quiz-display.vue';
import { ProviderName } from './constants/provider';

export default defineComponent({
  setup() {
    provide(ProviderName.UserId, uuidv4());
    provide(ProviderName.Results, ref<QuizResult[]>([]));
  }
});
</script>
