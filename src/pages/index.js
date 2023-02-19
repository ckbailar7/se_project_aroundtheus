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
  selectors.profDescriptionElementIdSelector,
  selectors.profileImageSelector
);

/* -------------------------------------------------------------*/
/*                         API                                  */
/* -------------------------------------------------------------*/

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  authToken: "539f93f7-dc05-45c3-9b88-f97ff528fbfa",
});

// - Setting the user info via the server
api.getUserInfo().then((userData) => {
  userInfo.setUserInfo(userData.name, userData.about);
  userInfo.setAvatarInfo(userData.avatar);
});
let sectionCard;
//api card render
api.getCardList().then((cardData) => {
  sectionCard = new Section(
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

/* -------------------------------------------------------------*/
/*                    renderCard Function with API handlers     */
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
        deletePopupForm.openModal();
        console.log("Hello from Delete Button");
        deletePopupForm.setSubmitAction(() => {
          api.removeCard(data._id).then(() => {
            card.removeCard();
            console.log("Delete Successfull");
          });
        });
      },
      //handleLikeClick
      handleLikeClick: () => {
        if (!card._checkLikeStatus()) {
          api.removeLike(data._id).then((res) => {
            card.setLikeCounter(res);
            card.removeLike();
            console.log("Like Deleted from Server Successfully...");
          });
        } else {
          api.addLike(data._id).then((res) => {
            card.setLikeCounter(res);
            card.addLike();
            console.log("Like Added to server Successfully...");
          });
        }
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

selectors.profileImage.addEventListener("click", () => {
  openProfilePictureEditForm();
});

selectors.profileImage.addEventListener("mouseover", () => {
  profileSelectors.profilePictureOverlaySelector.classList.add(
    profileSelectors.profilePictureOverlaySelectorActive
  );
  selectors.profileImage.classList.add(
    profileSelectors.profileImageChangeOpaque
  );
});

selectors.profileImage.addEventListener("mouseout", () => {
  profileSelectors.profilePictureOverlaySelector.classList.remove(
    profileSelectors.profilePictureOverlaySelectorActive
  );
  selectors.profileImage.classList.remove(
    profileSelectors.profileImageChangeOpaque
  );
});

/* -------------------------------------------------------------*/
/*                    PopupWithImage Instance                   */
/* -------------------------------------------------------------*/
const previewPopup = new PopupWithImage(selectors.imagePreview);
previewPopup.setEventListeners();

/* -------------------------------------------------------------*/
/*                   Functions to set Inputs on popup open      */
/* -------------------------------------------------------------*/
function fillProfileForm() {
  const { name, description, avatar } = userInfo.getUserInfo();
  modalSelectors.modalNameInput.value = name;
  modalSelectors.modalDescriptionInput.value = description;
}

function fillProfilePictureEditForm() {
  console.log("Hello from fillProfilePictureEditForm()");
  modalSelectors.modalPictureEditInput.value = selectors.profileImage.src;
}

function openProfileForm() {
  fillProfileForm();
  profileUpdateForm.openModal();
}

function openProfilePictureEditForm() {
  fillProfilePictureEditForm();
  profileUpdatePictureForm.openModal();
}

/* -------------------------------------------------------------*/
/*                        New instance of popupwithDelete        */
/* -------------------------------------------------------------*/
const deletePopupForm = new PopupwithDelete(".modal_type_delete");
deletePopupForm.setEventListeners();

/* -------------------------------------------------------------*/
/*                        FORM Validation                       */
/* -------------------------------------------------------------*/
const editFormElement =
  modalSelectors.modalContainer.querySelector(".modal__container");
const addFormElement =
  modalSelectors.modalAddPopup.querySelector(".modal__container");

const editProfilePictureFormElement =
  modalSelectors.modalEditProfilePictureForm.querySelector(".modal__container");

const editFormValidator = new FormValidator(
  validationSettings,
  editFormElement
);
const addFormValidator = new FormValidator(validationSettings, addFormElement);

const editProfilePictureFormValidator = new FormValidator(
  validationSettings,
  editProfilePictureFormElement
);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
editProfilePictureFormValidator.enableValidation();
/* -------------------------------------------------------------*/
/* -------------------------------------------------------------*/
/*        New Instances of PopupWithForm                        */
/* -------------------------------------------------------------*/
/* -------------------------------------------------------------*/
/* -------------------------------------------------------------*/
/*      Instance for popup ADD form                             */
/* -------------------------------------------------------------*/
const cardModal = new PopupWithForm(".modal_type_add", (data) => {
  api.addCard(data).then((res) => {
    const card = renderCard(res);
    sectionCard.addItem(card);
  });
  cardModal.closeModal();
});
cardModal.setEventListeners();

/* -------------------------------------------------------------*/
/*        Instance for popup Edit form                        */
/* -------------------------------------------------------------*/
const profileUpdateForm = new PopupWithForm(".modal_type_edit", (data) => {
  profileUpdateForm.closeModal();
  userInfo.setUserInfo(data.name, data.description);
  api.updateUserInfo(data.name, data.description);
});
profileUpdateForm.setEventListeners();

/* -------------------------------------------------------------*/
/*        New Instance for editProfilePicture form              */
/* -------------------------------------------------------------*/
//profileUpdatePictureForm
const profileUpdatePictureForm = new PopupWithForm(
  ".modal_type_edit-picture",
  (data) => {
    console.log(data);

    profileUpdatePictureForm.closeModal();
    api.updateProfilePicture(data.link);
    selectors.profileImage.src = data.link;
  }
);
profileUpdatePictureForm.setEventListeners();
