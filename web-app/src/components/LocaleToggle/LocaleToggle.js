import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Toggle from 'components/Toggle'
import Wrapper from './Wrapper'
import messages from './messages'
import { appLocales } from '../../i18n'
import { changeLocale } from 'components/LanguageProvider/actions'

import { setUserLanguage }  from 'utils/languageHelper'
const LocaleToggle = () => {
  const dispatch = useDispatch()
  const locale = useSelector(state => state.language.locale)

  const onLocaleToggle = (e) => {
    dispatch(changeLocale(e.target.value))
    setUserLanguage(e.target.value)
  }

  return (
    <Wrapper>
      <Toggle
        value={locale}
        values={appLocales}
        messages={messages}
        onToggle={onLocaleToggle}
      />
    </Wrapper>
  )
}

export default LocaleToggle
