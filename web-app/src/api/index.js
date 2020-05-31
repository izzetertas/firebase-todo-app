import axios from 'axios'

axios.defaults.baseURL = 'https://us-central1-xyz-todo.cloudfunctions.net/api'

export const login = async (email, password) => {
  return axios
    .post('/login', { email, password })
    .then((response) => {
      return response.data
    })
}

export const getUserDetails = async (token) => {
  return axios
    .get('/user')
    .then((response) => {
      return response.data.userCredentials
    })
}

export default {
  login,
  getUserDetails,
}