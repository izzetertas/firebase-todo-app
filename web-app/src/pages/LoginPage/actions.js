import to from 'await-to-js'

import { 
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOAD_USER_INFO
 } from './constants'

import userService from 'services/userService'
import { getUserToken, setUserToken, removeUserToken } from 'utils/auth'

import { STOP_GLOBAL_LOADING } from 'pages/App/constants'

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

const stopGlobalLoading = () => async dispatch => {
  dispatch({ type: STOP_GLOBAL_LOADING })
}

export const loadUserInfo = (history) => async dispatch => {
  const token = getUserToken()
  if(!token) {
    removeUserToken()
    const publicRoutes = ['/login', '/signup', '/']
		const isPublicRoute = publicRoutes.includes(history.location.pathname)
    
    if(isPublicRoute) {
			return dispatch(stopGlobalLoading())
    }

    if(history.location.pathname !== '/login') {
       dispatch(stopGlobalLoading())
      history.push('/login')
    }

    return
  }

  const payload = await userService.getUserDetails(`Bearer ${token}`)
  if(payload.redirectToLogin) {
    removeUserToken()
    history.push('/login')
    return
  }

  await dispatch({
    type: LOAD_USER_INFO,
    payload: {
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
    },
  })

   dispatch(stopGlobalLoading())
}
