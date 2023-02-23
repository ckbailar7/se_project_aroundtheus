import Popup from "./Popup.js";
export default class PopupwithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._delBTN = this._popupElement.querySelector(".modal__container-button");
    this._deleteYesButton = this._popupElement.querySelector("#delete-yesbtn");
    this._submitBtnText = this._deleteYesButton.textContent;
  }
  // for line 84 index.js
  setSubmitAction(action) {
    this._handleDeleteSubmit = action;
  }
  setEventListeners() {
    super.setEventListeners();
    this._delBTN.addEventListener("click", () => {
      this._handleDeleteSubmit();
    });
  }

  isLoading() {
    this._deleteYesButton.textContent = "Deleting ...";
  }

  isFinishedLoading() {
    this._deleteYesButton.textContent = "Yes";
  }

  renderLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this._deleteYesButton.textContent = loadingText;
    } else {
      this._deleteYesButton.textContent = this._submitBtnText;
    }
  }
}
