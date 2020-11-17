<template>
  {{ score }}
</template>

<script lang="ts">
import { QuizResult } from '@/components/quiz-display.vue';
import { ProviderName } from '@/constants/provider';
import { computed, defineComponent, inject, Ref } from 'vue';
import { NUMBER_OF_SELECTED_QUIZ } from './quiz.vue';

export default defineComponent({
  setup() {
    const results = inject(ProviderName.Results) as Ref<QuizResult[]>;

    const score = computed(
      () =>
        `${
          results.value.filter(({ isCorrect }) => isCorrect).length
        }/${NUMBER_OF_SELECTED_QUIZ} คะแนน`
    );

    return {
      score
    };
  }
});
</script>
