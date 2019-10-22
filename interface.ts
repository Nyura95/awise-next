import { Props } from 'react';
import { IReduxState } from './reducers';
import { Store } from 'redux';

export interface IProps extends Props<{}> {
  store: Store<IReduxState>;
}
