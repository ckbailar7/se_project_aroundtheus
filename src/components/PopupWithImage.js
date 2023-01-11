import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._cardPreviewImage =
      this._popupElement.querySelector("#image__preview");
    this.cardPreviewTitle = this._popupElement.querySelector("modal__caption");
  }

  openModal({ link, name }) {
    this._cardPreviewImage.src = link;
    this._cardPreviewImage.alt = name;
    this._cardPreviewTitle.textContent = name;

    super.openModal();
  }
}
