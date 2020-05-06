const app = {
  init() {
    const submit = $('#submit');
    const login = $('#login');
    const password1 = $('#password1');
    const password2 = $('#password2');
    const validColor = '#0c0';
    const invalidColor = '#c00';
    const accountCreatedMessage = 'Account Created Successfully';

    const unlockButton = () => {
      if (password1.valid && login.valid) {
        submit.removeAttr('disabled');
      } else {
        submit.attr('disabled', 'disabled');
      }
    };

    const toggleElemStyle = (elem, isValid, elemForValid) => {
      if (isValid) {
        elem.css({'border-color': validColor});
        elemForValid ? elemForValid.valid = true : elem.valid = true;
      } else {
        elem.css({'border-color': invalidColor});
        elem.valid = false;
      }
    };

    login.change(() => {
      $.get('/checkLogin/' + login.val(), response => {
        const isValid = response.status.includes('alright');
        toggleElemStyle(login, isValid);
        unlockButton();
      });
    });

    password2.change(() => {
      const isValid = password1.val() === password2.val();
      toggleElemStyle(password2, isValid, password1);
      unlockButton();
    });

    submit.click(e => {
      e.preventDefault();
      $.post('/createAccount', $('#create-account-form').serialize(), response => {
        if (response.status === 'ok') {
          alert(accountCreatedMessage);
        }
      });
    });
  }
};

$().ready(app.init());

export default app;
