/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import history from 'utils/history'
import todosReducer from 'pages/TodosPage/reducer'
import loginReducer from 'pages/LoginPage/reducer'
import languageProviderReducer from 'components/LanguageProvider/reducer'

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    user: loginReducer,
    language: languageProviderReducer,
    todos: todosReducer,
    router: connectRouter(history),
    ...injectedReducers,
  })

  return rootReducer
}