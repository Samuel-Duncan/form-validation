const form = document.querySelector('form');
const email = document.getElementById('email');
const emailError = document.getElementById('emailError');
const zip = document.getElementById('zip');
const zipError = document.getElementById('zipError');
const phone = document.getElementById('phone');
const phoneError = document.getElementById('phoneError');
const password = document.getElementById('password');
const passwordError = document.getElementById('passwordError');
const confirmPassword = document.getElementById('confirmPassword');
const confirmPasswordError = document.getElementById('confirmPasswordError');

function showZIPError() {
  if (zip.validity.valueMissing) {
    zipError.textContent = 'You need to enter a ZIP code.';
  } else if (zip.validity.patternMismatch) {
    zipError.textContent = 'Entered value needs to be a ZIP code.';
  } else if (zip.validity.tooShort) {
    zipError.textContent = `ZIP code should be at least ${zip.minLength} characters you entered ${zip.value.length}.`;
  }

  zipError.className = 'error active';
}

function showEmailError() {
  if (email.validity.valueMissing) {
    emailError.textContent = 'You need to enter an email address.';
  } else if (email.validity.typeMismatch) {
    emailError.textContent = 'Entered value needs to be an email address.';
  } else if (email.validity.tooShort) {
    emailError.textContent = `Email should be at least ${email.minLength} characters you entered ${email.value.length}.`;
  }

  emailError.className = 'error active';
}

function showPhoneError() {
  if (phone.validity.valueMissing) {
    phoneError.textContent = 'You need to enter a phone number.';
  } else if (phone.validity.patternMismatch) {
    phoneError.textContent = 'Phone number should be a 10-digit number.';
  } else if (phone.validity.tooShort) {
    phoneError.textContent = `Phone number should be at least ${phone.minLength} characters you entered ${phone.value.length}.`;
  }
}

function showPasswordError() {
  if (password.validity.valueMissing) {
    passwordError.textContent = 'You need to enter a password.';
  } else if (password.validity.patternMismatch) {
    passwordError.textContent = 'Password must contain at least 8 characters, one capital letter, and one special character.';
  } else if (password.validity.tooShort) {
    passwordError.textContent = `Password should be at least ${password.minLength} characters you entered ${password.value.length}`;
  }

  passwordError.className = 'error active';
}

function showConfirmPasswordError() {
  if (confirmPassword.validity.valueMissing) {
    confirmPasswordError.textContent = 'Please confirm your password.';
  } else if (password.value !== confirmPassword.value) {
    confirmPasswordError.textContent = 'Passwords do not match.';
  }

  confirmPasswordError.className = 'error active';
}

function validateInput(input, error, validationFunction) {
  if (input.validity.valid) {
    error.textContent = '';
    error.className = 'error';
  } else {
    validationFunction();
  }
}

zip.addEventListener('input', () => {
  validateInput(zip, zipError, showZIPError);
});

email.addEventListener('input', () => {
  validateInput(email, emailError, showEmailError);
});

phone.addEventListener('input', () => {
  validateInput(phone, phoneError, showPhoneError);
});

password.addEventListener('input', () => {
  validateInput(password, passwordError, showPasswordError);
});

confirmPassword.addEventListener('input', () => {
  if (confirmPassword.validity.valid && password.value === confirmPassword.value) {
    confirmPasswordError.textContent = '';
    confirmPasswordError.className = 'error';
  } else {
    showConfirmPasswordError();
  }
});

function finalValidityCheck(input, errorFunction) {
  if (!input.validity.valid) {
    errorFunction();
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const zipValid = finalValidityCheck(zip, showZIPError);
  const emailValid = finalValidityCheck(email, showEmailError);
  const phoneValid = finalValidityCheck(phone, showPhoneError);
  const passwordValid = finalValidityCheck(password, showPasswordError);

  if (!zipValid || !emailValid || !phoneValid || !passwordValid) {
    return;
  }

  if (password.value !== confirmPassword.value) {
    showConfirmPasswordError();
    return;
  }

  form.reset();
  alert('High Five!');
});
