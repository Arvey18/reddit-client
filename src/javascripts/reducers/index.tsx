import {combineReducers} from 'redux';

// reducers
import posts from './post';
import comments from './comment';

const rootReducer = combineReducers({
  posts,
  comments,
});

export default rootReducer;
