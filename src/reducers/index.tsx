import {AUTH_USER} from '../utils/constants/actionTypes';

export default function (
  state: any,
  {type, payload}: {type: string; payload: object},
) {
  switch (type) {
    case AUTH_USER:
      return {
        ...state,
        user: payload,
      };
    default:
      return state;
  }
}
