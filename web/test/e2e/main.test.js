const legacyAppConsts = require('../../js/utils/constant');
const {
  host,
  siteTitle,
  validColor,
  invalidColor,
  submit,
  login,
  password1,
  password2,
  body,
  validLogin,
  invalidLogin,
  validPassword,
  invalidPassword
} = legacyAppConsts;

beforeEach(browser => {
  browser
  .url(host)
  .waitForElementVisible(body)
});

describe('Initial tests', () => {
  test('Title is right', browser => {
    browser
    .verify.titleContains(siteTitle)
      .end();
  });

  test('All elements are exist', browser => {
    browser
    .assert.visible(submit)
    .assert.visible(login)
    .assert.visible(password1)
    .assert.visible(password2)
      .end();
  });
});

describe('Test login', () => {
  test('Test corerct login', browser => {
    browser
    .setValue(login, validLogin)
    .click(body)
    .assert.attributeEquals(login, 'style', validColor)
      .end();
  });

  test('Test incorerct login', browser => {
    browser
    .setValue(login, invalidLogin)
    .click(body)
    .assert.attributeEquals(login, 'style', invalidColor)
      .end();
  });
});

describe('Test password', () => {
  test('Test corerct passwords', browser => {
    browser
    .setValue(password1, validPassword)
    .setValue(password2, validPassword)
    .click(body)
    .assert.attributeEquals(password2, 'style', validColor)
      .end();
  });

  test('Test incorerct passwords', browser => {
    browser
    .setValue(password1, validPassword)
    .setValue(password2, invalidPassword)
    .click(body)
    .assert.attributeEquals(password2, 'style', invalidColor)
      .end();
  });
});

describe('Test submit', () => {
  test('Submit is disabled with all empty fields', browser => {
    browser
    .assert.attributeEquals(submit, 'disabled', 'true')
      .end();
  });

  test('Submit is enabled with all valid fields', browser => {
    browser
    .setValue(login, validLogin)
    .setValue(password1, validPassword)
    .setValue(password2, validPassword)
    .setValue(login, '')
    .assert.attributeEquals(submit, 'disabled', null)
      .end();
  });

  test('Check alert existing', browser => {
    browser
    .setValue(login, validLogin)
    .setValue(password1, validPassword)
    .setValue(password2, validPassword)
    .setValue(login, '')
    .waitForElementVisible(submit, 2000)
    .click(submit)
    .pause(1000)
    .acceptAlert()
      .end();
  });
});
