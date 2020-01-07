import {combineReducers} from 'redux';

// reducers
import posts from './post';

const rootReducer = combineReducers({
  posts,
});

export default rootReducer;
