Feature('Journey:todos @todos')

Scenario('Add, update, remove todos', async (I, LoginPage, MockServer) => {

  MockServer.todos()

  LoginPage.login()

  I.amOnPage('/todos')
  
  // Add items

  I.fillField('input', `My first todo`)
  await I.click('Add')

  I.see('My first todo')

  I.fillField('input', `My second todo`)
  await I.click('Add')

  I.see('My second todo')

  I.fillField('input', `My third todo`)
  await I.click('Add')

  I.see('My third todo')

  // update an item

  await I.click('My second todo')
  I.seeCheckboxIsChecked({css: 'input[type=checkbox]'})

  I.wait(2)

  await I.click('My second todo')
  I.dontSeeCheckboxIsChecked({css: 'input[type=checkbox]'})
  
  // remove the first item
  I.click('.todo-list-item button')

  I.wait(2)
})
