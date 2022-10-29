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

//Node Buttons///////////////////////////////////////

//Main modal Container that has the "modal__opened" class added when the edit button is "clicked"
const popUp = document.querySelector(".modal");
//Select Modal Form
const modalEditForm = document.querySelector("#edit-modal-form");
//Open Button
const openEditModalButton = document.querySelector(".profile__title-button");
//Close Button
const closeEditModalButton = document.querySelector(".modal-button");
//Profile Name
const profileNameElement = document.querySelector(".profile__title");
//Profile Description
const profileDescriptionElement = document.querySelector(".profile__subtitle");

//Wrappers//////////////////////////////////////

const cardWrapper = document.querySelector(".cards");

//Functions///////////////////////////////////////

function createCardElement(card) {
  //Reference to the template
  const cardTemplate =
    document.querySelector("#card-template").content.firstElementChild;

  //cloning the template for use
  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__name");

  cardImage.style.backgroundImage = `url(${card.link})`;

  cardTitle.textContent = card.name;

  return cardElement;
}

function renderCard(card, wrapper) {
  wrapper.append(createCardElement(card));
}

//Open Modal Popup
openEditModalButton.addEventListener("click", () => {
  popUp.classList.add("modal__opened");
});

//Close Modal Popup
closeEditModalButton.addEventListener("click", () => {
  popUp.classList.remove("modal__opened");
});

//Edit Modal Form inputs with close on submit but does not refresh page
modalEditForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const nameValue = event.target.name.value;
  const descriptionValue = event.target.description.value;

  profileNameElement.textContent = nameValue;
  profileDescriptionElement.textContent = descriptionValue;

  popUp.classList.remove("modal__opened");
});

initialCards.forEach((card) => renderCard(card, cardWrapper));
