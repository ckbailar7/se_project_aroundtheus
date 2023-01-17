import "../utils/constants.js";

export default class UserInfo {
  constructor(profileNameSelector, profileDescriptionSelector) {
    this._profileNameElement = document.querySelector(profileNameSelector);
    this._profileDescriptionSelector = document.querySelector(
      profileDescriptionSelector
    );
  }

  setUserInfo(userName, description) {
    this._profileNameElement.textContent = userName;
    this._profileDescriptionSelector.textContent = description;
  }

  getUserInfo() {
    return {
      name: this._profileNameElement.textContent,
      description: this._profileDescriptionSelector.textContent.value,
    };
  }
}
