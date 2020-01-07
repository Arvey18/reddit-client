import {GET_POSTS, GET_POST} from '../actions/post';

// variables
const initialState = {
  posts: Array || [],
  post: {
    data: Array || [],
    comments: Array || [],
  },
};

export default function(state: object = initialState, action: any = null) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.posts,
      };
    case GET_POST:
      return {
        ...state,
        post: {
          data: action.data,
          comments: action.comments,
        },
      };
    default:
      return state;
  }
}
