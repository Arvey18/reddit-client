import {GET_COMMENTS} from '../actions/comment';

// variables
const initialState = {
  comments: Array || [],
};

export default function(state: object = initialState, action: any = null) {
  switch (action.type) {
    case GET_COMMENTS:
      return {
        ...state,
        comments: action.comments,
      };
    default:
      return state;
  }
}
