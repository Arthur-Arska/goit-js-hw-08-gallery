import gallery from "./gallery-items.js";

const refs = {
  gallery: document.querySelector(".js-gallery"),
  lightboxItems: document.querySelector(".js-lightbox"),
  modalImage: document.querySelector(".lightbox__image"),
  closeButton: document.querySelector(".lightbox__button"),
};
const arrayImg = gallery.map((item) => item.original);

// Gallery markup

const galleryMarkup = createGalleryMarkup(gallery);
refs.gallery.insertAdjacentHTML("beforeend", galleryMarkup);

function createGalleryMarkup(gallery) {
  return gallery
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
`;
    })
    .join("");
}

// Refs

refs.gallery.addEventListener("click", onGalleryItemClick);
refs.closeButton.addEventListener("click", onModalClose);
refs.lightboxItems.addEventListener("click", backdropClose);

function onGalleryItemClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") return;

  onModalOpen();
  setImage(event);
 
  window.addEventListener("keydown", onEscClick);
  window.addEventListener("keydown", onArrowClick);
}

function setImage(event) {
  refs.modalImage.src = event.target.dataset.source;
  refs.modalImage.alt = event.target.alt;
}

function onModalOpen() {
  refs.lightboxItems.classList.add("is-open");
}

function onModalClose() {
  refs.lightboxItems.classList.remove("is-open");
  refs.modalImage.src = "";
  refs.modalImage.alt = "";

  window.removeEventListener("keydown", onEscClick);
  window.removeEventListener("keydown", onArrowClick);
}

function backdropClose(event) {
  if (event.target.nodeName !== "IMG") {
    onModalClose(event);
  }
}

//Close image with Escape

function onEscClick(event) {
  if (event.key === "Escape") {
    onModalClose(event);
  }
}

//Scrolling images 

function onArrowClick(event) {
  let newIndex;
  const currentId = arrayImg.indexOf(refs.modalImage.src);
  if (event.key === "ArrowLeft") {
    newIndex = currentId - 1;
    if (newIndex == -1) {
      newIndex = arrayImg.length - 1;
    }
  } else if (event.key === "ArrowRight") {
    newIndex = currentId + 1;
    if (newIndex === arrayImg.length) {
      newIndex = 0;
    }
  } else {
    return;
  }
  refs.modalImage.src = arrayImg[newIndex];
}