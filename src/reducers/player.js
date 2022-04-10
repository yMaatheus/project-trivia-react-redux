import { SAVE_EMAIL, SAVE_NAME, SET_QUESTIONS, INCREMENT_SCORE,
  INCREMENT_CORRET_SCORE } from '../actions';

const FIRST_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  questions: [],
  questionsAnswers: [],
};

// ref: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
const shuffle = (array) => (
  array.map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
);

const handleAnswers = (
  { correct_answer: correctAnswer, incorrect_answers: incorrectAnswers },
) => {
  const array = incorrectAnswers.map(
    (incorrectAnswer, index) => ({ correct: false, answer: incorrectAnswer, index }),
  );
  array.push({ correct: true, answer: correctAnswer, index: correctAnswer });
  return shuffle(array);
};

const createRandomAnswers = (questions) => (
  questions.map((question) => handleAnswers(question))
);

const player = (state = FIRST_STATE, action) => {
  switch (action.type) {
  case INCREMENT_SCORE:
    return {
      ...state,
      score: (state.score + action.payload) };
  case SAVE_EMAIL:
    return {
      ...state,
      gravatarEmail: action.payload,
    };
  case SAVE_NAME:
    return {
      ...state,
      name: action.payload,
    };
  case SET_QUESTIONS:
    return {
      ...state,
      questions: action.payload,
      questionsAnswers: createRandomAnswers(action.payload),
    };
  case INCREMENT_CORRET_SCORE:
    return {
      ...state,
      assertions: action.payload,
    };
  default:
    return state;
  }
};

export default player;
