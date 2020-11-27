<template>
  <div class="flex flex-col">
    <input
      type="text"
      for="province"
      class="w-full px-4 py-2 border-2"
      v-model.trim="keyword"
      @keypress.enter="keyword = filteredProvinces[0] || keyword"
      @focus="isFocused = true"
      @blur="handleBlurWithDelay"
    />
    <div class="relative">
      <div
        class="absolute flex flex-col top-0 inset-x-0 bg-white appearance-none z-10"
      >
        <div
          v-for="(province, index) in filteredProvinces"
          :key="province"
          :tabindex="index"
          class="py-2 px-4 hover:bg-darkgray"
          @click="keyword = province"
        >
          {{ province }}
        </div>
      </div>
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
  setup(props, { emit }) {
    const keyword = ref<string>('');
    const isFocused = ref<boolean>(false);

    const filteredProvinces = computed<string[]>(() => {
      const matchedProvinces = provinces.filter(
        province => province.indexOf(keyword.value) >= 0
      );

      if (
        (!keyword.value && isFocused.value) ||
        (keyword.value && matchedProvinces[0] !== keyword.value)
      ) {
        return matchedProvinces.slice(0, MAX_PROVINCES_DISPLAY);
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

    const handleBlurWithDelay = () =>
      setTimeout(() => (isFocused.value = false), 500);

    return {
      keyword,
      filteredProvinces,
      isFocused,
      handleBlurWithDelay
    };
  }
});
</script>
