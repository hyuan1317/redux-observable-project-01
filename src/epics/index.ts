import { combineEpics } from 'redux-observable';
import appEpic from './app';

const rootEpic = combineEpics(appEpic);

export default rootEpic;
