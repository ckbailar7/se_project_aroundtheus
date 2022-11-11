//Cards Array
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* -------------------------------------------------------------*/
/*                         Selectors                            */
/* -------------------------------------------------------------*/

//Main modal Container that has the "modal__opened" class added when the edit button is "clicked"
const profilePopup = document.querySelector(".modal");
const modalAddPopup = document.querySelector(".modal__add");
//Select Modal Form
const modalEditForm = document.querySelector("#edit-modal-form");
//Select ModalAdd Form
const modalAddEditForm = document.querySelector("#edit-modalAdd-form");
//Open Button
const modalButtonOpen = document.querySelector(".profile__title-button");
//Close Button
const modalButtonClose = document.querySelector(".modal-button");
//Close modalAdd Close Button
const modalAddButtonClose = modalAddPopup.querySelector(".modal-button");
//Profile Name
const profileNameElement = document.querySelector(".profile__title");
//Profile Description
const profileDescriptionElement = document.querySelector(".profile__subtitle");
//Edit cards Button
const modalAddButtonOpen = document.querySelector(".profile__button");
/* -------------------------------------------------------------*/
/*                         Wrappers                             */
/* -------------------------------------------------------------*/
const cardWrapper = document.querySelector(".cards");
const popupWrapper = document.querySelector(".popup");

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* -------------------------------------------------------------*/
/*                         Functions                             */
/* -------------------------------------------------------------*/

function createCardElement(card) {
  //Reference to the template
  const cardTemplate =
    document.querySelector("#card-template").content.firstElementChild;

  //cloning the template for use
  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__name");
  const likeBtn = cardElement.querySelector(".card__likebtn");
  //Trash Icon
  const deleteButton = cardElement.querySelector(".card__deletebtn");

  cardImage.style.backgroundImage = `url(${card.link})`;
  cardTitle.textContent = card.name;

  likeBtn.addEventListener("click", handleLikeIcon);
  function handleLikeIcon() {
    likeBtn.classList.add("card__likebtn-change");
  }

  deleteButton.addEventListener("click", cardDeletebtn);

  function cardDeletebtn() {
    cardElement.remove();
  }

  cardImage.addEventListener("click", handlePreviewPicture);

  //Popup close Button
  const popupCloseButton = document.querySelector(".popup__close-button");

  // //Close popUp Button
  popupCloseButton.addEventListener("click", () => {
    popupWrapper.classList.remove("popup__opened");
  });

  // card image preview
  const imagePreview = document.querySelector("#image__preview");
  const popupImage = imagePreview.querySelector(".popup__image");
  const popupImageTitle = imagePreview.querySelector(".popup__caption");

  function handlePreviewPicture(card) {
    popupImage.src = card.link;
    popupImageTitle.textContent = card.name;
    popupImage.alt = card.name;

    popupWrapper.classList.add("popup__opened");
  }

  return cardElement;
}

function renderCard(card, wrapper) {
  wrapper.prepend(createCardElement(card));
}

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* -------------------------------------------------------------*/
/*                         User Inputs                          */
/* -------------------------------------------------------------*/
//Open Modal Popup
modalButtonOpen.addEventListener("click", () => {
  profilePopup.classList.add("modal__opened");
});

//Close Modal Popup
modalButtonClose.addEventListener("click", () => {
  profilePopup.classList.remove("modal__opened");
});

//Open Modal Add Button
modalAddButtonOpen.addEventListener("click", () => {
  modalAddPopup.classList.add("modal__opened");
});

//Close ModalAdd Button
modalAddButtonClose.addEventListener("click", () => {
  modalAddPopup.classList.remove("modal__opened");
});

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* -------------------------------------------------------------*/
/*                         Event Handlers                       */
/* -------------------------------------------------------------*/

//Edit Modal Form inputs with close on submit but does not refresh page
modalEditForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const nameValue = event.target.name.value;
  const descriptionValue = event.target.description.value;

  profileNameElement.textContent = nameValue;
  profileDescriptionElement.textContent = descriptionValue;

  profilePopup.classList.remove("modal__opened");
});

modalAddEditForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const modalAddnameValue = event.target.name.value;
  const modalAddLinkValue = event.target.link.value;

  renderCard(
    {
      name: modalAddnameValue,
      link: modalAddLinkValue,
    },
    cardWrapper
  );
  modalAddPopup.classList.remove("modal__opened");
});

initialCards.forEach((card) => renderCard(card, cardWrapper));
