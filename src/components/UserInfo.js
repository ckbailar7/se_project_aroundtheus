import "../utils/constants.js";

export default class UserInfo {
  constructor(profileNameSelector, profileDescriptionSelector, avatarSelector) {
    this._profileNameElement = document.querySelector(profileNameSelector);
    this.profileDescriptionElement = document.querySelector(
      profileDescriptionSelector
    );
    this._avatarElement = document.querySelector(avatarSelector);
  }

  setUserInfo(userName, description) {
    this._profileNameElement.textContent = userName;
    this.profileDescriptionElement.textContent = description;
  }

  setAvatarInfo(data) {
    this._avatarElement.src = data;
  }

  getUserInfo() {
    return {
      name: this._profileNameElement.textContent,
      description: this.profileDescriptionElement.textContent,
      avatar: this._avatarElement.textContent,
    };
  }
}
