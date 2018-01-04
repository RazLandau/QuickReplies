
describe('main page', () => {
  let driver;
  beforeEach(async () => {
    await device.reloadReactNative();
    driver = MainPageDriver();
  });

  it('should have QuickReplies logo', async () => {
    await expect(element(by.id('01039419'))).toBeVisible();
  });

  it('should show default keyboard screen after tap', async () => {
    // await element(by.id('01039419')).tap();
    // await expect(element(by.text('Greeting'))).toBeVisible();
    // await expect(element(by.text('Bye'))).toBeVisible();
    // await expect(element(by.text('Getting leads'))).toBeVisible();
    // await expect(element(by.text('Edit'))).toBeVisible();
    driver.when.openKeyboard();

    expect(driver.get.buttonsByText('Greetings')).toBeVisible();
  });

  it('should show default messeges after tap', async () => {
    await element(by.id('01039419')).tap();
    await element(by.text('Greeting')).tap();
    await expect(element(by.text('Hi there, I\'m here to chat if you have any questions.'))).toBeVisible();
    await element(by.text('Bye')).tap();
    await expect(element(by.text('Thank you for dropping by.'))).toBeVisible();
    await element(by.text('Getting leads')).tap();
    await expect(element(by.text('We have 30% sale this week, leave me your email and I\'ll get back to you with the details.'))).toBeVisible();
  });
})

const MainPageDriver = () => {
  return {
    get: {
      buttonsByText: (text) => element(by.text(text)
    },
    when: {
      openKeyboard: async () => await element(by.id('01039419')).tap()
    }
  }
}
