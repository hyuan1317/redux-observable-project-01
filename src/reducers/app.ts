import {
  VALIDATING_WORD,
  VALIDATED_WORD_SUCCESS,
  VALIDATED_WORD_FAIL,
  UPDATE_GUESSING_LETTERS,
  ActionTypes,
  GuessInfo,
  KeyboardLetterHint,
  UPDATE_KEYBOARD_LETTER_HINT,
} from '../actions/app';

interface IState {
  answer: string;
  guesses: GuessInfo[];
  currentlyGuessingLetters: string;
  isGuessingWordValid: boolean;
  keyboardLetterHint: KeyboardLetterHint;
}
const initialState: IState = {
  answer: 'MANGO',
  guesses: [],
  currentlyGuessingLetters: '',
  isGuessingWordValid: true,
  keyboardLetterHint: {},
};

const appReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case UPDATE_GUESSING_LETTERS:
      return {
        ...state,
        currentlyGuessingLetters: action.payload,
      };
    case VALIDATING_WORD:
      return {
        ...state,
        isGuessingWordValid: true,
      };
    case VALIDATED_WORD_SUCCESS:
      return {
        ...state,
        guesses: state.guesses.concat(action.payload),
        currentlyGuessingLetters: '',
      };
    case VALIDATED_WORD_FAIL:
      return {
        ...state,
        isGuessingWordValid: false,
      };
    case UPDATE_KEYBOARD_LETTER_HINT:
      return {
        ...state,
        keyboardLetterHint: action.payload,
      };
    default:
      return state;
  }
};

export default appReducer;
