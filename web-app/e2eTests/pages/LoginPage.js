const I = actor()

module.exports = () => (
  {
    login() {
      I.amOnPage('/login')
      I.fillField('email', `test@gmail.com`)
      I.fillField('password', '123456')
      I.click('Sign in')
    } 
  }
)
