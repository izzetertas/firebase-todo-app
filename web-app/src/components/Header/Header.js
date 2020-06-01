import React from 'react'
import { FormattedMessage } from 'react-intl'

import LocaleToggle from 'components/LocaleToggle'

import NavBar from './NavBar'
import HeaderLink from './HeaderLink'
import messages from './messages'

import { removeUserToken, redirectToLoginPage } from 'utils/auth'
import { useSelector } from 'react-redux'

function Header() {
  const  { loggedIn } =  useSelector(state => state.user)

  const handleLogoutClick = () => {
    removeUserToken()
    redirectToLoginPage()
  }

  return (
    <div>
      <NavBar>
        {loggedIn &&
          <HeaderLink onClick={handleLogoutClick}>
            <FormattedMessage {...messages.logout} />
          </HeaderLink>
        }
        <LocaleToggle />
      </NavBar>
    </div>
  )
}

export default Header
