/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 */
const addLocaleData = require('react-intl').addLocaleData //eslint-disable-line
const enLocaleData = require('react-intl/locale-data/en')
const trLocaleData = require('react-intl/locale-data/tr')

const enTranslationMessages = require('./translations/en.json')
const trTranslationMessages = require('./translations/tr.json')

addLocaleData(enLocaleData)
addLocaleData(trLocaleData)

export const DEFAULT_LOCALE = 'en'

export const appLocales = [
  'en',
  'tr',
]

export const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages =
    locale !== DEFAULT_LOCALE
      ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
      : {}
  const flattenFormattedMessages = (formattedMessages, key) => {
    const formattedMessage =
      !messages[key] && locale !== DEFAULT_LOCALE
        ? defaultFormattedMessages[key]
        : messages[key]
    return Object.assign(formattedMessages, { [key]: formattedMessage })
  }
  return Object.keys(messages).reduce(flattenFormattedMessages, {})
}

export const translationMessages = {
  en: formatTranslationMessages('en', enTranslationMessages),
  tr: formatTranslationMessages('tr', trTranslationMessages),
}
