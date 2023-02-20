import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._modalForm = this._popupElement.querySelector(".modal__form");
    this._modalFormInputs = this._popupElement.querySelectorAll(
      ".modal__container-input"
    );
    this._modalFormButton = this._popupElement.querySelector(
      "modal__container-button"
    );
    this._submitButton = this._popupElement.querySelector("#submit-button");
  }

  _getInputValues() {
    const inputValues = {};

    this._modalFormInputs.forEach(
      (input) => (inputValues[input.name] = input.value)
    );
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._modalForm.addEventListener("submit", this._handleSubmit);
  }

  _handleSubmit = (evt) => {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
  };

  closeModal() {
    super.closeModal();
    this._modalForm.reset();
  }

  isLoading() {
    // this._modalFormButton.textContent = "Saving ...";
    this._submitButton.textContent = "Saving...";
  }
  isFinishedLoading() {
    setTimeout(() => {
      console.log("Timeout Functional");
    }, 5000);
    this._submitButton.textContent = "Create";
  }

  isFinishedLoadingForEdit() {
    setTimeout(() => {}, 5000);
    this._submitButton.textContent = "Save";
  }

  isFinishedLoadingForDelete() {
    setTimeout(() => {}, 5000);
    this._submitButton.textContent = "Yes";
  }
}
