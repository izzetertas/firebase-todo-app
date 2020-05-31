import axios from 'axios'
import { getOptions } from 'utils/auth'

// axios.interceptors.request.use(function (config) {
//   // Do something before request is sent
//   return config;
// }, function (error) {
//   // Do something with request error
//   return Promise.reject(error);
// });

// // Add a response interceptor
// axios.interceptors.response.use(function (response) {
//   // Do something with response data
//   return response;
// }, function (error) {
//   // Do something with response error
//   return Promise.reject(error);
// });

export const login = async (email, password) => {
  return axios
    .post('/login', { email, password })
    .then(response => {
      return response.data
    })
}

export const getUserDetails = async () => {
  return axios
    .get('/user', getOptions())
    .then(response => {
      return response.data.userCredentials
    })
}

export default {
  login,
  getUserDetails,
}