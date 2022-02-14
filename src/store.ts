import { createEpicMiddleware } from 'redux-observable';
import { createStore, applyMiddleware } from 'redux';
import { ActionTypes } from './actions/app';
import { RootState } from './reducers';
import rootReducer from './reducers';
import rootEpic from './epics';

const epicMiddleware = createEpicMiddleware<
  ActionTypes,
  ActionTypes,
  RootState
>();

const store = createStore(rootReducer, applyMiddleware(epicMiddleware));

epicMiddleware.run(rootEpic);

export default store;
