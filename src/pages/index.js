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
import PopupwithConfirmation from "../components/PopupWithDelete.js";

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
  headers: {
    authorization: "539f93f7-dc05-45c3-9b88-f97ff528fbfa",
    "Content-Type": "application/json",
  },
});

api
  .getData()
  .then(([userData, cardData]) => {
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setAvatarInfo(userData.avatar);

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
  })
  .catch((err) => {
    console.log(err);
  });

let sectionCard;

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
        deletePopupForm.setSubmitAction(() => {
          deletePopupForm.isLoading();
          api
            .removeCard(data._id)
            .then(() => {
              card.removeCard();
              deletePopupForm.closeModal();
            })
            .finally(() => {
              deletePopupForm.isFinishedLoading();
            });
        });
      },
      //handleLikeClick
      handleLikeClick: () => {
        if (!card._checkLikeStatus()) {
          api
            .removeLike(data._id)
            .then((res) => {
              card.setLikeCounter(res);
              card.removeLike();
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          api
            .addLike(data._id)
            .then((res) => {
              card.setLikeCounter(res);
              card.addLike();
            })
            .catch((err) => {
              console.log(err);
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
const deletePopupForm = new PopupwithConfirmation(".modal_type_delete");
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
  cardModal.isLoading();
  api
    .addCard(data)
    .then((res) => {
      const card = renderCard(res);
      sectionCard.addItem(card);
    })
    .then(() => {
      cardModal.closeModal();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      cardModal.isFinishedLoading();
    });
});
cardModal.setEventListeners();

/* -------------------------------------------------------------*/
/*        Instance for popup Edit form                        */
/* -------------------------------------------------------------*/
const profileUpdateForm = new PopupWithForm(".modal_type_edit", (data) => {
  profileUpdateForm.isLoading();
  api
    .updateUserInfo(data.name, data.description)
    .then(() => {
      userInfo.setUserInfo(data.name, data.description);
      profileUpdateForm.closeModal();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      profileUpdateForm.isFinishedLoading();
    });
});
profileUpdateForm.setEventListeners();

/* -------------------------------------------------------------*/
/*        New Instance for editProfilePicture form              */
/* -------------------------------------------------------------*/
//profileUpdatePictureForm
const profileUpdatePictureForm = new PopupWithForm(
  ".modal_type_edit-picture",
  (data) => {
    profileUpdatePictureForm.isLoading();
    api
      .updateProfilePicture(data.link)
      .then(() => {
        //selectors.profileImage.src = data.link;
        userInfo.setAvatarInfo(data.link);
      })
      .then(() => {
        profileUpdatePictureForm.closeModal();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        profileUpdatePictureForm.isFinishedLoading();
      });
  }
);
profileUpdatePictureForm.setEventListeners();
