import "../pages/index.css";
import FormValidator from "../components/FormValidator.js";
import {
  initialCards,
  validationSettings,
  selectors,
  profileSelectors,
  modalSelectors,
} from "../utils/constants.js";
import Api from "../components/Api.js";
import Card from "../components/Card.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupwithDelete from "../components/PopupWithDelete.js";

/* -------------------------------------------------------------*/
/*                         UserInfo Class                       */
/* -------------------------------------------------------------*/

const userInfo = new UserInfo(
  selectors.profNameElementIdSelector,
  selectors.profDescriptionElementIdSelector
);

/* -------------------------------------------------------------*/
/*                         API                                  */
/* -------------------------------------------------------------*/

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  authToken: "539f93f7-dc05-45c3-9b88-f97ff528fbfa",
});
// Task 0.5 - Logging user info object --- Precursor to 1 --- Possibly not needed
api.getUserInfo().then((res) => console.log(res));

// Task 1 - actually using returned Object(data) --- Setting the user info via the server
api.getUserInfo().then((userData) => {
  userInfo.setUserInfo(userData.name, userData.about);
});

//api card render
api.getCardList().then((cardData) => {
  const sectionCard = new Section(
    {
      items: cardData,

      renderer: (data) => {
        const card = renderCard(data);
        sectionCard.addItem(card);
      },
    },

    selectors.cardWrapper
  );
  sectionCard.renderItems();
});
//Task 3 using patch request for updating user info --- UPDATED USERINFO WITH //userInfo.setUserInfo(res.name, res.about);
api.updateUserInfo().then((res) => {
  userInfo.setUserInfo(res.name, res.about);
});
// DELETE TASK TRIAL
//api.removeCard("63dffa2740021a0212b2294d").then((res) => console.log(res));

/* -------------------------------------------------------------*/
/*                    PopupWithImage Instance                   */
/* -------------------------------------------------------------*/
const previewPopup = new PopupWithImage(selectors.imagePreview);
previewPopup.setEventListeners();

/* -------------------------------------------------------------*/
/*                    ORGINAL Render Cards Function             */
/* -------------------------------------------------------------*/
function renderCard(data) {
  const card = new Card(
    {
      data, // Data Coming in
      //handleCardClick
      handleCardClick: () => {
        previewPopup.openModal(data);
      },
      //handleDeleteCardClick
      handleDeleteCardClick: () => {
        //const id = card._id;
        deletePopupForm.openModal();
        console.log("Hello from Delete Button");
        deletePopupForm.setSubmitAction(() => {
          api.removeCard(data._id).then(() => {
            card.removeCard();
            console.log("Delete Successfull");
          });
        });
      },
    },
    selectors.cardSelector // Card Selector
  );
  return card.getView();
}

/* -------------------------------------------------------------*/
/*                    Click modalPopup eventListeners           */
/* -------------------------------------------------------------*/

//Open Modal Popup
modalSelectors.modalButtonOpen.addEventListener("click", () => {
  openProfileForm();
});

//Open Modal Add Button
modalSelectors.modalAddButtonOpen.addEventListener("click", () => {
  cardModal.openModal();
});

/* -------------------------------------------------------------*/
/*                   Functions to set Inputs on popup open      */
/* -------------------------------------------------------------*/
function fillProfileForm() {
  const { name, description } = userInfo.getUserInfo();
  modalSelectors.modalNameInput.value = name;
  modalSelectors.modalDescriptionInput.value = description;
}

function openProfileForm() {
  fillProfileForm();
  profileUpdateForm.openModal();
}

/* -------------------------------------------------------------*/
/*                        New instance of popupwithDelete        */
/* -------------------------------------------------------------*/
// How to pass in the card that was clicked on data to handleDeleteSubmit => then to api.removeCard(PASS IN CARD ID HERE)
const deletePopupForm = new PopupwithDelete(".modal_type_delete");
deletePopupForm.setEventListeners();

/* -------------------------------------------------------------*/
/*                        FORM Validation                       */
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
const cardModal = new PopupWithForm(".modal_type_add", (data) => {
  api.addCard(data);
  cardModal.closeModal();
});
cardModal.setEventListeners();

/* -------------------------------------------------------------*/
/*        Instance for popup Edit form                        */
/* -------------------------------------------------------------*/
const profileUpdateForm = new PopupWithForm(".modal_type_edit", (data) => {
  profileUpdateForm.closeModal();
  userInfo.setUserInfo(data.name, data.description);
});
profileUpdateForm.setEventListeners();

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
// , {
//   handleDeleteSubmit: () => {
//     //console.log(api.getUserInfo());
//     // const id = api.getUserInfo
//     // console.log(id);
//     //console.log(api.getId());
//     // api.getCardList().then((data) => {
//     //   console.log(data);
//     // });
//     card.removeCard();
//     // api.removeCard(data._id);
//     //   .then((res) => {
//     //     console.log("Deleted", res);
//     //     card.handleDeleteCardClick();
//     //   })
//     //   .catch((err) => console.log(err));
//     console.log("HELLO FROM DELETE SUBMIT BUTTON");
//     // console.log(data);
//   },
// }
