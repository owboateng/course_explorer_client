import {types} from './constants';
export function showSectionForm(show_section){
  return {
    type: types.SHOW_HIDE_SECTION_FORM,
    payload: {show: show_section}
  }
}
export function setLogin(is_logged_in){
  return {
    type: types.SET_LOGIN_STATE,
    payload: {loggedin: is_logged_in}
  }
}