import React from 'react'
import { FormattedMessage } from 'react-intl'
import { useSelector } from 'react-redux'

import LocaleToggle from 'components/LocaleToggle'

import NavBar from './NavBar'
import HeaderLink from './HeaderLink'
import messages from './messages'

import { removeUserToken, redirectToLoginPage } from 'utils/auth'
import NavBarRight from './NavBarRight'
import NavUserInfo from './NavUserInfo'

function Header() {
  const  { loggedIn, userDetail } =  useSelector(state => state.user)

  const handleLogoutClick = () => {
    removeUserToken()
    redirectToLoginPage()
  }

  return (
    <div>
      <NavBar>
        {userDetail &&
        <NavUserInfo>
            {`${userDetail.firstName} ${userDetail.lastName}`}  
        </NavUserInfo>}
        <NavBarRight>
          <LocaleToggle />
          {loggedIn &&
            <HeaderLink onClick={handleLogoutClick}>
              <FormattedMessage {...messages.logout} />
            </HeaderLink>
          }
        </NavBarRight>
      </NavBar>
    </div>
  )
}

export default Header
