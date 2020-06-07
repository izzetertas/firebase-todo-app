const I = actor()
const constants = require('../constants')
const shortid = require('shortid')

module.exports = () => (
  {
    signup() {
      I.mockServer((server) => {
        server.post(`${constants.apiBaseUrl}/signup`).intercept((req, res) => {
          res.sendStatus(200).json({ token: 'dfsf1sdf23456jhue' });
        })
      })
    },
    signin() {
      I.mockServer((server) => {
        server.post(`${constants.apiBaseUrl}/login`).intercept((req, res) => {
          res.sendStatus(200).json({ token: 'dfsf1sdf23456jhue' });
        })
    
        server.get(`${constants.apiBaseUrl}/user`).intercept((req, res) => {
          res.sendStatus(200).json({
            userCredentials:{
              lastName:"Ertas",
              email:'test@gmail.com',
              firstName:'SUDE'
            }
          })
        })
    
        server.get(`${constants.apiBaseUrl}/todos`).intercept((req, res) => {
          res.sendStatus(200).json([])
        })
      })
    },
    todos () {
      let todos = []

      I.mockServer((server) => {
        server.post(`${constants.apiBaseUrl}/login`).intercept((req, res) => {
          res.sendStatus(200).json({ token: 'dfsf1sdf23456jhue' });
        })

        server.get(`${constants.apiBaseUrl}/user`).intercept((req, res) => {
          res.sendStatus(200).json({
            userCredentials:{
              lastName:"Ertas",
              email:'test@gmail.com',
              firstName:'SUDE'
            }
          })
        })

        server.get(`${constants.apiBaseUrl}/todos`).intercept((req, res) => {
          res.sendStatus(200).json(todos)
        })

        server.post(`${constants.apiBaseUrl}/todo`).intercept((req, res) => {
          const newTodo = {
            ...req.body,
            id: shortid.generate()
          }
          todos.push(newTodo)
          res.sendStatus(200).json(newTodo)
        })

        server.put(`${constants.apiBaseUrl}/todo/*`).intercept((req, res) => {
          todos = todos.map(item => {
            if(item.id === req.params.id) {
              return {...item, done:  !item.done }
            }
            return item
          })
          res.sendStatus(200).json({ message: 'Updated successfully' })
        })

        server.delete(`${constants.apiBaseUrl}/todo/*`).intercept((req, res) => {
          todos = todos.filter(item => item.id !== req.params.id)
          res.sendStatus(200).json({ message: 'Deleted successfully' })
        })
      })
    }
  }
)
