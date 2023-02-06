import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, handleDeleteSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._handleDeleteSubmit = handleDeleteSubmit;
    this._modalForm = this._popupElement.querySelector(".modal__form");
    this._modalFormInputs = this._popupElement.querySelectorAll(
      ".modal__container-input"
    );
    this._modalFormButton = this._popupElement.querySelector(
      "modal__container-button"
    );
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

  setEventListenersDEL() {
    super.setEventListenersDEL();
    this._modalForm.addEventListener("submit", this._handleDeleteSubmit);
  }

  closeModal() {
    super.closeModal();
    this._modalForm.reset();
  }

  closeDELModal() {
    super.closeModal();
  }
}
