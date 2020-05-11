import app from '../../js/main';

jest
  .dontMock('fs')
  .dontMock('jquery');

const $ = require('jquery');
const html = require('fs').readFileSync('./index.html').toString();
const validColor = '#0c0';
const invalidColor = '#c00';
const getSuccessStatus = 'Everything alright, go on!';
const getFailStatus = 'Nope, this login is already taken :(';
const postSuccessStatus = 'ok';
const accountCreatedMessage = 'Account Created Successfully';
let login;
let password1;
let password2;
let submit;

beforeEach(() => {
  document.documentElement.innerHTML = html;
  login = $('#login');
  password1 = $('#password1');
  password2 = $('#password2');
  submit = ($('#submit'));
});

describe('Test login', () => {
  test('Put valid login', () => {
    $.get = jest.spyOn(jQuery, "ajax").mockImplementation(function(url, callback) {
      const response = { status: getSuccessStatus };

      callback(response);
    });

    app.init();

    login.trigger('change');
    expect(login.css('border-color')).toBe(validColor);
  });

  test('Put invalid login', () => {
    $.get = jest.spyOn(jQuery, "ajax").mockImplementation(function(url, callback) {
      const response = { status: getFailStatus };

      callback(response);
    });

    app.init();

    login.trigger('change');
    expect(login.css('border-color')).toBe(invalidColor);
  });
});

describe('Test password', () => {
  test('Both passwords are the same', () => {
    password1.val('test password');
    password2.val('test password');

    app.init();

    password2.trigger('change');

    expect(password2.css('border-color')).toBe(validColor);
  });

  test('Passwords are different', () => {
    password1.val('test password');
    password2.val('test password2');

    app.init();

    password2.trigger('change');

    expect(password2.css('border-color')).toBe(invalidColor);
  });
});

describe('Test submit', () => {
  test('Disable submit button with empty fields', () => {
    expect(submit.attr('disabled')).toBe('disabled');
  });

  test('Submit with valid fields', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    $.get = jest.spyOn(jQuery, "ajax").mockImplementation(function(url, callback) {
      const response = { status: getSuccessStatus };

      callback(response);
    });

    app.init();

    login.trigger('change');
    password2.trigger('change');

    $.post = jest.spyOn(jQuery, "ajax").mockImplementation(function(url, serializeFn, callback) {
      const response = { status: postSuccessStatus };

      callback(response);
    });

    submit.click();

    expect(submit.attr('disabled')).not.toBe('disabled');
    expect(window.alert).toBeCalledWith(accountCreatedMessage);
  });

  test('Submit with invalid fields', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    $.get = jest.spyOn(jQuery, "ajax").mockImplementation(function(url, callback) {
      const response = { status: getSuccessStatus };

      callback(response);
    });

    password1.val('test password');
    password2.val('test password2');

    app.init();

    login.trigger('change');
    password2.trigger('change');

    $.post = jest.spyOn(jQuery, "ajax").mockImplementation(function(url, serializeFn, callback) {
      const response = { status: postSuccessStatus };

      callback(response);
    });

    submit.click();

    expect(submit.attr('disabled')).toBe('disabled');
  });
});
