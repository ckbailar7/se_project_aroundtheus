import { data } from "autoprefixer";

class Card {
  constructor(
    {
      data,
      handleCardClick,
      handleDeleteCardClick,
      handleLikeClick,
      handleOnLoadLikeSet,
    },
    cardSelector
  ) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._id = data.id;
    this._likeAmount = data.likes;
    this._handleDeleteCardClick = handleDeleteCardClick;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleOnLoadLikeSet = handleOnLoadLikeSet;
  }

  setLikeCounter() {
    this._likeCounter.textContent = this._likeAmount.length;
  }

  addLike() {
    this._likeButton.classList.add("card__likebtn-change");
  }
  removeLike() {
    this._likeButton.classList.remove("card__likebtn-change");
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
      console.log("Like Button Clicked");
      return true;
    } else {
      console.log("Like Button not clicked");
      return false;
    }
  }

  // Setting Event Listeners
  _setEventListeners() {
    // Like Btn Listener
    this._element
      .querySelector(".card__likebtn")
      .addEventListener("click", () => {
        this._handleLikeIcon();
        //console.log("Hello from like btn");
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
    //Delete YES Button Listener
    // this._element
    //   .querySelector(".modal__container-button")
    //   .addEventListener("click", () => {
    //     this.handleDeleteSubmitButton();
    //   });
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
    this._likeCounter.textContent = this._likeAmount.length;

    this._setEventListeners();

    return this._element;
  }

  getCardLikes(data) {
    return data.likes;
  }
}

export default Card;
