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
import { defineComponent } from 'vue';
import { ProviderName } from './constants/provider';
import providePersistRef from './utils/persist-ref-provider';

export default defineComponent({
  setup() {
    providePersistRef(ProviderName.UserId);
    providePersistRef(ProviderName.Score);
  }
});
</script>
