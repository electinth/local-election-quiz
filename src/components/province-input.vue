<template>
  <div class="flex-1 flex flex-col">
    <input
      type="text"
      for="province"
      class="w-full px-4 py-2 border-2"
      v-model.trim="keyword"
      @keypress.enter="keyword = filteredProvinces[0] || keyword"
    />
    <div class="relative">
      <ul class="absolute flex flex-col top-0 inset-x-0 bg-white">
        <li
          v-for="province in filteredProvinces"
          :key="province"
          class="py-2 px-4 hover:bg-darkgray"
          @click="keyword = province"
        >
          {{ province }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';
import provinces from '@/assets/data/provinces.json';

const MAX_PROVINCES_DISPLAY = 5;

export default defineComponent({
  props: {
    modelValue: String
  },
  setup(_, { emit }) {
    const keyword = ref<string>('');

    const filteredProvinces = computed(() => {
      if (keyword.value) {
        const matchedProvinces = provinces.filter(
          province => province.indexOf(keyword.value) >= 0
        );

        if (matchedProvinces.length > 1) {
          return matchedProvinces.slice(0, MAX_PROVINCES_DISPLAY);
        } else if (matchedProvinces[0] !== keyword.value) {
          return matchedProvinces;
        }
      }

      return [];
    });

    watch(keyword, () => {
      emit(
        'update:modelValue',
        provinces.find(province => province === keyword.value)
          ? keyword.value
          : ''
      );
    });

    return {
      keyword,
      filteredProvinces
    };
  }
});
</script>
