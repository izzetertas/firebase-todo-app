/*
 * Footer Messages
 *
 * This contains all the text for the Footer component.
 */
import { defineMessages } from 'react-intl'

export const scope = 'todoApp.pages.TodosPage'

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: '{firstName} {lastName} Todos Page',
  },
})
