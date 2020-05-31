import to from 'await-to-js'
import axios from 'axios'

import { 
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
 } from './constants'

import { login, getUserDetails } from 'api'

export const loginRequest = (email, password) => async dispatch => {
  dispatch({ type: LOGIN_REQUEST })

  const [err, payload] = await to(login(email, password))

  if(err) {
    return dispatch(loginError(err))
  }
  const token = `Bearer ${payload.token}`
  localStorage.setItem('AuthToken', token)
  axios.defaults.headers.common = { Authorization: `${token}` }

  const [errUser, userDetail] = await to(getUserDetails(token))
  
  // this.props.history.push('/')

  dispatch(
    loginSuccessed({
      firstName: userDetail.firstName,
      lastName: userDetail.lastName,
      email: userDetail.email
    })
  )
}

const loginSuccessed = (payload) =>({
  type: LOGIN_SUCCESS,
  payload,
})

const loginError = (errorMessage) => ({
  type: LOGIN_ERROR,
  errorMessage,
})
