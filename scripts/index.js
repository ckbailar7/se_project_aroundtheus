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

/* -------------------------------------------------------------*/
/*                        -- Wrappers                             */
/* -------------------------------------------------------------*/
const cardWrapper = document.querySelector(".cards");
const popupWrapper = document.querySelector(".modal__container-image-preview");

/* -------------------------------------------------------------*/
/*                         -- Image POPUP                          */
/* -------------------------------------------------------------*/
const imagePreview = document.querySelector("#image__preview");
const modalButtonImgClose = imagePreview.querySelector(".modal__button");
const popupImage = imagePreview.querySelector(".modal__image");
const popupImageTitle = imagePreview.querySelector(".modal__caption");
const previewImagePopup = document.querySelector("#popup__image");
const modalTypeEdit = document.querySelector(".modal_type_edit");
const modalTypePreview = document.querySelector(".modal_type_preview");

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

  cardImage.src = card.link;
  cardTitle.textContent = card.name;
  cardImage.alt = card.name;

  likeBtn.addEventListener("click", handleLikeIcon);
  deleteButton.addEventListener("click", handleDeletebtn);

  cardImage.addEventListener("click", () => {
    popupImage.src = card.link;
    popupImage.alt = card.name;
    popupImageTitle.textContent = card.name;
    openModal(imagePreview);
  });

  function handleLikeIcon() {
    likeBtn.classList.toggle("card__likebtn-change");
  }

  function handleDeletebtn() {
    cardElement.remove();
  }

  return cardElement;
}

function renderCard(card, wrapper) {
  wrapper.prepend(createCardElement(card));
}

/* -------------------------------------------------------------*/
/*                         Open/close Universal Functions       */
/* -------------------------------------------------------------*/

function openModal(modal) {
  modal.classList.add("modal_opened");
  // modal.addEventListener("mousedown", handleOverlayClose);
  document.addEventListener("keyup", handleEscUp);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");

  // modal.removeEventListener("mousedown", handleOverlayClose);
  document.removeEventListener("keyup", handleEscUp);
}

/* -------------------------------------------------------------*/
/*                         -- Esc key start                     */
/* -------------------------------------------------------------*/

const handleEscUp = (evt) => {
  evt.preventDefault();
  isEscEvent(evt, closeModal);
};

const isEscEvent = (evt, action) => {
  if (evt.key === "Escape") {
    const openModal = document.querySelector("modal_opened");

    action(openModal);
  }
};

modalAddPopup.addEventListener("mousedown", (evt) => {
  if (evt.target.classList.contains("modal")) {
    closeModal(modalAddPopup);
  }
});

modalTypeEdit.addEventListener("mousedown", (evt) => {
  if (evt.target.classList.contains("modal")) {
    closeModal(modalTypeEdit);
  }
});

modalTypePreview.addEventListener("mousedown", (evt) => {
  if (evt.target.classList.contains("modal")) {
    closeModal(modalTypePreview);
  }
});

//modalAddPopup -- good

/* -------------------------------------------------------------*/
/*                         User Inputs                          */
/* -------------------------------------------------------------*/

//Open Modal Popup
modalButtonOpen.addEventListener("click", () => {
  openModal(profilePopup);
});

//Close Modal Popup
modalButtonClose.addEventListener("click", () => {
  closeModal(profilePopup);
});

modalButtonImgClose.addEventListener("click", () => {
  closeModal(imagePreview);
});

//Open Modal Add Button
modalAddButtonOpen.addEventListener("click", () => {
  openModal(modalAddPopup);
});

//Close ModalAdd Button
modalAddButtonClose.addEventListener("click", () => {
  closeModal(modalAddPopup);
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

initialCards.forEach((card) => renderCard(card, cardWrapper));
