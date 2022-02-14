import { Epic, ofType, combineEpics } from 'redux-observable';
import { mapTo } from 'rxjs/operators';
import {
  ActionTypes,
  VALIDATING_WORD,
  validatedWordSuccess,
} from '../actions/app';
import { RootState } from '../reducers';

const guessWordEpic: Epic<ActionTypes, ActionTypes, RootState> = (action$) =>
  action$.pipe(
    ofType(VALIDATING_WORD),
    mapTo(validatedWordSuccess('apple')) // to be modified
  );

const appEpic = combineEpics(guessWordEpic);

export default appEpic;
