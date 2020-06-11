import produce from 'immer'

import { STOP_GLOBAL_LOADING } from './constants'

export const initialState = {
  loading: true,
}

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case STOP_GLOBAL_LOADING:
        draft.loading = false
        break
    }
  })

export default appReducer
