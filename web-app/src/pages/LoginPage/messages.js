import { defineMessages } from 'react-intl'

export const scope = 'todoApp.pages.LoginPage'

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Sign in',
  },
  email: {
    id: `${scope}.email`,
    defaultMessage: 'Email *',
  },
  password: {
    id: `${scope}.password`,
    defaultMessage: 'Password *',
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
