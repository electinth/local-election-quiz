<template>
  <div
    class="flex flex-col px-4 py-8 space-y-4 md:space-y-6 text-center max-w-screen-lg m-auto"
  >
    <H1 class="px-2 py-1 bg-green m-auto">
      {{ score }}/{{ NUMBER_OF_SELECTED_QUIZ }} คะแนน
    </H1>
    <P>คุณเป็น</P>
    <H2 class="font-black">{{ resultDetail.character }}</H2>
    <H3>
      {{ resultDetail.description }}
    </H3>
    <div class="flex flex-col md:flex-row py-4 px-10 space-y-4 space-x-4">
      <LottiePlayer
        v-for="(animation, index) in animations"
        :key="index"
        :animationData="animation"
        :config="{ autoplay: rank === index }"
        :isPlaying="rank === index"
        class="flex"
        :class="{ 'opacity-25': rank !== index }"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, Ref } from 'vue';
import { QuizResult } from '@/components/quiz-display.vue';
import { ProviderName } from '@/constants/provider';
import { NUMBER_OF_SELECTED_QUIZ } from './quiz.vue';
import LottiePlayer from '../components/lottie-player.vue';
import H1 from '../components/typography/h1.vue';
import H2 from '../components/typography/h2.vue';
import H3 from '../components/typography/h3.vue';
import P from '../components/typography/p.vue';
import resultDetails from '../assets/data/results.json';
import step1Animation from '../assets/lotties/step1.json';
import step2Animation from '../assets/lotties/step2.json';
import step3Animation from '../assets/lotties/step3.json';

interface ResultDetail {
  scoreRange: [Number, Number];
  character: string;
  description: string;
}

const isScoreInRange = (score: number) => ({
  scoreRange: [min, max]
}: ResultDetail): Boolean => score >= min && score <= max;

export default defineComponent({
  components: {
    H1,
    H2,
    H3,
    P,
    LottiePlayer
  },
  setup() {
    const results = inject(ProviderName.Results) as Ref<QuizResult[]>;

    const score = computed(
      () => results.value.filter(({ isCorrect }) => isCorrect).length
    );

    const rank = computed<Number>(() =>
      resultDetails.findIndex(isScoreInRange(score.value))
    );

    const resultDetail = computed<Number>(() =>
      resultDetails.find(isScoreInRange(score.value))
    );

    return {
      NUMBER_OF_SELECTED_QUIZ,
      score,
      resultDetail,
      rank,
      animations: [step1Animation, step2Animation, step3Animation]
    };
  }
});
</script>
