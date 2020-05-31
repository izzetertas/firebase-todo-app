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
    name: '',
    surname: ''
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
        draft.userDetail = action.payload
        draft.loading = false
        draft.loggedIn = true
        break

      case LOGIN_ERROR:
        draft.errorMessage = action.errorMessage;
        draft.loading = false;
        break;
    }
  })

export default loginReducer
