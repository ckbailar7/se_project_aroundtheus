export function isEscEvent(evt, action) {
  if (evt.key === "Escape") {
    action(openModal);
  }
}

export function handleEscUp(evt) {
  evt.preventDefault();
  isEscEvent(evt, closeModal);
}

export function handleOverlayClose(evt) {
  if (evt.target.classList.contains("modal")) {
    closeModal(evt.target);
  }
}

//close Button
export const closeButtons = document.querySelectorAll(".modal__button");

closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closeModal(popup));
});

// Open Modal
export function openModal(modalWindow) {
  modalWindow.classList.add("modal_opened");
  modalWindow.addEventListener("mousedown", handleOverlayClose);
  document.addEventListener("keyup", handleEscUp);
}

//Close Modal
export function closeModal(modalWindow) {
  modalWindow.classList.remove("modal_opened");
  modalWindow.removeEventListener("mousedown", handleOverlayClose);
  document.removeEventListener("keyup", handleEscUp);
}

export const imagePreview = document.querySelector("#image__preview");
