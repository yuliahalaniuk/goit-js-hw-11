import { fetchQuery, PER_PAGE, resetPage, getPaginationSet } from './api.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const formEl = document.querySelector('.search-form');
const searchBtn = document.querySelector('.search-btn');
const galleryContainerEl = document.querySelector('.gallery');
const loadBtnEl = document.querySelector('.load-more-btn');

const lightboxGallery = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});

formEl.addEventListener('submit', onFormSubmit);
loadBtnEl.addEventListener('click', fetchApiRequest);

function onFormSubmit(e) {
  e.preventDefault();
  galleryContainerEl.innerHTML = '';
  resetPage();

  fetchApiRequest();

  if (document.querySelector('.error-text')) {
    document.querySelector('.error-text').remove();
  }
}

function appendMarkup(imgArray) {
  imgArray.map(img => {
    galleryContainerEl.insertAdjacentHTML('beforeEnd', generateMarkup(img));
  });

  lightboxGallery.refresh();
}

function hideLoadMoreBtn() {
  loadBtnEl.classList.remove('is-hidden');
}

function generateMarkup(img) {
  return ` <a href="${img.largeImageURL}">
  <div class="photo-card">
        <div class="img-wrap">
         <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy" class="card-img"/>
        </div>
        <div class="info">
          <p class="info-item">
            <b>Likes</b>${img.likes}
          </p>
          <p class="info-item">
            <b>Views</b>${img.views}
          </p>
          <p class="info-item">
            <b>Comments</b>${img.comments}
          </p>
          <p class="info-item">
            <b>Downloads</b>${img.downloads}
          </p>
        </div>
      </div>
      </a>`;
}

function getNecessaryFields(array) {
  return array.hits.map(
    ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) => {
      return {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      };
    }
  );
}

function createContent(imgArray) {
  appendMarkup(imgArray);
  hideLoadMoreBtn();
}

function checkSearchQuery() {
  if (document.querySelector('.error-text')) {
    return;
  }

  const newText = document.createElement('p');
  newText.classList.add('error-text');
  newText.textContent =
    'Sorry, there are no images matching your search query. Please try again.';
  searchBtn.disabled = true;
  loadBtnEl.classList.add('is-hidden');

  galleryContainerEl.after(newText);
}

function checkAvailableData() {
  if (document.querySelector('.error-text')) {
    return;
  }
  const newText = document.createElement('p');
  newText.classList.add('end-text');
  newText.textContent =
    "We're sorry, but you've reached the end of search results.";

  loadBtnEl.classList.add('is-hidden');
  galleryContainerEl.after(newText);
}

async function fetchApiRequest() {
  const searchQuery = formEl.elements.searchQuery.value;
  searchBtn.disabled = true;

  try {
    const response = await fetchQuery(searchQuery);
    if (response.totalHits === 0) {
      checkSearchQuery();
      return;
    }

    const { page, PER_PAGE } = getPaginationSet();

    if (page === 1) {
      Notify.success(`Hooray! We found ${response.totalHits} images.`);
    }

    if (page * PER_PAGE >= response.totalHits) {
      checkAvailableData;
      return;
    }

    const imgArr = getNecessaryFields(response);
    createContent(imgArr);
  } catch (error) {
    console.error(error);
  } finally {
    searchBtn.disabled = false;
  }
}
