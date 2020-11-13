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
    <div class="flex flex-col" v-else>
      <P class="my-8">เฉลย</P>
      <ChoiceButton :choice="correctedChoice" isCorrected />
      <P class="mx-2 mt-4">
        {{ quiz.explanation }}
      </P>
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
  setup(props) {
    const choices = computed<Choice[]>(() =>
      Object.values(ChoiceLetter).map(letter => ({
        letter,
        label: props.quiz[letter]
      }))
    );

    const correctedChoice = computed<Choice | undefined>(() =>
      choices.value.find(({ letter }) => letter === props.quiz.answer)
    );

    const selectedChoice = ref<Choice | undefined>();

    return {
      choices,
      selectedChoice,
      correctedChoice
    };
  }
});
</script>
