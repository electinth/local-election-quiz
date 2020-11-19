<template>
  <div class="flex-1 flex flex-col bg-gray p-3 space-y-4">
    <QuizDisplay
      class="flex-1 max-w-screen-lg m-auto"
      :quiz="currentQuiz"
      :progressText="progressText"
      @answer="onAnswerSubmitted"
      @complete="onQuizComplete"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, Ref, ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import QuizDisplay, { Quiz, QuizResult } from '@/components/quiz-display.vue';
import quizes from '@/assets/data/quizes.json';
import getRandomSubarray from '@/utils/subarray';
import { submitAnAnswer } from '@/utils/database';
import router from '@/router';
import { ProviderName } from '@/constants/provider';

export const NUMBER_OF_SELECTED_QUIZ = 7;

export default defineComponent({
  components: {
    QuizDisplay
  },
  setup() {
    const userId = inject(ProviderName.UserId) as Ref<string>;
    const score = inject(ProviderName.Score) as Ref<number>;

    userId.value = uuidv4();
    score.value = 0;

    const randomedQuizs = getRandomSubarray(
      quizes,
      NUMBER_OF_SELECTED_QUIZ
    ) as Quiz[];

    const currentQuizNumber = ref(0);
    const currentQuiz = computed<Quiz>(
      () => randomedQuizs[currentQuizNumber.value]
    );

    const progressText = computed(
      () => `${currentQuizNumber.value + 1}/${NUMBER_OF_SELECTED_QUIZ}`
    );

    const onAnswerSubmitted = (result: QuizResult): void => {
      if (result.isCorrect) {
        score.value++;
      }

      submitAnAnswer(userId.value, result.no, result.answer);
    };

    const onQuizComplete = (): void => {
      if (currentQuizNumber.value < NUMBER_OF_SELECTED_QUIZ - 1) {
        currentQuizNumber.value++;
      } else {
        router.push('/register');
      }
    };

    return {
      progressText,
      currentQuiz,
      onAnswerSubmitted,
      onQuizComplete
    };
  }
});
</script>
