<template>
  <div class="flex flex-col space-y-6 py-4">
    <p v-if="!selectedChoice" class="text-center">
      {{ progressText }}
    </p>
    <ResultBadge v-else :isCorrect="isCorrect" class="mx-auto" />

    <H2 class="text-center font-black">{{ quiz.question }}</H2>

    <div v-if="!selectedChoice" class="flex flex-col space-y-2">
      <ChoiceButton
        v-for="choice in choices"
        :key="choice.letter"
        :choice="choice"
        @click="selectedChoice = choice"
      />
    </div>
    <div class="flex flex-col space-y-4" v-else>
      <P class="">เฉลย</P>
      <ChoiceButton :choice="correctChoice" isCorrect />
      <P class="mx-2">
        {{ quiz.explanation }}
      </P>
      <div class="flex flex-col">
        <button
          class="h-8 rounded-2xl hover:bg-white mx-auto m-8"
          @click="onComplete"
        >
          <img src="../assets/images/next.svg" alt="ถัดไป" class="h-full" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, watch } from 'vue';
import { ChoiceLetter } from '../constants/choice-letter';
import ChoiceButton, { Choice } from './choice-button.vue';
import ResultBadge from './result-badge.vue';
import H2 from './typography/h2.vue';
import P from './typography/p.vue';

export interface Quiz {
  no: number;
  question: string;
  [ChoiceLetter.A]: string;
  [ChoiceLetter.B]: string;
  [ChoiceLetter.C]: string;
  [ChoiceLetter.D]: string;
  answer: ChoiceLetter;
  explanation: string;
}

export interface QuizResult {
  no: number;
  answer: ChoiceLetter;
  isCorrect: boolean;
}

export default defineComponent({
  props: {
    quiz: {
      type: Object as PropType<Quiz>,
      required: true
    },
    progressText: {
      type: String,
      required: true
    }
  },
  components: {
    ChoiceButton,
    ResultBadge,
    H2,
    P
  },
  setup(props, { emit }) {
    const choices = computed<Choice[]>(() =>
      Object.values(ChoiceLetter).map(letter => ({
        letter,
        label: props.quiz[letter]
      }))
    );

    const correctChoice = computed<Choice | undefined>(() =>
      choices.value.find(({ letter }) => letter === props.quiz.answer)
    );

    const selectedChoice = ref<Choice | undefined>();

    watch(
      () => props.quiz.no,
      () => {
        selectedChoice.value = undefined;
      }
    );

    const isCorrect = computed<boolean>(
      () => selectedChoice.value?.letter === props.quiz.answer
    );

    const onComplete = () => {
      emit('complete', {
        no: props.quiz.no,
        answer: selectedChoice.value?.letter,
        isCorrect: isCorrect.value
      } as QuizResult);
    };

    return {
      choices,
      selectedChoice,
      correctChoice,
      isCorrect,
      onComplete
    };
  }
});
</script>
