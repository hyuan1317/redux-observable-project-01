export const VALIDATING_WORD = 'VALIDATING_WORD';
export const VALIDATED_WORD_SUCCESS = 'VALIDATED_WORD_SUCCESS';
export const VALIDATED_WORD_FAIL = 'VALIDATED_WORD_FAIL';
export const UPDATE_GUESSING_LETTERS = 'UPDATE_GUESSING_LETTERS';
export const INSERT_LETTER = 'INSERT_LETTER';
export const BACKSPACE_LETTER = 'BACKSPACE_LETTER';
export const UPDATE_KEYBOARD_LETTER_HINT = 'UPDATE_KEYBOARD_LETTER_HINT';

export type LetterHitStatus = 'absent' | 'present' | 'correct';
export interface GuessInfo {
  word: string;
  hits: LetterHitStatus[];
}
export interface KeyboardLetterHint {
  [a: string]: LetterHitStatus;
}

export const validatingWord = () =>
  ({
    type: VALIDATING_WORD,
  } as const);

export const validatedWordSuccess = (guessInfo: GuessInfo) =>
  ({
    type: VALIDATED_WORD_SUCCESS,
    payload: guessInfo,
  } as const);

export const validatedWordFail = () =>
  ({
    type: VALIDATED_WORD_FAIL,
  } as const);

export const updateGuessingLetters = (word: string) =>
  ({
    type: UPDATE_GUESSING_LETTERS,
    payload: word,
  } as const);

export const insertLetter = (letter: string) =>
  ({
    type: INSERT_LETTER,
    payload: letter,
  } as const);

export const backspaceLetter = () =>
  ({
    type: BACKSPACE_LETTER,
  } as const);

export const updateKeyboardLetterHint = (kbHint: KeyboardLetterHint) =>
  ({
    type: UPDATE_KEYBOARD_LETTER_HINT,
    payload: kbHint,
  } as const);

export type ActionTypes =
  | ReturnType<typeof validatingWord>
  | ReturnType<typeof validatedWordSuccess>
  | ReturnType<typeof validatedWordFail>
  | ReturnType<typeof updateGuessingLetters>
  | ReturnType<typeof insertLetter>
  | ReturnType<typeof backspaceLetter>
  | ReturnType<typeof updateKeyboardLetterHint>;
