const functions = require('firebase-functions')

const app = require('express')()
const cors = require('cors')

const {
	getAllTodos,
	postOneTodo,
	deleteTodo,
	editTodo,
	getOneTodo,
} = require('./api/todos')

const { signUpUser, loginUser } = require('./api/users')

const { getUserDetail } = require('./api/users')

const auth = require('./utils/auth')

app.use(cors())

const { updateUserDetails } = require('./api/users')

app.post('/user', auth, updateUserDetails)
app.get('/user', auth, getUserDetail)
app.post('/login', loginUser)
app.post('/signup', signUpUser)

app.get('/todos', auth, getAllTodos)
app.get('/todo/:todoId', auth, getOneTodo)
app.post('/todo', auth, postOneTodo)
app.delete('/todo/:todoId', auth, deleteTodo)
app.put('/todo/:todoId', auth, editTodo)

exports.api = functions.https.onRequest(app)
