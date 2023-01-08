export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeButton = this._popupElement.querySelector("modal__button");
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  openModal() {
    this._popupElement.classList.add("modal__opened");
    document.addEventListener("keyup", this._handleEscClose);
  }

  closeModal() {
    this._popupElement.classList.remove("modal__opened");
    document.removeEventListener("keyup", this._handleEscClose);
  }

  _handleOverlayClose(event) {
    if (event.target.classList.contains("modal")) {
      this.closeModal();
    }
  }

  _handleEscClose() {
    if (evt.key === "Escape") {
      this.closeModal();
    }
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", this.closeModal.bind(this));
    this._popupElement.addEventListener(
      "mousedown",
      this._handleOverlayClose.bind(this)
    );
  }
}
