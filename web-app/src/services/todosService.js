import axios from 'axios'

export const getTodos = async () => {
  return axios
    .get('/todos' )
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
    .post('/todo', data)
    .then((response) => {
      return response.data
    })
}

export const updateTodo = async ({id, ...data}) => {
  return axios
    .put(`/todo/${id}`, data)
    .then((response) => {
      return response.data
    })
}

export const removeTodo = async (id) => {
  return axios
    .delete(`/todo/${id}`)
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