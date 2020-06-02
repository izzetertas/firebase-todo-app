import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import LoginPage from 'pages/LoginPage'
import TodosPage from 'pages/TodosPage'
import SignupPage from 'pages/SignupPage'

import Loading from 'components/Loading'
import Header from 'components/Header'

import AppWrapper from './AppWrapper'

import GlobalStyle from 'global-styles'

import { hasUserToken, redirectToLoginPage } from 'utils/auth'
import { loadUserInfo } from 'pages/LoginPage/actions'

const App = () => {
	const dispatch = useDispatch()
	const history = useHistory()
	const isLoginPage = history.location.pathname === '/login'
	const isSignupPage = history.location.pathname === '/signup'
	const [loadUserData, setLoadUserData] = useState(!isLoginPage)

	const { loggedIn, redirectToLogin } =  useSelector(state => state.user)
	
	useEffect(() => {
		if(isLoginPage || isSignupPage) {
			setLoadUserData(false)
			return
		}

		if(hasUserToken()) {
			dispatch(loadUserInfo())
			return
		}
		setLoadUserData(false)
		redirectToLoginPage()
	}, [])

	useEffect(() => {
		if(redirectToLogin) {
			setLoadUserData(false)
			redirectToLoginPage()
		}
		if(loggedIn) {
			setLoadUserData(false)
		}
	}, [loggedIn, redirectToLogin])

	return (
		<AppWrapper>
			<Helmet
				titleTemplate='%s - Todo List App'
				defaultTitle='React Todo List app'
			>
				<meta name='description' content='A React Todo List application' />
			</Helmet>
			<Router>
				<>
					<Header />
					{loadUserData
					? <Loading />
					: <>
						<Switch>
							<Route exact path='/login' component={LoginPage} />
							<Route exact path='/signup' component={SignupPage} />
							<Route exact path='/todos' component={TodosPage} />
							<Route exact path='/' component={LoginPage} />
						</Switch>
						</>
					}
					<GlobalStyle />
				</>
			</Router>
		</AppWrapper>
	)
}

export default App
