Feature('Journey:signup @signup')

const constants = require('../constants')

Scenario('fill the signup form and submit', async (I, MockServer) => {

  MockServer.signup()

  I.amOnPage('/signup')

  I.fillField('firstName', 'Izzet')
  I.fillField('lastName', 'Ertas')
  I.fillField('email', `test@gmail.com`)
  I.fillField('password', '123456')
  I.click('Sign up')

  I.see('Sign in')
  I.seeInCurrentUrl('/login')

  I.wait(2)
})
