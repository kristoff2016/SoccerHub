import {AUTH_USER} from '../utils/constants/actionTypes';
import {User} from '../utils/interfaces';

export const storeUserInfo = (auth: User) => ({
  type: AUTH_USER,
  payload: {auth},
});
