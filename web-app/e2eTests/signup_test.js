
Feature('Journey:signup')

const shortid = require('shortid')
const emailSuffix = shortid.generate() // Math.floor(Math.random() * 1000)

const apiBaseUrl = 'https://us-central1-xyz-todo.cloudfunctions.net/api'

BeforeSuite( async (I) => {
  console.log('BeforeSuite starting');
  // await I.startMocking(); // optionally
  // // return an empty successful response 
  // // I.mockRequest('POST', '/api/signup', 200);
  // // // mock users api
  // I.mockServer(server => {
  //   // server.any(`${apiBaseUrl}/*`).passthrough(false);
  //   // server
  //   //   .get(`${apiBaseUrl}/signup*`)
  //   //   .intercept((req, res) => { res.status(200).json({});
  //   // });
  // })
});

// AfterSuite((I) => {
//   I.stopMocking()
// });

Before((I) => { // or Background
  I.amOnPage('/signup')
});


const { I, SignupPage } = inject()


Scenario('fill the signup form and submit', async () => {
  // await I.startMocking()
  SignupPage.fillFormAndSubmit()
  I.waitForNavigation("/login")
  I.see('Sign in')
  I.seeInCurrentUrl('/login')
  pause() 
  // I.stopMocking()
})

// Scenario('Go to signup screen => register with the same user', async (I) => {
//   I.amOnPage('/signup');
//   I.fillField('firstName', 'Izzet')
//   I.fillField('lastName', 'Ertas')
//   I.fillField('email', `test@gmail.com`)
//   I.fillField('password', '123456')
//   await I.click('Sign up')

//   I.wait(2)
//   I.see('this username is already taken')
//   I.seeInCurrentUrl('/signup')
// })