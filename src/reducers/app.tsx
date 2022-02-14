import {
  VALIDATING_WORD,
  VALIDATED_WORD_SUCCESS,
  VALIDATED_WORD_FAIL,
  ActionTypes,
} from '../actions/app';

interface IState {
  answer: string;
  guesses: string[];
  isGuessingWordValid: boolean;
}
const initialState: IState = {
  answer: '',
  guesses: [],
  isGuessingWordValid: true,
};

const appReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case VALIDATING_WORD:
      return {
        ...state,
        isGuessingWordValid: true,
      };
    case VALIDATED_WORD_SUCCESS:
      return {
        ...state,
        guesses: state.guesses.concat(action.payload),
      };
    case VALIDATED_WORD_FAIL:
      return {
        ...state,
        isGuessingWordValid: false,
      };
    default:
      return state;
  }
};

export default appReducer;
