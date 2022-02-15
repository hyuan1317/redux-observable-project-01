import { Epic, combineEpics } from 'redux-observable';
import { map, mergeMap, filter } from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';
import {
  ActionTypes,
  VALIDATING_WORD,
  INSERT_LETTER,
  BACKSPACE_LETTER,
  updateGuessingLetters,
  validatedWordSuccess,
  LetterHitStatus,
  updateKeyboardLetterHint,
} from '../actions/app';
import { RootState } from '../reducers';

const insertLetterEpic: Epic<ActionTypes, ActionTypes, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(isOfType(INSERT_LETTER)),
    filter(() => state$.value.app.currentlyGuessingLetters.length < 5),
    map((action) => {
      const { currentlyGuessingLetters } = state$.value.app;
      const updatedLetters = currentlyGuessingLetters + action.payload;
      return updateGuessingLetters(updatedLetters);
    })
  );

const backspaceLetterEpic: Epic<ActionTypes, ActionTypes, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(isOfType(BACKSPACE_LETTER)),
    filter(() => state$.value.app.currentlyGuessingLetters.length > 0),
    map(() => {
      const { currentlyGuessingLetters } = state$.value.app;
      const updatedLetters = currentlyGuessingLetters.slice(0, -1);
      return updateGuessingLetters(updatedLetters);
    })
  );

const guessWordEpic: Epic<ActionTypes, ActionTypes, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(isOfType(VALIDATING_WORD)),
    filter(() => state$.value.app.currentlyGuessingLetters.length === 5),
    mergeMap(() => {
      const hitsResult: LetterHitStatus[] = [];
      const { answer, currentlyGuessingLetters, keyboardLetterHint } =
        state$.value.app;
      for (let i = 0; i < 5; i += 1) {
        const letter = currentlyGuessingLetters[i];
        let letterRevealStatus: LetterHitStatus;

        if (answer[i] === letter) letterRevealStatus = 'correct';
        else if (answer.includes(letter)) letterRevealStatus = 'present';
        else letterRevealStatus = 'absent';

        hitsResult.push(letterRevealStatus);

        switch (letterRevealStatus) {
          case 'correct':
            keyboardLetterHint[letter] = 'correct';
            break;
          case 'present':
            if (keyboardLetterHint[letter] !== 'correct')
              keyboardLetterHint[letter] = 'present';
            break;
          case 'absent':
          default:
            keyboardLetterHint[letter] = 'absent';
        }
      }

      const guessInfo = {
        word: currentlyGuessingLetters,
        hits: hitsResult,
      };
      return [
        validatedWordSuccess(guessInfo),
        updateKeyboardLetterHint(keyboardLetterHint),
      ];
    }) // to be modified
  );

const appEpic = combineEpics(
  insertLetterEpic,
  backspaceLetterEpic,
  guessWordEpic
);

export default appEpic;
