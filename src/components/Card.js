class Card {
  constructor(
    {
      data,
      handleCardClick,
      handleDeleteCardClick,
      handleLikeClick,
      handleOnLoadDeleteBtnSet,
    },
    cardSelector
  ) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._id = data.id;
    this._likeAmount = data.likes;
    this._handleDeleteCardClick = handleDeleteCardClick;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleOnLoadDeleteBtnSet = handleOnLoadDeleteBtnSet;
  }

  setLikeCounter(res) {
    this._likeCounter.textContent = res.likes.length;
  }

  addLike() {
    this._likeButton.classList.add("card__likebtn-change");
  }
  removeLike() {
    this._likeButton.classList.remove("card__likebtn-change");
  }

  addTrashIcon() {
    this._trashIcon.classList.remove("card__deletebtn-nonactive");
  }

  removeTrashIcon() {
    this._trashIcon.classList.add("card__deletebtn-nonactive");
  }

  removeCard() {
    this._element.remove();
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
  _checkLikeStatus() {
    if (this._likeButton.classList.contains("card__likebtn-change")) {
      return true;
    } else {
      return false;
    }
  }

  _checkIdforLike(data) {
    data.forEach((obj) => {
      if (obj._id === "f978e887083bb5087ebbe974") {
        this.addLike();
      } else {
        this.removeLike();
      }
    });
  }

  _checkIdForDeleteIcon(data) {
    if (data.owner._id === "f978e887083bb5087ebbe974") {
      this.addTrashIcon();
    } else {
      this.removeTrashIcon();
    }
  }

  // Setting Event Listeners
  _setEventListeners() {
    // Like Btn Listener
    this._element
      .querySelector(".card__likebtn")
      .addEventListener("click", () => {
        this._handleLikeIcon();
        this._handleLikeClick();
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
    this._likeCounter = this._element.querySelector(".card__like-counter");
    this._likeButton = this._element.querySelector(".card__likebtn");
    this._trashIcon = this._element.querySelector(".card__deletebtn");
    this._likeCounter.textContent = this._likeAmount.length;

    this._setEventListeners();
    this._checkIdforLike(this._likeAmount);
    this._checkIdForDeleteIcon(this._data);

    return this._element;
  }

  getCardLikes(data) {
    console.log(data.likes);
  }
}

export default Card;
