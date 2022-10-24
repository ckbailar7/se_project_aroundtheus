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

// let titleButton = document.querySelector(".profile__title-button");
// let modal = document.querySelector(".modal");

// //Hide the Modal Box
// modal.setAttribute("style", "display: none");

// function modalDisplay() {
//   modal.setAttribute("style", "display: block");
// }

// //Event listener for clicking the button
// titleButton.addEventListener("click", modalDisplay());

const openEditModalButton = document.querySelector(".profile__title-button");
const popUp = document.querySelector(".modal");
const closeEditModalButton = document.querySelector(".modal-button");

openEditModalButton.addEventListener("click", () => {
  popUp.classList.add("modal__opened");
});

closeEditModalButton.addEventListener("click", () => {
  popUp.classList.remove("modal__opened");
});
