import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import LoginPage from 'pages/LoginPage'
import TodosPage from 'pages/TodosPage'
import SignupPage from 'pages/SignupPage'

import Loading from 'components/Loading'
import Header from 'components/Header'
import PrivateRoute from 'components/PrivateRoute'

import AppWrapper from './AppWrapper'

import GlobalStyle from 'global-styles'

import { loadUserInfo } from 'pages/LoginPage/actions'

const App = () => {
	const dispatch = useDispatch()
	const history = useHistory()
	
	const { loading } =  useSelector(state => state.global)
	const { loggedIn } =  useSelector(state => state.user)
	
	useEffect(() => {
		dispatch(loadUserInfo(history))
	}, [])

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
					{loading
					? <Loading />
					: <>
						<Switch>
							<Route exact path='/login' component={LoginPage} />
							<Route exact path='/signup' component={SignupPage} />
							<PrivateRoute
								isAuthenticated={loggedIn}
								exact
								path='/todos'
								component={TodosPage}
							/>
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
