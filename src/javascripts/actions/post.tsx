import {GET_ACCESS_TOKEN} from './auth';

export const GET_POSTS = (filter: string) => (dispatch: any) => {
  if (filter === 'n') {
    dispatch(GET_ACCESS_TOKEN()).then((result: any) => {
      result.getNew().then((posts: any) => {
        dispatch({
          type: GET_POSTS,
          posts: posts,
        });
      });
    });
  } else if (filter === 't') {
    dispatch(GET_ACCESS_TOKEN()).then((result: any) => {
      result.getTop({time: 'day'}).then((posts: any) => {
        dispatch({
          type: GET_POSTS,
          posts: posts,
        });
      });
    });
  } else if (filter === 'con') {
    dispatch(GET_ACCESS_TOKEN()).then((result: any) => {
      result.getControversial({time: 'day'}).then((posts: any) => {
        dispatch({
          type: GET_POSTS,
          posts: posts,
        });
      });
    });
  } else if (filter === 'r') {
    dispatch(GET_ACCESS_TOKEN()).then((result: any) => {
      result.getRising({time: 'day'}).then((posts: any) => {
        dispatch({
          type: GET_POSTS,
          posts: posts,
        });
      });
    });
  } else {
    dispatch(GET_ACCESS_TOKEN()).then((result: any) => {
      result.getHot({time: 'day'}).then((posts: any) => {
        dispatch({
          type: GET_POSTS,
          posts: posts,
        });
      });
    });
  }
};

export const GET_POST = (id: string) => (dispatch: any) => {
  dispatch(GET_ACCESS_TOKEN()).then((result: any) => {
    result
      .getSubmission(id)
      .fetch()
      .then((result: any) => {
        dispatch({
          type: GET_POST,
          data: result,
          comments: result.comments,
        });
      });
  });
};
