export function handleEscUp() {
  this._element.preventDefault();
  isEscEvent(this.closeModal);
}

export function isEscEvent(action) {
  if (this._element.key === "Escape") {
    action(this.openModal);
  }
}

export function handleOverlayClose() {
  if (this._element.classList.contains("modal")) {
    closeModal();
  }
}

// Open Modal
export function openModal() {
  this._element.classList.add("modal_opened");
  this._element.addEventListener("mousedown", handleOverlayClose);
  document.addEventListener("keyup", handleEscUp);
}

//Close Modal
export function closeModal() {
  this._element.classList.remove("modal_opened");
  this._element.removeEventListener("mousedown", handleOverlayClose);
  document.removeEventListener("keyup", handleEscUp);
}

// needed in file that you are exporting to
// import { handleEscUp, isEscEvent, openModal, closeModal } from "./utils.js";
