class FormValidator {
  constructor(settings, formElement) {
    this._form = formElement;

    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
  }

  _showInputError() {
    const errorMessageEl = this._form.querySelector(
      `#${this._inputSelector.id}-error`
    );
    this._inputSelector.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = this._inputSelector.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError() {
    const errorMessageEl = this._form.querySelector(
      `#${this._inputSelector.id}-error`
    );
    this._inputSelector.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._errorClass);
  }

  _checkInputValidity() {
    if (!this._form.querySelector(this._inputSelector).validity.valid) {
      this._showInputError();
    } else {
      this._hideInputError();
    }
  }

  _checkFormValidity = () => this._inputSelector.validity.valid;

  _toggleButtonState() {
    const isValid = checkFormValidity(this._inputSelector);
    if (!isValid) {
      this._submitButtonSelector.classList.add(this._inactiveButtonClass);
      this._submitButtonSelector.disabled = true;
    } else {
      this._submitButtonSelector.classList.remove(this._inactiveButtonClass);
      this._submitButtonSelector.disabled = false;
    }
  }

  _setEventListeners() {
    const inputEls = [...this._form.querySelectorAll(this._inputSelector)];
    inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        this._checkInputValidity();
        this._toggleButtonState();
      });
    });
    this._form.addEventListener("reset", () => {
      //set Timeout
      setTimeout(() => {
        this._toggleButtonState();
      }, 0);
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this._setEventListeners();
  }
}
export default FormValidator;
