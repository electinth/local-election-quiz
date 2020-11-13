<template>
  {{ question }}
  <div v-for="choice in choices" :key="choice.letter">
    {{ choice }}
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from 'vue';
import { ChoiceLetter } from '../constants/choice-letter';

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

interface Choice {
  letter: ChoiceLetter;
  label: String;
}

export default defineComponent({
  props: {
    quiz: {
      type: Object as PropType<Quiz>,
      required: true
    }
  },
  setup(props) {
    const { question } = toRefs(props.quiz);

    const choices = computed<Choice[]>(() =>
      Object.values(ChoiceLetter).map(letter => ({
        letter,
        label: props.quiz[letter]
      }))
    );

    return {
      question,
      choices
    };
  }
});
</script>
