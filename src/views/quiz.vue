<template>
  <div>
    {{ selectedQuizs }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import quizes from '../assets/data/quizes.json';
import getRandomSubarray from '../utils/subarray';

const NUMBER_OF_SELECTED_QUIZ = 8;

interface Quiz {
  no: number;
  question: string;
  A: string;
  B: string;
  C: string;
  D: string;
  answer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  reference?: string;
}

export default defineComponent({
  setup() {
    const selectedQuizs = getRandomSubarray(
      quizes,
      NUMBER_OF_SELECTED_QUIZ
    ) as Quiz[];

    return {
      selectedQuizs
    };
  }
});
</script>
