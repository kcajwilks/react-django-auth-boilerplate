import axios from 'axios';
import { returnErrors, createMessage } from './messages';

import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  PASSWORD_RESET_EMAIL_SENT_SUCCESS,
  PASSWORD_RESET_EMAIL_SENT_FAIL,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
  PASSWORD_CHANGE_SUCCESS,
  PASSWORD_CHANGE_FAIL,
  // CREATE_MESSAGE,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  // EMAIL_CONFIRMING,
  // EMAIL_CONFIRM_SUCCESS,
  // EMAIL_CONFIRM_FAIL,
} from '../types';

// REGISTER USER
export const register = ({ username, password1, password2, email }) => (
  dispatch
) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request Body
  const body = JSON.stringify({ username, password1, password2, email });

  axios
    .post('http://localhost:8000/dj-rest-auth/registration/', body, config)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

// LOGIN USER
export const login = (username, password) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request Body
  const body = JSON.stringify({ username, password });

  axios
    .post('http://localhost:8000/dj-rest-auth/login/', body, config)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

// CHECK TOKEN & LOADER USER
export const loadUser = () => (dispatch, getState) => {
  // User Loading
  dispatch({ type: USER_LOADING });
  axios
    .get('http://localhost:8000/dj-rest-auth/user/', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
  axios
    .post(
      'http://localhost:8000/dj-rest-auth/logout/',
      null,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: LOGOUT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// PASSWORD RESET
export const passwordReset = (email) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request Body
  const body = JSON.stringify({ email });

  axios
    .post('http://localhost:8000/dj-rest-auth/password/reset/', body, config)
    .then((res) => {
      console.log(res.data);
      dispatch(createMessage({ emailSent: res.data.detail }));
      dispatch({
        type: PASSWORD_RESET_EMAIL_SENT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: PASSWORD_RESET_EMAIL_SENT_FAIL,
      });
    });
};

// PASSWORD RESET CONFIRM
export const passwordResetConfirm = ({
  uid,
  token,
  new_password1,
  new_password2,
}) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request Body
  const body = JSON.stringify({ uid, token, new_password1, new_password2 });

  axios
    .post(
      'http://localhost:8000/dj-rest-auth/password/reset/confirm/',
      body,
      config
    )
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: PASSWORD_RESET_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: PASSWORD_RESET_FAIL,
      });
    });
};

// CHECK TOKEN & LOADER USER
export const updateUser = ({ username, first_name, last_name }) => (
  dispatch,
  getState
) => {
  // Request Body
  const body = JSON.stringify({ username, first_name, last_name });
  console.log(body);
  // User Loading
  axios
    .patch(
      'http://localhost:8000/dj-rest-auth/user/',
      body,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch(
        createMessage({ updateUser: 'User details have been updated.' })
      );
      dispatch({
        type: USER_UPDATE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: USER_UPDATE_FAIL,
      });
    });
};

// PASSWORD CHANGE
export const passwordChange = ({
  old_password,
  new_password1,
  new_password2,
}) => (dispatch, getState) => {
  // Request Body
  const body = JSON.stringify({ old_password, new_password1, new_password2 });

  axios
    .post(
      'http://localhost:8000/dj-rest-auth/password/change/',
      body,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch(createMessage({ passwordChanged: res.data.detail }));
      dispatch({
        type: PASSWORD_CHANGE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: PASSWORD_CHANGE_FAIL,
      });
    });
};

// CHANGE EMAIL
export const changeEmail = ({ email }) => (dispatch, getState) => {
  // Request Body
  const body = JSON.stringify({ email });
  console.log(body);
  // User Loading
  axios
    .put(
      'http://localhost:8000/dj-rest-auth/user/',
      body,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch(
        createMessage({ updateUser: 'User details have been updated.' })
      );
      dispatch({
        type: USER_UPDATE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: USER_UPDATE_FAIL,
      });
    });
};

// resendEmail
export const resendEmail = (email) => (dispatch, getState) => {
  // Request Body
  const body = JSON.stringify({ email });
  axios.post(
    'http://localhost:8000/email/resend/',
    body,
    tokenConfig(getState)
  );
};

// deleteEmail
export const deleteEmail = (id) => (dispatch, getState) => {
  // Request Body
  axios.delete(
    `http://localhost:8000/email/delete/${id}/`,
    tokenConfig(getState)
  );
};

// Setup config with token - helper function for re-use
export const tokenConfig = (getState) => {
  // Get token from state (localstorage)
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // If token, add to headers config
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  return config;
};
