
Feature('Journey:signup')

const shortid = require('shortid')
const emailSuffix = shortid.generate() // Math.floor(Math.random() * 1000)

// BeforeSuite((I) => {
//   I.startMocking()
// });

// AfterSuite((I) => {
//   I.stopMocking()
// });

Scenario('Go to signup screen => fill the form => redirect to login', async (I) => {
  I.startMocking(); // optionally
  // return an empty successful response 
  // I.mockRequest('POST', '/api/signup', 200);
  // mock users api
  // I.mockServer(server => {
  //   server
  //     .get('https://server.com/api/signup*')
  //     .intercept((req, res) => { res.status(200).json({});
  //   });
  // })

  I.amOnPage('/signup');
  I.fillField('firstName', 'Izzet')
  I.fillField('lastName', 'Ertas')
  I.fillField('email', `test${emailSuffix}@gmail.com`)
  I.fillField('password', '123456')
  await I.click('Sign up')

  I.wait(2)
  I.see('Sign in')
  // I.stopMocking()
})

Scenario('Go to signup screen => register with the same user', async (I) => {
  I.amOnPage('/signup');
  I.fillField('firstName', 'Izzet')
  I.fillField('lastName', 'Ertas')
  I.fillField('email', `test${emailSuffix}@gmail.com`)
  I.fillField('password', '123456')
  await I.click('Sign up')

  I.wait(2)
  I.see('this username is already taken')
  I.seeInCurrentUrl('/signup')
})