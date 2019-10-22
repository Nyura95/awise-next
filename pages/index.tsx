import { NextPage } from 'next';
import '../styles.scss';
import Layout from '../components/Layout';
import { useTranslation } from 'react-i18next';
import { counterSet, counterAsyncSet, counterReset } from '../actions';
import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IReduxState, ICounterState, CounterDispatch } from '../reducers';

const Home: NextPage = () => {
  const { t } = useTranslation();
  const { counter } = useSelector<IReduxState, ICounterState>((reducer: IReduxState) => reducer.counter);
  const dispatch = useDispatch<CounterDispatch>();

  const incrementCounter = useCallback(() => dispatch(counterSet(1)), []);
  const decreaseCounter = useCallback(() => dispatch(counterSet(-1)), []);
  const incrementAsyncCounter = useCallback(() => dispatch(counterAsyncSet(1)), []);
  const resetCounter = useCallback(() => dispatch(counterReset()), []);

  return (
    <Layout>
      <div>{t('hello')}</div>
      <button onClick={incrementAsyncCounter}>Counter</button>
      <div>{counter}</div>
    </Layout>
  );
};

export default Home;
