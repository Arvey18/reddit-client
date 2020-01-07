import snoowrap from 'snoowrap';
import {APP} from '../constant/auth';

export const GET_ACCESS_TOKEN = () => (dispatch: any) => {
  return snoowrap
    .fromApplicationOnlyAuth({
      userAgent: 'My Reddit Client',
      clientId: APP.clientID,
      clientSecret: APP.clientSecret,
      deviceId: 'DO_NOT_TRACK_THIS_DEVICE.',
      grantType: 'https://oauth.reddit.com/grants/installed_client',
    })
    .then((result: any) => {
      // Now we have a requester that can access reddit through a "user-less" Auth token
      return result;
    });
};
