import firebase from 'firebase';
import { ChoiceLetter } from '@/constants/choice-letter';

const config = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  storageBucket: process.env.VUE_APP_BUCKET
};

firebase.initializeApp(config);

const database = firebase.database();

export const submitAnAnswer = (
  userId: string,
  quizNumber: number,
  answer: ChoiceLetter
): void => {
  database.ref(userId).update({
    [quizNumber]: answer
  });
};
