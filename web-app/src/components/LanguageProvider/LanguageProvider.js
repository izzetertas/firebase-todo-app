import React from 'react'
import PropTypes from 'prop-types'

import { IntlProvider } from 'react-intl'
import { useSelector } from 'react-redux'

const LanguageProvider = (props) => {
  const locale =  useSelector(state => state.language.locale)

  return (
    <IntlProvider
      locale={locale}
      key={locale}
      messages={props.messages[locale]}
    >
      {React.Children.only(props.children)}
    </IntlProvider>
  )
}

LanguageProvider.propTypes = {
  messages: PropTypes.object,
  children: PropTypes.element.isRequired,
}


export default LanguageProvider

