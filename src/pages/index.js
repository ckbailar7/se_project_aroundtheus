import "../pages/index.css";
import FormValidator from "../components/FormValidator.js";
import {
  initialCards,
  validationSettings,
  selectors,
  profileSelectors,
  modalSelectors,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";

/* -------------------------------------------------------------*/
/*                         Selectors                            */
/* -------------------------------------------------------------*/

/* -------------------------------------------------------------*/
/*                    PopupWithImage Instance                   */
/* -------------------------------------------------------------*/
const previewPopup = new PopupWithImage(selectors.imagePreview);
previewPopup.setEventListeners();

/* -------------------------------------------------------------*/
/*                    Render Cards                              */
/* -------------------------------------------------------------*/
function renderCard(data) {
  const card = new Card(data, selectors.cardSelector, (data) => {
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

//Open Modal Popup
modalSelectors.modalButtonOpen.addEventListener("click", () => {
  profileUpdateForm.openModal();
});

//Open Modal Add Button
modalSelectors.modalAddButtonOpen.addEventListener("click", () => {
  formSubmit2.openModal();
});

/* -------------------------------------------------------------*/
/*                         Validation                           */
/* -------------------------------------------------------------*/

const editFormElement =
  modalSelectors.modalContainer.querySelector(".modal__container");
const addFormElement =
  modalSelectors.modalAddPopup.querySelector(".modal__container");

const editFormValidator = new FormValidator(
  validationSettings,
  editFormElement
);
const addFormValidator = new FormValidator(validationSettings, addFormElement);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

/* -------------------------------------------------------------*/
/* -------------------------------------------------------------*/
/*        New Instances of PopupWithForm                        */
/* -------------------------------------------------------------*/
/* -------------------------------------------------------------*/
/* -------------------------------------------------------------*/
/*      Instance for popup ADD form                             */
/* -------------------------------------------------------------*/
const formSubmit2 = new PopupWithForm(".modal_type_add", (data) => {
  const newUserCreatedCard = new Card(data, selectors.cardSelector, (data) => {
    previewPopup.openModal(data);
    newUserCreatedCard.getView();
  });
  sectionCard.addItem(newUserCreatedCard.getView());

  formSubmit2.closeModal();
});
formSubmit2.setEventListeners();

/* -------------------------------------------------------------*/
/*        Instance for popup Edit form                        */
/* -------------------------------------------------------------*/
const profileUpdateForm = new PopupWithForm(".modal_type_edit", (data) => {
  profileUpdateForm.closeModal();
  userInfoCl.setUserInfo(data.name, data.description);
});
profileUpdateForm.setEventListeners();

const userInfoCl = new UserInfo(
  selectors.profNameElementIdSelector,
  selectors.profDescriptionElementIdSelector
);

userInfoCl.setUserInfo;

/* -------------------------------------------------------------*/
/*       Setting initial input values for profileEditForm       */
/* -------------------------------------------------------------*/
modalSelectors.modalNameInput.defaultValue =
  profileSelectors.profileNameElement.textContent;
modalSelectors.modalDescriptionInput.defaultValue =
  profileSelectors.profileDescriptionElement.textContent;
