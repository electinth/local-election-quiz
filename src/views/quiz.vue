<template>
  <div class="flex-1 flex flex-col bg-gray p-3 space-y-4">
    <QuizDisplay
      class="flex-1"
      :quiz="currentQuiz"
      :progressText="progressText"
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

    const progressText = computed(
      () => `${currentQuizNumber.value + 1}/${NUMBER_OF_SELECTED_QUIZ}`
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
      progressText,
      currentQuiz,
      onQuizComplete
    };
  }
});
</script>
