describe('edit page', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
    await element(by.id('01039419')).tap();
    await element(by.text('Edit')).tap();
    await expect(element(by.id('01039419'))).toBeNotVisible();
  });

  it('should show buttons', async () => {
    await expect(element(by.text('Add'))).toBeVisible();
    await expect(element(by.text('Cancel'))).toBeVisible();
    await expect(element(by.text('Save'))).toBeVisible();
  });

  it('should show default replies', async () => {
    await expect(element(by.text('Greeting'))).toBeVisible();
    await expect(element(by.text('Hi there, I\'m here to chat if you have any questions.'))).toBeVisible();
    await expect(element(by.text('Bye'))).toBeVisible();
    await expect(element(by.text('Thank you for dropping by.'))).toBeVisible();
    await expect(element(by.text('Getting leads'))).toBeVisible();
    await expect(element(by.text('We have 30% sale this week, leave me your email and I\'ll get back to you with the details.'))).toBeVisible();
  });

  it('should remove deleted reply after save', async () => {
    await element(by.id('delete')).atIndex(2).tap();
    await expect(element(by.text('Greeting'))).toBeNotVisible();
    await expect(element(by.text('Hi there, I\'m here to chat if you have any questions.'))).toBeNotVisible();
    await element(by.text('Save')).tap();
    await element(by.text('Message')).tap(); // this is a bug
    await element(by.id('01039419')).tap();
    await expect(element(by.text('Greeting'))).toBeNotVisible();
    await expect(element(by.text('Hi there, I\'m here to chat if you have any questions.'))).toBeNotVisible();
  });

})
