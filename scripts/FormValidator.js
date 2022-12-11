class FormValidator {
  constructor(settings, formElement) {
    this._form = formElement;

    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
  }

  showInputError() {
    const errorMessageEl = this._form.querySelector(
      `#${this._inputSelector.id}-error`
    );
    this._inputSelector.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = this._inputSelector.validationMessage;
    errorMessageEl.classList.add(this._inputErrorClass);
  }

  hideInputError() {
    const errorMessageEl = this._form.querySelector(
      `#${this._inputSelector.id}-error`
    );
    this._inputSelector.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._inputErrorClass);
  }

  _checkInputValidity() {
    if (!this._inputSelector.validity.valid) {
      showInputError();
    } else {
      hideInputError();
    }
  }

  _checkFormValidity = () => this._inputSelector.validity.valid;

  _toggleButtonState() {
    const isValid = checkFormValidity(this._inputSelector);
    if (!isValid) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  _setEventListeners() {
    const inputEls = [...this.form.querySelectorAll(this._inputSelector)];
    inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        checkInputValidity();
        toggleButtonState();
      });
    });
    this.form.addEventListener("reset", () => {
      //set Timeout
      setTimeout(() => {
        toggleButtonState();
      }, 0);
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    _setEventListeners();
  }
}

export default FormValidator;
