import axios from 'axios'
import to from 'await-to-js'

axios.interceptors.request.use(
  config => {
    if(config.url !== '/login') {
      config.headers['Authorization'] = localStorage.getItem('AuthToken')
    }
    return config
  }, 
  error => Promise.reject(error.response)
)

axios.interceptors.response.use(
  response => response,
  error => {
    console.log('error', error.response)
    const path = error.response.config.url
    if(error && error.response.status === 403 && path !== '/login') {
      window.location.href = '/login'
    }
    return Promise.reject(error.response)
  }
)

export const login = async (email, password) => {
  const [err, response] =  await to(axios.post('/login', { email, password }))

  if(err) return {
    statusCode: err.status,
    errorMessage: err.data.errorMessage
  }
  return {
    token: response.data.token
  }
}

export const getUserDetails = async () => {
  const [err, response] = await to(axios.get('/user'))

  if(err && err.status === 403) {
    return { redirectToLogin: true }
  }
  return response.data.userCredentials
}

export const signup = async (userInfo) => {  
  const [err, response] = await to(axios.post('/signup', userInfo))

  if(err && err.status === 400) {
    return { errorMessage: err.data.errorMessage }
  }
  return response.data
}


export default {
  login,
  signup,
  getUserDetails,
}