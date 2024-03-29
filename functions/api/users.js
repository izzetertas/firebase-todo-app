const { db } = require('../utils/admin')
const config = require('../utils/config')
const firebase = require('firebase')
firebase.initializeApp(config)

const { validateLoginData, validateSignUpData } = require('../utils/validators')

exports.loginUser = (request, response) => {
	const user = {
		email: request.body.email,
		password: request.body.password,
	}

	const { valid, errors } = validateLoginData(user)
	if (!valid) return response.status(400).json(errors)

	firebase
		.auth()
		.signInWithEmailAndPassword(user.email, user.password)
		.then((data) => {
			return data.user.getIdToken()
		})
		.then((token) => {
			return response.status(200).json({ token })
		})
		.catch((error) => {
			console.error(error)
			return response
				.status(403)
				.json({ errorMessage: 'Wrong credentials! Please try again.' })
		})
}

exports.signUpUser = (request, response) => {
	const newUser = {
		firstName: request.body.firstName,
		lastName: request.body.lastName,
		email: request.body.email,
		password: request.body.password,
		username: request.body.email,
	}

	const { valid, errors } = validateSignUpData(newUser)

	if (!valid) return response.status(400).json(errors)

	let token, userId
	db.doc(`/users/${newUser.username}`)
		.get()
		.then((doc) => {
			if (doc.exists) {
				return response
					.status(400)
					.json({ errorMessage: 'this username is already taken' })
			} else {
				return firebase
					.auth()
					.createUserWithEmailAndPassword(newUser.email, newUser.password)
			}
		})
		.then((data) => {
			userId = data.user.uid
			return data.user.getIdToken()
		})
		.then((idtoken) => {
			token = idtoken
			const userCredentials = {
				firstName: newUser.firstName,
				lastName: newUser.lastName,
				email: newUser.email,
				createdAt: new Date().toISOString(),
				userId,
			}
			return db.doc(`/users/${newUser.username}`).set(userCredentials)
		})
		.then(() => {
			return response.status(201).json({ token })
		})
		.catch((err) => {
			console.error(err)
			if (err.code === 'auth/email-already-in-use') {
				return response.status(400).json({ errorMessage: 'Email already in use' })
			} else {
				return response
					.status(500)
					.json({ errorMessage: 'Something went wrong, please try again' })
			}
		})
}

exports.getUserDetail = (request, response) => {
	let userData = {}
	db.doc(`/users/${request.user.email}`)
		.get()
		.then((doc) => {
			if (doc.exists) {
				userData.userCredentials = doc.data()
				return response.json(userData)
			}
		})
		.catch((error) => {
			console.error(error)
			return response.status(500).json({ errorMessage: error.code })
		})
}

exports.updateUserDetails = (request, response) => {
	let document = db.collection('users').doc(`${request.user.username}`)
	document
		.update(request.body)
		.then(() => {
			response.json({ message: 'Updated successfully' })
		})
		.catch((error) => {
			console.error(error)
			return response.status(500).json({
				errorMessage: 'Cannot update the value',
			})
		})
}
