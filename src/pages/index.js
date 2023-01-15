import "../pages/index.css";
import FormValidator from "../components/FormValidator.js";
import {
  initialCards,
  validationSettings,
  selectors,
  profileSelectors,
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

const modalButtonOpen = document.querySelector(".profile__title-button");
const profileNameElement = document.querySelector(".profile__title");
const profileDescriptionElement = document.querySelector(".profile__subtitle");
const modalAddButtonOpen = document.querySelector(".profile__button");
const modalInput = document.querySelector("#modal-name");
const modalInputDescription = document.querySelector("#modal-description");
const cardSelector = "#card-template";
// const cardWrapper = document.querySelector(".cards");

// Unused form selectors --- Selecting just form nothing else
const modalEditForm = document.querySelector("#edit-modal-form");
const modalAddEditForm = document.querySelector("#edit-modalAdd-form");

/* -------------------------------------------------------------*/
/*       Setting initial input values for profileEditForm       */
/* -------------------------------------------------------------*/
modalInput.defaultValue = profileNameElement.textContent;
modalInputDescription.defaultValue = profileDescriptionElement.textContent;

/* -------------------------------------------------------------*/
/*                    PopupWithImage Instance                   */
/* -------------------------------------------------------------*/
const previewPopup = new PopupWithImage(selectors.imagePreview);
previewPopup.setEventListeners();

/* -------------------------------------------------------------*/
/*                    Render Cards                              */
/* -------------------------------------------------------------*/
function renderCard(data) {
  const card = new Card(data, cardSelector, (data) => {
    previewPopup.openModal(data);
  });
  return card.getView();
}

/* -------------------------------------------------------------*/
/*                    New Section Instance                      */
/* -------------------------------------------------------------*/
const sectionCard = new Section(
  {
    items: initialCards,

    renderer: (data) => {
      const card = new renderCard(data);
      sectionCard.addItem(card);
    },
  },

  selectors.cardWrapper
);

sectionCard.renderItems();

/* -------------------------------------------------------------*/
/*  Click functionality for closebtn / opening btns for forms   */
/* -------------------------------------------------------------*/

//close Button
export const closeButtons = document.querySelectorAll(".modal__button");

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
/*        New Instances of PopupWithForm                        */
/* -------------------------------------------------------------*/
/* -------------------------------------------------------------*/
/*      New Instance creating a card on submit using            */
/*               new PopupWithForm instance                     */
/* -------------------------------------------------------------*/
const formSubmit2 = new PopupupWithForm(".modal_type_add", (data) => {
  const newUserCreatedCard = new Card(data, cardSelector, (data) => {
    previewPopup.openModal(data);
    newUserCreatedCard.getView();
  });
  sectionCard.addItem(newUserCreatedCard.getView());
  closeModal(modalAddPopup);
  formSubmit2.closeModal();
});
formSubmit2.setEventListeners();

//Popup Edit Form
const profileUpdateForm = new PopupupWithForm(".modal_type_edit", (data) => {
  profileUpdateForm.closeModal();
  userInfoCl.setUserInfo(data.name, data.description);
});
profileUpdateForm.setEventListeners();

const userInfoCl = new UserInfo(
  profileSelectors.profileNameElement,
  profileSelectors.profileDescriptionElement
);

userInfoCl.setUserInfo;
