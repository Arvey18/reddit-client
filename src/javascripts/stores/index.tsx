import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const initialState = {};
const middleWare = [thunk];
const store: any = createStore(
  rootReducer,
  initialState,

  // staging production
  applyMiddleware(...middleWare)
);

export default store;
