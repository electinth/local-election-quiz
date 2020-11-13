<template>
  <div class="flex flex-col space-y-4">
    <H2 class="text-center">{{ quiz.question }}</H2>
    <div v-if="!selectedChoice" class="flex flex-col space-y-1">
      <ChoiceButton
        v-for="choice in choices"
        :key="choice.letter"
        :choice="choice"
        @click="selectedChoice = choice"
      />
    </div>
    <div class="flex flex-col space-y-4" v-else>
      <P class="my-8">เฉลย</P>
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
import { computed, defineComponent, PropType, ref } from 'vue';
import { ChoiceLetter } from '../constants/choice-letter';
import ChoiceButton, { Choice } from './choice-button.vue';
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
  reference?: string;
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
    }
  },
  components: {
    ChoiceButton,
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
