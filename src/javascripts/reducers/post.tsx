import {GET_POSTS} from '../actions/post';

// variables
const initialState = {
  posts: Array || [],
};

export default function(state: object = initialState, action: any = null) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.posts,
      };
    default:
      return state;
  }
}
