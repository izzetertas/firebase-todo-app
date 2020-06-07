Feature('Journey:signin @signin')

Scenario('fill the signup form and submit', async (I, LoginPage, MockServer) => {
  MockServer.signin()

  LoginPage.login()

  I.seeInCurrentUrl('/todos')
  I.see('SUDE Ertas Todos Page')
  
  I.wait(2)
})