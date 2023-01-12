import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this.cardPreviewTitle = this._popupElement.querySelector("modal__caption");
  }

  openModal({ link, name }) {
    this._popupElement.querySelector("#popup__image").src = link;
    this._popupElement.querySelector("#popup__image").alt = name;
    this._popupElement.querySelector(".modal__caption").textContent = name;

    super.openModal();
  }
}
