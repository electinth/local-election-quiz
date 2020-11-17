<template>
  <div class="flex-1 flex flex-col bg-gray p-2 space-y-4">
    <p class="text-center">
      {{ currentQuizNumber + 1 }}/{{ NUMBER_OF_SELECTED_QUIZ }}
    </p>
    <QuizDisplay
      class="flex-1"
      :quiz="currentQuiz"
      @complete="onQuizComplete"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import QuizDisplay, { Quiz, QuizResult } from '../components/quiz-display.vue';
import quizes from '../assets/data/quizes.json';
import getRandomSubarray from '../utils/subarray';

const NUMBER_OF_SELECTED_QUIZ = 8;

export default defineComponent({
  components: {
    QuizDisplay
  },
  setup() {
    const results: QuizResult[] = [];

    const randomedQuizs = getRandomSubarray(
      quizes,
      NUMBER_OF_SELECTED_QUIZ
    ) as Quiz[];

    const currentQuizNumber = ref(0);
    const currentQuiz = computed<Quiz>(
      () => randomedQuizs[currentQuizNumber.value]
    );

    const onQuizComplete = (result: QuizResult): void => {
      results.push(result);

      if (currentQuizNumber.value < NUMBER_OF_SELECTED_QUIZ - 1) {
        currentQuizNumber.value++;
      } else {
        console.log('finish', results);
      }
    };

    return {
      currentQuizNumber,
      NUMBER_OF_SELECTED_QUIZ,
      currentQuiz,
      onQuizComplete
    };
  }
});
</script>
