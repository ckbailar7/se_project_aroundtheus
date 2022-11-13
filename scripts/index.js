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
/* -------------------------------------------------------------*/
/*                        -- Wrappers                             */
/* -------------------------------------------------------------*/
const cardWrapper = document.querySelector(".cards");
const popupWrapper = document.querySelector(".modal__container-image-preview");

/* -------------------------------------------------------------*/
/*                         -- Image POPUP                          */
/* -------------------------------------------------------------*/
const imagePreview = document.querySelector("#image__preview");
const modalButtonImgClose = imagePreview.querySelector(".modal__button-img");
const popupImage = imagePreview.querySelector(".modal__image");
const popupImageTitle = imagePreview.querySelector(".modal__caption");
const previewImagePopup = document.querySelector("#popup__image");
/* -------------------------------------------------------------*/
/*                         Functions                             */
/* -------------------------------------------------------------*/
function createCardElement(card) {
  const cardTemplate =
    document.querySelector("#card-template").content.firstElementChild;
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__name");
  const likeBtn = cardElement.querySelector(".card__likebtn");
  const deleteButton = cardElement.querySelector(".card__deletebtn");
  //Popup close Button
  const popupCloseButton = document.querySelector(".modal__button");

  cardImage.style.backgroundImage = `url(${card.link})`;
  cardTitle.textContent = card.name;

  likeBtn.addEventListener("click", handleLikeIcon);
  deleteButton.addEventListener("click", cardDeletebtn);
  popupCloseButton.addEventListener("click", closePopup);

  cardImage.addEventListener("click", () => {
    popupImage.src = card.link;
    popupImage.alt = card.name;
    popupImageTitle.textContent = card.name;
    openPopup(imagePreview);
  });

  function openPopup(profilePopup) {
    profilePopup.classList.add("modal_opened");
  }

  function closePopup(profilePopup) {
    profilePopup.classList.remove("modal_opened");
  }

  function handleLikeIcon() {
    likeBtn.classList.toggle("card__likebtn-change");
  }

  function cardDeletebtn() {
    cardElement.remove();
  }

  return cardElement;
}

function renderCard(card, wrapper) {
  wrapper.prepend(createCardElement(card));
}

/* -------------------------------------------------------------*/
/*                         User Inputs                          */
/* -------------------------------------------------------------*/

//Open Modal Popup
modalButtonOpen.addEventListener("click", () => {
  profilePopup.classList.add("modal_opened");
});

//Close Modal Popup
modalButtonClose.addEventListener("click", () => {
  profilePopup.classList.remove("modal_opened");
});

modalButtonImgClose.addEventListener("click", () => {
  console.log("hello");
  imagePreview.classList.remove("modal_opened");
});

//Open Modal Add Button
modalAddButtonOpen.addEventListener("click", () => {
  modalAddPopup.classList.add("modal_opened");
});

//Close ModalAdd Button
modalAddButtonClose.addEventListener("click", () => {
  modalAddPopup.classList.remove("modal_opened");
});

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

  profilePopup.classList.remove("modal_opened");
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
  modalAddPopup.classList.remove("modal_opened");
});

initialCards.forEach((card) => renderCard(card, cardWrapper));
