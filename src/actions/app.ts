export const VALIDATING_WORD = 'VALIDATING_WORD';
export const VALIDATED_WORD_SUCCESS = 'VALIDATED_WORD_SUCCESS';
export const VALIDATED_WORD_FAIL = 'VALIDATED_WORD_FAIL';

export const validatingWord = (word: string) =>
  ({
    type: VALIDATING_WORD,
    payload: word,
  } as const);

export const validatedWordSuccess = (word: string) =>
  ({
    type: VALIDATED_WORD_SUCCESS,
    payload: word,
  } as const);

export const validatedWordFail = () =>
  ({
    type: VALIDATED_WORD_FAIL,
  } as const);

export type ActionTypes =
  | ReturnType<typeof validatingWord>
  | ReturnType<typeof validatedWordSuccess>
  | ReturnType<typeof validatedWordFail>;
