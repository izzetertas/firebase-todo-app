import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import LoginPage from 'pages/LoginPage'
import TodosPage from 'pages/TodosPage'

import signup from 'pages/signup'
import home from 'pages/home'
import Footer from 'components/Footer'
import AppWrapper from './AppWrapper'

import GlobalStyle from '../../global-styles'

import { hasUserToken } from 'utils/auth'
import { loadUserInfo } from 'pages/LoginPage/actions'

const App = () => {
	const dispatch = useDispatch()
	const history = useHistory()
	const { loggedIn } =  useSelector(state => state.user)
	useEffect(() => {
		if(!hasUserToken()) {
			history.push('/login')
		}
		if(!loggedIn) {
			dispatch(loadUserInfo())
		}
	}, [])

	return (
		<AppWrapper>
			<Helmet
				titleTemplate="%s - Todo List App"
				defaultTitle="React Todo List app"
			>
				<meta name="description" content="A React Todo List application" />
			</Helmet>
			<Router>
				<div>
					<Switch>
						<Route exact path="/login" component={LoginPage} />
						<Route exact path="/signup" component={signup} />
						<Route exact path="/todos" component={TodosPage} />
						<Route exact path="/" component={home} />
					</Switch>
					<Footer />
					<GlobalStyle />
				</div>
			</Router>
		</AppWrapper>
	)
}

export default App
