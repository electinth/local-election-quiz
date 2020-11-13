<template>
  <div class="flex-1 bg-gray">
    <p>{{ currentQuizNumber + 1 }}/{{ NUMBER_OF_SELECTED_QUIZ }}</p>
    <QuizDisplay :quiz="currentQuiz" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import QuizDisplay, { Quiz } from '../components/quiz-display.vue';
import quizes from '../assets/data/quizes.json';
import getRandomSubarray from '../utils/subarray';

const NUMBER_OF_SELECTED_QUIZ = 8;

export default defineComponent({
  components: {
    QuizDisplay
  },
  setup() {
    const randomedQuizs = getRandomSubarray(
      quizes,
      NUMBER_OF_SELECTED_QUIZ
    ) as Quiz[];

    const currentQuizNumber = ref(0);
    const currentQuiz = computed<Quiz>(
      () => randomedQuizs[currentQuizNumber.value]
    );

    return {
      currentQuizNumber,
      NUMBER_OF_SELECTED_QUIZ,
      currentQuiz
    };
  }
});
</script>
