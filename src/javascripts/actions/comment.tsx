import {GET_ACCESS_TOKEN} from './auth';

export const GET_COMMENTS = (id: string) => (dispatch: any) => {
  dispatch(GET_ACCESS_TOKEN()).then((result: any) => {
    result
      .getSubmission(id)
      .comments.fetchAll()
      .then((result: any) => {
        dispatch({
          type: GET_COMMENTS,
          comments: result,
        });
      });
  });
};
