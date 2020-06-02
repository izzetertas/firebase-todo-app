import produce from 'immer'

import { CHANGE_LOCALE } from './constants'
import { DEFAULT_LOCALE } from 'i18n'

import { getUserLanguage } from 'utils/languageHelper'

export const initialState = {
  locale: getUserLanguage() ||  DEFAULT_LOCALE,
}

/* eslint-disable default-case, no-param-reassign */
const languageProviderReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_LOCALE:
        draft.locale = action.locale
        break
    }
  })

export default languageProviderReducer
