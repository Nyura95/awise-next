import { CounterAction } from '../reducers/counter';

// Set the source file
const source = 'Counter action';

/**
 * Increment the counter with the variable {counter}
 * @param {number} counter
 * @version 1.0.0
 * @returns {void}
 */
export const counterSet = (counter: number): CounterAction => {
  return { type: 'ADD_COUNTER', payload: { counter } };
};

/**
 * Reset the counter at 0
 * @version 1.0.0
 * @returns {void}
 */
export const counterReset = (): CounterAction => {
  return { type: 'SET_COUNTER', payload: { counter: 0 } };
};

/**
 * Increment the counter with the variable {counter} in async
 * @version 1.0.0
 * @returns {void}
 */
export const counterAsyncSet = (counter: number): CounterAction => {
  return { type: 'ASYNC_COUNTER_INCREMENT', payload: {}, saga: { counter } };
};
