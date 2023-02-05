class Card {
  constructor({ data, handleCardClick, handleDeleteCardClick }, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._id = data.id;
    this._handleDeleteCardClick = handleDeleteCardClick;

    this._handleCardClick = handleCardClick;
  }

  getId() {
    return this._id;
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
    this._handleCardClick({ name: this._name, link: this._link });
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
        this._handleDeleteCardClick();
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
      .querySelector(this._cardSelector)
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

    this._setEventListeners();

    return this._element;
  }
}

export default Card;
