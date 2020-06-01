import { defineMessages } from 'react-intl'

export const scope = 'todoApp.components.LocaleToggle'

export default defineMessages({
  en: {
    id: `${scope}.en`,
    defaultMessage: 'English',
  },
  tr: {
    id: `${scope}.tr`,
    defaultMessage: 'Turkish',
  },
})
