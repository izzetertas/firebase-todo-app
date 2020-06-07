const I = actor()

module.exports = () => (
  {
    fillFormAndSubmit() {
      I.fillField('firstName', 'Izzet')
      I.fillField('lastName', 'Ertas')
      I.fillField('email', `test1234@gmail.com`)
      I.fillField('password', '123456')
      I.click('Sign up')
    } 
  }
)
