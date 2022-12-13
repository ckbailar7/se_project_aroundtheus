import FormValidator from "./FormValidator.js";
import {
  openModal,
  imagePreview,
  closeModal,
  handleEscUp,
  isEscEvent,
} from "./utils.js";
import Card from "./Card.js";

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
/* -------------------------------------------------------------*/
/*                         Selectors                            */
/* -------------------------------------------------------------*/
const profilePopup = document.querySelector(".modal");
const modalAddPopup = document.querySelector(".modal_type_add");
const modalEditForm = document.querySelector("#edit-modal-form");
const modalAddEditForm = document.querySelector("#edit-modalAdd-form");
const modalButtonOpen = document.querySelector(".profile__title-button");
const modalButtonClose = document.querySelector(".modal__button");
const modalAddButtonClose = modalAddPopup.querySelector(".modal__button");
const profileNameElement = document.querySelector(".profile__title");
const profileDescriptionElement = document.querySelector(".profile__subtitle");
const modalAddButtonOpen = document.querySelector(".profile__button");
const modalInput = document.querySelector("#modal-name");
const modalInputDescription = document.querySelector("#modal-description");
modalInput.defaultValue = profileNameElement.textContent;
modalInputDescription.defaultValue = profileDescriptionElement.textContent;

const cardSelector = "#card-template";
/* -------------------------------------------------------------*/
/*                        -- Wrappers                             */
/* -------------------------------------------------------------*/
const cardWrapper = document.querySelector(".cards");
const popupWrapper = document.querySelector(".modal__container-image-preview");

/* -------------------------------------------------------------*/
/*                         -- Image POPUP                          */
/* -------------------------------------------------------------*/
const modalButtonImgClose = imagePreview.querySelector(".modal__button");
const popupImage = imagePreview.querySelector(".modal__image");
const popupImageTitle = imagePreview.querySelector(".modal__caption");
const previewImagePopup = document.querySelector("#popup__image");
const modalTypeEdit = document.querySelector(".modal_type_edit");
const modalTypePreview = document.querySelector(".modal_type_preview");

/* -------------------------------------------------------------*/
/*                         Functions                             */
/* -------------------------------------------------------------*/
// function createCardElement(card) {
// const cardTemplate =
//   document.querySelector("#card-template").content.firstElementChild;
// const cardElement = cardTemplate.cloneNode(true);
// const cardImage = cardElement.querySelector(".card__image");
// const cardTitle = cardElement.querySelector(".card__name");
// const likeBtn = cardElement.querySelector(".card__likebtn");
// const deleteButton = cardElement.querySelector(".card__deletebtn");
//Popup close Button

// cardImage.src = card.link;
// cardTitle.textContent = card.name;
// cardImage.alt = card.name;

// likeBtn.addEventListener("click", handleLikeIcon);
// deleteButton.addEventListener("click", handleDeleteBtn);
// cardImage.addEventListener("click", handleImagePopup);

// function handleLikeIcon() {
//   likeBtn.classList.toggle("card__likebtn-change");
// }

// function handleDeleteBtn() {
//   cardElement.remove();
// }

// function handleImagePopup() {
//   popupImage.src = card.link;
//   popupImage.alt = card.name;
//   popupImageTitle.textContent = card.name;
//   openModal(imagePreview);
// }

// return cardElement;
// }

function renderCard(data, wrapper) {
  const card = new Card(data, wrapper);
  cardWrapper.prepend(card.getView());
  // console.log(card.getView());
}

/* -------------------------------------------------------------*/
/*                         Calling rendered card                */
/* -------------------------------------------------------------*/
initialCards.forEach((card) => renderCard(card, cardSelector));

/* -------------------------------------------------------------*/
/*                         Open/close Universal Functions       */
/* -------------------------------------------------------------*/

// const handleOverlayClose = (evt) => {
//   if (evt.target.classList.contains("modal")) {
//     closeModal(evt.target);
//   }
// };

// function closeModal(modal) {
//   modal.classList.remove("modal_opened");

//   modal.removeEventListener("mousedown", handleOverlayClose);
//   document.removeEventListener("keyup", handleEscUp);
// }

/* -------------------------------------------------------------*/
/*                         -- Esc key start                     */
/* -------------------------------------------------------------*/

// const handleEscUp = (evt) => {
//   evt.preventDefault();
//   isEscEvent(evt, closeModal);
// };

// const isEscEvent = (evt, action) => {
//   if (evt.key === "Escape") {
//     const openModal = document.querySelector(".modal_opened");

//     action(openModal);
//   }
// };

/* -------------------------------------------------------------*/
/*                         User Inputs                          */
/* -------------------------------------------------------------*/

// const closeButtons = document.querySelectorAll(".modal__button");

// closeButtons.forEach((button) => {
//   const popup = button.closest(".modal");
//   button.addEventListener("click", () => closeModal(popup));
// });

//Open Modal Popup
modalButtonOpen.addEventListener("click", () => {
  openModal(profilePopup);
});

//Open Modal Add Button
modalAddButtonOpen.addEventListener("click", () => {
  openModal(modalAddPopup);
});

/* -------------------------------------------------------------*/
/*                         Validation                           */
/* -------------------------------------------------------------*/
// const validationSettings = {
//   inputSelector: ".modal__container-input",
//   submitButtonSelector: ".modal__container-button",
//   inactiveButtonClass: "modal__container-button_disabled",
//   inputErrorClass: ".modal__container-input_error",
//   errorClass: "modal__container-input_error_visible",
// };
// const editFormElement = profilePopup.querySelector(".modal__container");
// const addFormElement = modalAddPopup.querySelector(".modal__container");

// const editFormValidator = new FormValidator(
//   validationSettings,
//   editFormElement
// );
// const addFormValidator = new FormValidator(validationSettings, addFormElement);

// editFormValidator.enableValidation();
// addFormValidator.enableValidation();

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

  closeModal(profilePopup);
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
  closeModal(modalAddPopup);

  event.target.reset();
});
