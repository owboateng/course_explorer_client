import {combineReducers} from 'redux';
import {types} from '../actions/constants';

const login = (store, action) => {
  if (action.type === types.SET_LOGIN_STATE) {
    return action.payload;
  }
  return store || {loggedin: false, gg_id_login: ''};
};
// const sectionform = (store, action) => {
//   if (action.type === types.SHOW_HIDE_SECTION_FORM) {
//     return action.payload;
//   }
//   return store || {show: false};
// }

export default combineReducers({
  login
});
