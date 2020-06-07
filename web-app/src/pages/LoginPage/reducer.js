import produce from 'immer'

import { 
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOAD_USER_INFO,
  REDIRECT_TO_LOGIN
 } from './constants'

export const initialState = {
  loading: false,
  errorMessage: null,
  loggedIn: false,
  redirectToLogin: false,
  userDetail: {
    firstName: null,
    lastName: null,
    email: null,
  },
}

/* eslint-disable default-case, no-param-reassign */
const loginReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGIN_REQUEST:
        draft.loading = true
        draft.redirectToLogin = false
        draft.errorMessage = null
        draft.userDetail = { }
        break

      case LOGIN_SUCCESS:
        draft.userDetail = {...action.payload}
        draft.loading = false
        draft.loggedIn = true
        break

      case LOGIN_ERROR:
        draft.errorMessage = action.payload;
        draft.loading = false;
        draft.redirectToLogin = false
        break

      case LOAD_USER_INFO:
        draft.userDetail = {...action.payload}
        draft.loggedIn = true
        break
      
      case REDIRECT_TO_LOGIN:
        draft.loggedIn = false
        draft.userDetail = {}
        draft.redirectToLogin = true
        break
    }
  })

export default loginReducer
