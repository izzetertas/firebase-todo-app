import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, useHistory, Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import LoginPage from 'pages/LoginPage'
import TodosPage from 'pages/TodosPage'

import signup from 'pages/signup'
import Footer from 'components/Footer'

import AppWrapper from './AppWrapper'

import GlobalStyle from '../../global-styles'

import { hasUserToken } from 'utils/auth'
import { loadUserInfo } from 'pages/LoginPage/actions'
import Loading from 'components/Loading'

const App = () => {
	const dispatch = useDispatch()
	const history = useHistory()
	const isLoginPage = history.location.pathname === '/login'
	const [loadUserData, setLoadUserData] = useState(!isLoginPage)

	const { loggedIn } =  useSelector(state => state.user)
	
	useEffect(() => {
		if(isLoginPage) {
			return
		}

		if(hasUserToken()) {
			dispatch(loadUserInfo())
			return
		}
		setLoadUserData(false)
		history.push('/login')
	}, [])

	useEffect(() => {
		if(loggedIn) {
			setLoadUserData(false)
		}
	}, [loggedIn])

	return (
		<AppWrapper>
			<Helmet
				titleTemplate="%s - Todo List App"
				defaultTitle="React Todo List app"
			>
				<meta name="description" content="A React Todo List application" />
			</Helmet>
			<Router>
				<>
					{loadUserData
					? <Loading />
					: <>
						<Switch>
							<Route exact path="/login" component={LoginPage} />
							<Route exact path="/signup" component={signup} />
							<Route exact path="/todos" component={TodosPage} />
							<Route exact path="/" component={LoginPage} />
							{/* <PrivateRoute authed={loggedIn} path='/todos' component={TodosPage} /> */}
						</Switch>
						</>
						
					}
					<Footer />
					<GlobalStyle />
				</>
			</Router>
		</AppWrapper>
	)
}

export default App
