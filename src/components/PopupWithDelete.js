import Popup from "./Popup.js";
export default class PopupwithDelete extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._delBTN = this._popupElement.querySelector(".modal__container-button");
  }
  // for line 84 index.js
  setSubmitAction(action) {
    this._handleDeleteSubmit = action;
  }
  setEventListeners() {
    super.setEventListeners();
    this._delBTN.addEventListener("click", () => {
      this._delBTN.textContent = "Saving ...";
      this._handleDeleteSubmit();
      this.closeModal();
      this._delBTN.textContent = "yes";
    });
  }
}
