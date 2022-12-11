class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data._link;

    this._cardSelector = cardSelector;
  }

  handleEscUp() {
    this._element.preventDefault();
    isEscEvent(this.closeModal);
  }

  isEscEvent(action) {
    if (this._element.key === "Escape") {
      action(this.openModal);
    }
  }

  handleOverlayClose() {
    if (this._element.classList.contains("modal")) {
      closeModal();
    }
  }

  // Open Modal
  openModal() {
    this._element.classList.add("modal_opened");
    this._element.addEventListener("mousedown", handleOverlayClose);
    document.addEventListener("keyup", handleEscUp);
  }

  //Close Modal
  closeModal() {
    this._element.classList.remove("modal_opened");
    this._element.removeEventListener("mousedown", handleOverlayClose);
    document.removeEventListener("keyup", handleEscUp);
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
      .addEventListener("click", _handleLikeIcon());
    // Delete Button Listener
    this._element
      .querySelector(".card__deletebtn")
      .addEventListener("click", _handleDeleteBtn());
    //Image Click Popup Listener
    this._element
      .querySelector(".card__image")
      .addEventListener("click", _handleImagePopup());
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector("#card-template")
      .cloneNode(true);

    return cardElement;
  }
  // Creating / Getting Cards
  getView() {
    this._element = this._getTemplate();
    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__name").textContent = this._name;
    this._element.querySelector(".card__image").alt = this._name;
  }
}

export default Card;
