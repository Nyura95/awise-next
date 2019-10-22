// Redux
import { combineReducers } from 'redux';

export * from './types';

// Import here your new reducers
import { counter, initialState as initialStateCounter } from './counter';

export * from './counter';

const reducers = combineReducers({
  counter,
});

export const initialState = {
  counter: initialStateCounter,
};

export default reducers;
