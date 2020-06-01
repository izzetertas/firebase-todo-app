export const authMiddleWare = (history) => {
	const authToken = localStorage.getItem('AuthToken')
	if (authToken === null) {
		history.push('/login')
	}
}

export const hasUserToken = () => {
	const authToken = localStorage.getItem('AuthToken')
	return !!authToken
}

export const getUserToken = () => {
	return localStorage.getItem('AuthToken')
}

export const setUserToken = (token) => {
	return localStorage.setItem('AuthToken', token)
}

export const removeUserToken = () => {
	return localStorage.removeItem('AuthToken')
}

export const redirectToLoginPage = () => {
	window.location.href = '/login'
}
