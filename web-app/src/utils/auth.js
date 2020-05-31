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

export const getOptions = () => ({
	headers: {
		Authorization: localStorage.getItem('AuthToken')
	}
})