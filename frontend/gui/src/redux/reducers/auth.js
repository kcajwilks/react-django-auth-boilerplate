import {
  USER_LOADING,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_EMAIL_SENT_FAIL,
  PASSWORD_RESET_EMAIL_SENT_SUCCESS,
  PASSWORD_CHANGE_SUCCESS,
  PASSWORD_CHANGE_FAIL,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  EMAIL_CONFIRMING,
  EMAIL_CONFIRM_SUCCESS,
  EMAIL_CONFIRM_FAIL,
} from '../types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: false,
  user: null,
  isRedirecting: false,
  emailConfirmed: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case EMAIL_CONFIRMING:
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    // LOGIN and REGISTER share the same
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.key);
      return {
        ...state,
        // ...action.payload,
        token: action.payload.key,
        isAuthenticated: true,
        isLoading: false,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case EMAIL_CONFIRM_SUCCESS:
      return {
        ...state,
        emailConfirmed: true,
      };
    case EMAIL_CONFIRM_FAIL:
      return {
        ...state,
        emailConfirmed: false,
      };
    case PASSWORD_CHANGE_SUCCESS:
    case PASSWORD_RESET_SUCCESS:
    case PASSWORD_RESET_EMAIL_SENT_SUCCESS:
    case PASSWORD_RESET_EMAIL_SENT_FAIL:
    case PASSWORD_RESET_FAIL:
    case USER_UPDATE_SUCCESS:
    case USER_UPDATE_FAIL:
    case PASSWORD_CHANGE_FAIL:

    default:
      return state;
  }
}
