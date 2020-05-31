import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import LoginPage from 'pages/LoginPage'
import signup from 'pages/signup'
import home from 'pages/home'
import Footer from 'components/Footer'
import AppWrapper from './AppWrapper'

import GlobalStyle from '../../global-styles'

function App() {
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
