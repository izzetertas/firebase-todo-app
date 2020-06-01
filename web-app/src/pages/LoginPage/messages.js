/*
 * Footer Messages
 *
 * This contains all the text for the Footer component.
 */
import { defineMessages } from 'react-intl'

export const scope = 'todoApp.pages.LoginPage'

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Sign in',
  },
  buttonText: {
    id: `${scope}.button.text`,
    defaultMessage: 'Sign in',
  },
  buttonLoading: {
    id: `${scope}.button.loading`,
    defaultMessage: 'Loading...',
  },
  navLink: {
    id: `${scope}.navLink`,
    defaultMessage: `Don't have an account? Sign Up`,
  }
  
})
