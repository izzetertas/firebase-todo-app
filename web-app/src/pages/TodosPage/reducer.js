import produce from 'immer'
import {
  TODOS_REQUEST,
  TODOS_SUCCESS,
  TODOS_ERROR,
  TODO_ADD_REQUEST,
  TODO_ADD_SUCCESS,
  TODO_ADD_ERROR,
  TODO_REMOVE_REQUEST,
  TODO_REMOVE_SUCCESS,
  TODO_REMOVE_ERROR,
  TODO_UPDATE_REQUEST,
  TODO_UPDATE_SUCCESS,
  TODO_UPDATE_ERROR,
 } from './constants'

export const initialState = {
  itemsLoading: false,
  addTodoInProgress: false,
  removeTodoInProgress: false,
  updateTodoInProgress: false,
  errorMessage: null,
  items: []
}

/* eslint-disable default-case, no-param-reassign */
const todosReducer = (state = initialState, action) =>
  produce(state, draft => {
    // console.log('todosReducer', action)
    switch (action.type) {
      case TODOS_REQUEST:
        draft.itemsLoading = true
        draft.errorMessage = null
        draft.items = []
        break

      case TODOS_SUCCESS:
        draft.items = action.payload
        draft.itemsLoading = false
        break

      case TODOS_ERROR:
        draft.errorMessage = action.errorMessage
        draft.itemsLoading = false
        break

      case TODO_ADD_REQUEST:
        draft.addTodoInProgress = true
        draft.errorMessage = null
        break

      case TODO_ADD_SUCCESS:
        draft.items.push(action.payload)
        draft.addTodoInProgress = false
        break

      case TODO_ADD_ERROR:
        draft.errorMessage = action.errorMessage
        draft.addTodoInProgress = false
        break
      
      case TODO_REMOVE_REQUEST:
        draft.removeTodoInProgress = true
        draft.errorMessage = null
        break

      case TODO_REMOVE_SUCCESS:
        draft.items =  draft.items.filter(todo => todo.id !== action.payload)
        draft.removeTodoInProgress = false
        break

      case TODO_REMOVE_ERROR:
        draft.errorMessage = action.errorMessage
        draft.removeTodoInProgress = false
        break
      
      case TODO_UPDATE_REQUEST:
        draft.updateTodoInProgress = true
        draft.errorMessage = null
        break

      case TODO_UPDATE_SUCCESS:
        draft.items.forEach((item, ind) => {
          if(item.id === action.payload.id) {
            draft.items[ind] = { ...action.payload }
          }
        })
        draft.updateTodoInProgress = false
        break

      case TODO_UPDATE_ERROR:
        draft.errorMessage = action.errorMessage
        draft.updateTodoInProgress = false
        break
    }
  })

export default todosReducer
