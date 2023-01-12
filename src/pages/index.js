import "../pages/index.css";
import FormValidator from "../components/FormValidator.js";
import {
  initialCards,
  validationSettings,
  selectors,
} from "../utils/constants.js";
import { openModal, closeModal } from "../utils/utils.js";
import Card from "../components/Card.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupupWithForm from "../components/PopupWithForm.js";

/* -------------------------------------------------------------*/
/*                         Selectors                            */
/* -------------------------------------------------------------*/

const profilePopup = document.querySelector(".modal");
const modalAddPopup = document.querySelector(".modal_type_add");
const modalEditForm = document.querySelector("#edit-modal-form");
const modalAddEditForm = document.querySelector("#edit-modalAdd-form");
const modalButtonOpen = document.querySelector(".profile__title-button");
const profileNameElement = document.querySelector(".profile__title");
const profileDescriptionElement = document.querySelector(".profile__subtitle");
const modalAddButtonOpen = document.querySelector(".profile__button");
const modalInput = document.querySelector("#modal-name");
const modalInputDescription = document.querySelector("#modal-description");

const cardSelector = "#card-template";
const cardWrapper = document.querySelector(".cards");

/* -------------------------------------------------------------*/
/*       Setting initial input values for profileEditForm       */
/* -------------------------------------------------------------*/

modalInput.defaultValue = profileNameElement.textContent;
modalInputDescription.defaultValue = profileDescriptionElement.textContent;

const previewPopup = new PopupWithImage(selectors.imagePreview);
previewPopup.setEventListeners();

function renderCard(data) {
  const card = new Card(data, cardSelector, (data) => {
    previewPopup.openModal(data);
  });
  return card.getView();
}

// iterate over each element in the initialCards array and call the function renderCard
// initialCards.forEach((card) => renderCard(card, cardSelector));

//CHECK
const sectionCard = new Section(
  {
    items: initialCards,

    renderer: (data) => {
      const card = new renderCard(data);
      sectionCard.addItem(card);
    },
  },

  ".cards"
);

sectionCard.renderItems();

//close Button
export const closeButtons = document.querySelectorAll(".modal__button");
/* -------------------------------------------------------------*/
/*  Click functionality for closebtn / opening btns for forms   */
/* -------------------------------------------------------------*/

closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closeModal(popup));
});

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

const editFormElement = profilePopup.querySelector(".modal__container");
const addFormElement = modalAddPopup.querySelector(".modal__container");

const editFormValidator = new FormValidator(
  validationSettings,
  editFormElement
);
const addFormValidator = new FormValidator(validationSettings, addFormElement);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

/* -------------------------------------------------------------*/
/*                         Event Handlers for Submit            */
/* -------------------------------------------------------------*/

modalAddEditForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const modalAddnameValue = event.target.name.value;
  const modalAddLinkValue = event.target.link.value;

  renderCard(
    {
      name: modalAddnameValue,
      link: modalAddLinkValue,
    },
    cardSelector
  );

  closeModal(modalAddPopup);

  event.target.reset();
});

/* -------------------------------------------------------------*/
/*        New Instances of PopupWithForm                        */
/* -------------------------------------------------------------*/

const profileUpdateForm = new PopupupWithForm(".modal_type_edit", (data) => {
  profileNameElement.textContent = data.name;
  profileDescriptionElement.textContent = data.description;
  profileUpdateForm.closeModal();
});

profileUpdateForm.setEventListeners();

// const addCardForm = new PopupupWithForm();
