// Add imports above this line
import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Change code below this line
const palletConteiner = document.querySelector('.gallery');
palletConteiner.insertAdjacentHTML(
  'beforeend',
  createGalleryMarkup(galleryItems)
);
palletConteiner.addEventListener('click', onPalletConteinerClick);

function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
      <div>
      <a class="gallery__item" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}" title="${description}" />
</a></div>
    `;
    })
    .join('');
}

function onPalletConteinerClick(event) {
  event.preventDefault();
  if (!event.target.classList.contains('gallery__image')) {
    return;
  }
}
let gallery = new SimpleLightbox('.gallery a');
gallery.on('shown.simplelightbox', function () {
  gallery.defaultOptions.captionDelay = 250;
});

console.log(galleryItems);
