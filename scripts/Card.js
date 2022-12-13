import { openModal, imagePreview } from "./utils.js";

class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;

    this._cardSelector = cardSelector;
  }

  // Handlers
  _handleLikeIcon() {
    this._element
      .querySelector(".card__likebtn")
      .classList.toggle("card__likebtn-change");
  }
  _handleDeleteBtn() {
    this._element.remove();
  }
  _handleImagePopup() {
    document
      .querySelector("#image__preview")
      .querySelector(".modal__image").src = this._link;
    document
      .querySelector("#image__preview")
      .querySelector(".modal__image").alt = this._name;
    document
      .querySelector("#image__preview")
      .querySelector(".modal__caption").textContent = this._name;
    openModal(imagePreview);
  }

  // Setting Event Listeners
  _setEventListeners() {
    // Like Btn Listener
    this._element
      .querySelector(".card__likebtn")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });
    // Delete Button Listener
    this._element
      .querySelector(".card__deletebtn")
      .addEventListener("click", () => {
        this._handleDeleteBtn();
      });
    //Image Click Popup Listener
    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImagePopup();
      });
  }

  _getTemplate() {
    const cardElement = document
      .querySelector("#card-template")
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }
  // Creating / Getting Cards
  getView() {
    this._element = this._getTemplate();
    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__name").textContent = this._name;
    this._element.querySelector(".card__image").alt = this._name;

    // console.log(this._name);
    this._setEventListeners();

    return this._element;
  }
}

export default Card;
