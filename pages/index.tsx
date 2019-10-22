import { NextPage } from 'next';
import '../styles.scss';
import Layout from '../components/Layout';
import { useTranslation } from 'react-i18next';
import { counterSet, counterAsyncSet, counterReset } from '../actions';
import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IReduxState, ICounterState, CounterDispatch } from '../reducers';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';

interface show {
  id: number;
  name: string;
}

const Home: NextPage<{ shows: show[] }> = props => {
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
      <h1>Batman TV Shows</h1>
      <ul>
        {props.shows.map(show => (
          <li key={show.id}>
            <Link href="/p/[id]" as={`/p/${show.id}`}>
              <a>{show.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

Home.getInitialProps = async function() {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
  const data = await res.json();

  console.log(`Show data fetched. Count: ${data.length}`);

  return {
    // @ts-ignore
    shows: data.map(entry => entry.show),
  };
};

export default Home;
