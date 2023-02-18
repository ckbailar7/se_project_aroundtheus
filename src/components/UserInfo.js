import "../utils/constants.js";

export default class UserInfo {
  constructor(profileNameSelector, profileDescriptionSelector, avatarSelector) {
    this._profileNameElement = document.querySelector(profileNameSelector);
    this._profileDescriptionSelector = document.querySelector(
      profileDescriptionSelector
    );
    this._avatarSelector = document.querySelector(avatarSelector);
  }

  setUserInfo(userName, description) {
    this._profileNameElement.textContent = userName;
    this._profileDescriptionSelector.textContent = description;
  }

  setAvatarInfo(data) {
    this._avatarSelector.src = data;
  }

  getUserInfo() {
    return {
      name: this._profileNameElement.textContent,
      description: this._profileDescriptionSelector.textContent,
      avatar: this._avatarSelector.textContent,
    };
  }
}
