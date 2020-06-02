import { defineMessages } from 'react-intl'

export const scope = 'todoApp.pages.SignupPage'

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Join us',
  },
  email: {
    id: `${scope}.email`,
    defaultMessage: 'Email *',
  },
  password: {
    id: `${scope}.password`,
    defaultMessage: 'Password *',
  },
  firstName: {
    id: `${scope}.firstName`,
    defaultMessage: 'Name *',
  },
  lastName: {
    id: `${scope}.lastName`,
    defaultMessage: 'Last name *',
  },
  buttonText: {
    id: `${scope}.button.text`,
    defaultMessage: 'Sign up',
  },
  buttonLoading: {
    id: `${scope}.button.loading`,
    defaultMessage: 'Loading...',
  },
  navLink: {
    id: `${scope}.navLink`,
    defaultMessage: `Do you have an account? Sign in`,
  }
})
