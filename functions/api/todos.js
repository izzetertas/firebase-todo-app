const { db } = require('../utils/admin')
exports.getAllTodos = (request, response) => {
	db.collection('todos')
		.where('username', '==', request.user.email)
		.orderBy('createdAt', 'desc')
		.get()
		.then((data) => {
			let todos = []
			data.forEach((doc) => {
				todos.push({
					todoId: doc.id,
					text: doc.data().text,
					username: doc.data().username,
					createdAt: doc.data().createdAt,
					done: doc.data().done
				})
			})
			return response.json(todos)
		})
		.catch((err) => {
			console.error(err)
			return response.status(500).json({ error: err.code })
		})
}

exports.getOneTodo = (request, response) => {
	db.doc(`/todos/${request.params.todoId}`)
		.get()
		.then((doc) => {
			if (!doc.exists) {
				return response.status(404).json({
					error: 'Todo not found',
				})
			}
			if (doc.data().username !== request.user.email) {
				return response.status(403).json({ error: 'UnAuthorized' })
			}
			TodoData = doc.data()
			TodoData.todoId = doc.id
			return response.json(TodoData)
		})
		.catch((err) => {
			console.error(err)
			return response.status(500).json({ error: error.code })
		})
}

exports.postOneTodo = (request, response) => {
	if (request.body.text.trim() === '') {
		return response.status(400).json({ text: 'Must not be empty' })
	}

	const newTodoItem = {
		text: request.body.text,
		username: request.user.email,
		createdAt: new Date().toISOString(),
		done: request.body.done
	}

	db.collection('todos')
		.add(newTodoItem)
		.then((doc) => {
			const responseTodoItem = newTodoItem
			responseTodoItem.id = doc.id
			return response.json(responseTodoItem)
		})
		.catch((error) => {
			console.error(error)
			response.status(500).json({ error: 'Something went wrong' })
		})
}

exports.deleteTodo = (request, response) => {
	const document = db.doc(`/todos/${request.params.todoId}`)
	document
		.get()
		.then((doc) => {
			if (!doc.exists) {
				return response.status(404).json({
					error: 'Todo not found',
				})
			}
			if (doc.data().username !== request.user.email) {
				return response.status(403).json({ error: 'UnAuthorized' })
			}
			return document.delete()
		})
		.then(() => {
			response.json({ message: 'Delete successfull' })
		})
		.catch((err) => {
			console.error(err)
			return response.status(500).json({
				error: err.code,
			})
		})
}

exports.editTodo = (request, response) => {
	if (request.body.todoId || request.body.createdAt) {
		response.status(403).json({ message: 'Not allowed to edit' })
	}
	let document = db.collection('todos').doc(`${request.params.todoId}`)
	document
		.update(request.body)
		.then((doc) => {
			response.json({ message: 'Updated successfully' })
		})
		.catch((error) => {
			if (error.code === 5) {
				response.status(404).json({ message: 'Not Found' })
			}
			console.error(error)
			return response.status(500).json({
				error: error.code,
			})
		})
}
