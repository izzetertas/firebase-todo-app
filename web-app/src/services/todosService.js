import axios from 'axios'
import { getOptions } from 'utils/auth'


export const getTodos = async () => {
  return axios
    .get('/todos', getOptions() )
    .then((response) => {
      if(!response.data) return null

      return response.data.map(todo => ({
        id: todo.todoId,
        text: todo.text,  
        done: todo.done
      }))
    })
}

export const addTodo = async (data) => {
  return axios
    .post('/todo', data, getOptions())
    .then((response) => {
      return response.data
    })
}

export const updateTodo = async ({id, ...data}) => {
  return axios
    .put(`/todo/${id}`, data, getOptions())
    .then((response) => {
      return response.data
    })
}

export const removeTodo = async (id) => {
  return axios
    .delete(`/todo/${id}`, getOptions())
    .then((response) => {
      return response.data
    })
}

export default {
  addTodo,
  removeTodo,
  updateTodo,
  getTodos,
}