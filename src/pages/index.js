import "../pages/index.css";
import FormValidator from "../components/FormValidator.js";
import { initialCards, validationSettings } from "../utils/constants.js";
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
/*                         Importing / constants above          */
/* -------------------------------------------------------------*/
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
//
//
//
//
//
//
//
//

// Setting initial input values for profileEditForm
modalInput.defaultValue = profileNameElement.textContent;
modalInputDescription.defaultValue = profileDescriptionElement.textContent;

/* -------------------------------------------------------------*/
/*                         Calling rendered card                */
/* -------------------------------------------------------------*/

function renderCard(data, wrapper) {
  const card = new Card(data, wrapper);
  cardWrapper.prepend(card.getView());
}

// iterate over each element in the initialCards array and call the function renderCard
initialCards.forEach((card) => renderCard(card, cardSelector));

//unsure
const sectionCard = new Section({
  items: initialCards,
  renderer: (data) => {
    renderItems(data);
  },
});

/* -------------------------------------------------------------*/
/*                         User Inputs                          */
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
    cardSelector
  );
  closeModal(modalAddPopup);

  event.target.reset();
});
