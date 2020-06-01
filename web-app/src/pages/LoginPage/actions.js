import to from 'await-to-js'

import { 
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOAD_USER_INFO,
  REDIRECT_TO_LOGIN,
 } from './constants'

import userService from 'services/userService'
import { getUserToken, setUserToken } from 'utils/auth'

export const loginRequest = (email, password) => async dispatch => {
  dispatch({ type: LOGIN_REQUEST })
  const payload = await userService.login(email, password)

  if(payload.errorMessage) {
    return dispatch({
      type: LOGIN_ERROR,
      payload: payload.errorMessage
    })
  }

  const token = `Bearer ${payload.token}`
  setUserToken(token)

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

  const payload = await userService.getUserDetails(token)
  if(payload.redirectToLogin) {
    return dispatch({ type: REDIRECT_TO_LOGIN })
  }

  dispatch({
    type: LOAD_USER_INFO,
    payload: {
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      loggedIn: true,
    },
  })
}
