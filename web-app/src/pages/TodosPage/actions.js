import to from 'await-to-js'

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

import todosService from 'services/todosService'

export const getTodosRequest = () => async dispatch => {
  dispatch({ type: TODOS_REQUEST })

  const [err, payload] = await to(todosService.getTodos())


  if(err) {
    return dispatch({ type: TODOS_ERROR, err })
  }

  dispatch({ type: TODOS_SUCCESS, payload })
}

export const addTodoRequest = (text, done) => async dispatch => {
  dispatch({ type: TODO_ADD_REQUEST })

  const [err, payload] = await to(todosService.addTodo({ text, done }))

  if(err) {
    return dispatch({ type: TODO_ADD_ERROR, err })
  }

  const newItem = { done, text, id: payload.id }
  dispatch({
    type: TODO_ADD_SUCCESS,
    payload: newItem
  })
}

export const removeTodoRequest = (todoId) => async dispatch => {
  dispatch({
    type: TODO_REMOVE_REQUEST,
    payload: todoId
  })

  const [error] = await to(todosService.removeTodo(todoId))

  if(error) {
    return dispatch({
      type: TODO_REMOVE_ERROR,
      payload: { errorMessage: error, id: todoId }
    })
  }

  dispatch({
    type: TODO_REMOVE_SUCCESS,
    payload: todoId
  })
}

export const updateTodoRequest = (todoItem) => async dispatch => {
  dispatch({
    type: TODO_UPDATE_REQUEST,
    payload: todoItem.id
  })

  const [err] = await to(todosService.updateTodo(todoItem))

  if(err) {
    return dispatch({ type: TODO_UPDATE_ERROR, err })
  }

  dispatch({
    type: TODO_UPDATE_SUCCESS,
    payload: todoItem
  })
}
