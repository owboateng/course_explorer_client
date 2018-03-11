import {types} from './constants';

export function setLogin(is_logged_in, id_token=''){
  return {
    type: types.SET_LOGIN_STATE,
    payload: {loggedin: is_logged_in, gg_token_id: id_token}
  }
}