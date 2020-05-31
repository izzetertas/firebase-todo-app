import produce from 'immer'
import { 
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
 } from './constants'

export const initialState = {
  loading: false,
  errorMessage: null,
  loggedIn: false,
  userDetail: {
    firstName: null,
    lastName: null,
    email: null,
  },
}

/* eslint-disable default-case, no-param-reassign */
const loginReducer = (state = initialState, action) =>
  produce(state, draft => {
    console.log('loginReducer', action)
    switch (action.type) {
      case LOGIN_REQUEST:
        draft.loading = true
        draft.errorMessage = null
        draft.userDetail = { }
        break

      case LOGIN_SUCCESS:
        console.log('LOGIN_SUCCESS', action.payload);
        draft.userDetail = {...action.payload}
        draft.loading = false
        draft.loggedIn = true
        break

      case LOGIN_ERROR:
        draft.errorMessage = action.payload;
        draft.loading = false;
        break;
    }
  })

export default loginReducer
