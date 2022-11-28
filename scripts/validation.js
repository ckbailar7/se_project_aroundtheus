// Enable Validation by calling enableValidation()
// Pass all the setting on call

function showInputError(formEl, inputEl, options) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(options.inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classList.add(options.errorClass);
}

function hideInputError(formEl, inputEl, options) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(options.inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(options.errorClass);
}

function checkInputValidity(formEl, inputEl, options) {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, options);
  } else {
    hideInputError(formEl, inputEl, options);
  }
}

const checkFormValidity = (inputs) =>
  inputs.every((input) => input.validity.valid);

function toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
  const isValid = checkFormValidity(inputEls);
  if (!isValid) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
  } else {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
  }
}

function setEventListeners(formEl, options) {
  const { inputSelector } = options;
  const inputEls = [...formEl.querySelectorAll(inputSelector)];
  const submitButton = formEl.querySelector(".modal__container-button");
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      checkInputValidity(formEl, inputEl, options);
      toggleButtonState(inputEls, submitButton, options);
    });
  });
}

function enableValidation(options) {
  const formEls = [...document.querySelectorAll(options.formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    setEventListeners(formEl, options);
    // Look for all the inputs inside of the form
    // Loop through all the inputs to see if tey are valid
    // If inputs are not Valid:
    // Get validation Message
    // Add Error class to Input
    // Display Error Message
    // Disable Submit Button
    // (else): If all inputs are valid
    // Enable Sublit Button
    // Reset Error Messages
  });
}

const config = {
  formSelector: ".modal__container",
  inputSelector: ".modal__container-input",
  submitButtonSelector: ".modal__container-button",
  inactiveButtonClass: "modal__container-button_disabled",
  inputErrorClass: ".modal__container-input_error",
  errorClass: "modal__container-input_error_visible",
};

enableValidation(config);
