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
    <div class="flex flex-col md:flex-row px-2">
      <SocialSharer :score="score" class="md:flex-1" />
      <router-link
        to="/quiz"
        class="md:flex-1 flex border-2 h-12 hover:underline"
      >
        <P class="m-auto">เล่นใหม่</P>
      </router-link>
      <a
        href="https://www.kpi-corner.com/content/8087/local00015"
        target="_blank"
        class="md:flex-1 flex border-2 h-12 border-t-0 md:border-t-2 md:border-l-0 hover:underline"
      >
        <P class="m-auto">อ่านข้อมูลเพิ่มเติม</P>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, Ref } from 'vue';
import { ProviderName } from '@/constants/provider';
import { NUMBER_OF_SELECTED_QUIZ } from './quiz.vue';
import LottiePlayer from '@/components/lottie-player.vue';
import SocialSharer from '@/components/social-sharer.vue';
import H1 from '@/components/typography/h1.vue';
import H2 from '@/components/typography/h2.vue';
import H3 from '@/components/typography/h3.vue';
import P from '@/components/typography/p.vue';
import resultDetails from '@/assets/data/results.json';
import step1Animation from '@/assets/lotties/step1.json';
import step2Animation from '@/assets/lotties/step2.json';
import step3Animation from '@/assets/lotties/step3.json';

interface ResultDetail {
  scoreRange: Number[];
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
    LottiePlayer,
    SocialSharer
  },
  setup() {
    const score = inject(ProviderName.Score) as Ref<number>;

    const rank = computed<Number>(() =>
      (resultDetails as ResultDetail[]).findIndex(isScoreInRange(score.value))
    );

    const resultDetail = computed<ResultDetail | undefined>(() =>
      (resultDetails as ResultDetail[]).find(isScoreInRange(score.value))
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
