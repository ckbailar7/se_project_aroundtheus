export const initialCards = [
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

export const validationSettings = {
  inputSelector: ".modal__container-input",
  submitButtonSelector: ".modal__container-button",
  inactiveButtonClass: "modal__container-button_disabled",
  inputErrorClass: ".modal__container-input_error",
  errorClass: "modal__container-input_error_visible",
};

export const selectors = {
  imagePreview: "#image__preview",
  cardWrapper: ".cards",
  profNameElementIdSelector: ".profile__title",
  profDescriptionElementIdSelector: ".profile__subtitle",
};

export const modalSelectors = {
  modalNameInput: document.querySelector("#modal-name"),
  modalDescriptionInput: document.querySelector("#modal-description"),
  modalContainer: document.querySelector(".modal"),
  modalAddPopup: document.querySelector(".modal_type_add"),
  modalButtonOpen: document.querySelector(".profile__title-button"),
  modalAddButtonOpen: document.querySelector(".profile__button"),
};

export const profileSelectors = {
  profileDescriptionElement: document.querySelector(".profile__subtitle"),

  profileNameElement: document.querySelector(".profile__title"),
};
