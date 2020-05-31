import to from 'await-to-js'

import { 
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOAD_USER_INFO,
  REDIRECT_TO_LOGIN,
 } from './constants'

import userService from 'services/userService'
import { getUserToken } from 'utils/auth'

export const loginRequest = (email, password) => async dispatch => {
  dispatch({ type: LOGIN_REQUEST })

  const [err, payload] = await to(userService.login(email, password))
  console.log('LOGIN ERROR ', err);
  if(err) {
    return dispatch({ type: LOGIN_ERROR, err })
  }

  const token = `Bearer ${payload.token}`
  localStorage.setItem('AuthToken', token)

  const [errUserMessage, userDetail] = await to(userService.getUserDetails(token))
  
  if(errUserMessage) {
    return dispatch({
      type: LOGIN_ERROR,
      payload: errUserMessage,
    })
  }

  dispatch({
    type: LOGIN_SUCCESS,
    payload: {
      firstName: userDetail.firstName,
      lastName: userDetail.lastName,
      email: userDetail.email,
    },
  })
}

export const loadUserInfo = () => async dispatch => {

  const token = `Bearer ${getUserToken()}`

  const [errUserMessage, userDetail] = await to(userService.getUserDetails(token))
  
  if(errUserMessage) {
    return dispatch({ type: REDIRECT_TO_LOGIN })
  }

  dispatch({
    type: LOAD_USER_INFO,
    payload: {
      firstName: userDetail.firstName,
      lastName: userDetail.lastName,
      email: userDetail.email,
      loggedIn: true,
    },
  })
}
