// pages/_app.js
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import App from 'next/app';
import withRedux from 'next-redux-wrapper';
import { IAction } from '../actions';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';
const sagaMiddleware = createSagaMiddleware();

import reducers, { initialState } from '../reducers';
import { IProps } from '../interface';

import cookies from 'next-cookies';

const makeStore = (state = initialState) => {
  return createStore(reducers, state, applyMiddleware(sagaMiddleware));
};

class MyApp extends App<IProps> {
  // @ts-ignore
  static async getInitialProps({ Component, ctx }) {
    const { store } = cookies(ctx);
    if (store) {
      ctx.store.dispatch({ type: 'REYDRATE', payload: JSON.parse(store) });
    }
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    return { pageProps };
  }

  componentDidMount() {
    sagaMiddleware.run(rootSaga);
  }

  render() {
    const { Component, pageProps, store } = this.props;
    store.subscribe(() => {
      const expiryDate = new Date();
      expiryDate.setMonth(expiryDate.getMonth() + 1);
      document.cookie = 'store=' + JSON.stringify(store.getState()) + ';expires=' + expiryDate.toString();
    });
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    );
  }
}

// @ts-ignore
export default withRedux(makeStore)(MyApp);
