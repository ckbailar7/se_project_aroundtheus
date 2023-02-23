import Popup from "./Popup.js";
export default class PopupwithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._delBTN = this._popupElement.querySelector(".modal__container-button");
    this._deleteYesButton = this._popupElement.querySelector("#delete-yesbtn");
  }
  // for line 84 index.js
  setSubmitAction(action) {
    this._handleDeleteSubmit = action;
  }
  setEventListeners() {
    super.setEventListeners();
    this._delBTN.addEventListener("click", () => {
      this._handleDeleteSubmit();
      //this.closeModal();
    });
  }

  // closeModal() {
  //   this._popupElement.classList.remove("modal_opened");
  //   document.removeEventListener("keyup", this._handleEscClose);
  // }

  isLoading() {
    this._deleteYesButton.textContent = "Deleting ...";
  }

  isFinishedLoading() {
    this._deleteYesButton.textContent = "Yes";
  }
}
