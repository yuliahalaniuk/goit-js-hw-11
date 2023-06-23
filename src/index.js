import { fetchQuery, PER_PAGE, resetPage, getPaginationSet } from './api.js';

const formEl = document.querySelector('.search-form');
const searchBtn = document.querySelector('.search-btn');
const galleryContainerEl = document.querySelector('.gallery');
const loadBtnEl = document.querySelector('.load-more-btn');

formEl.addEventListener('submit', onFormSubmit);
loadBtnEl.addEventListener('click', fetchApiRequest);

function onFormSubmit(e) {
  e.preventDefault();
  galleryContainerEl.innerHTML = '';

  resetPage();

  fetchApiRequest();
}

// function onLoadMoreBtnClick(e) {
//   fetchApiRequest();
// }

function appendMarkup(imgArray) {
  imgArray.map(img => {
    galleryContainerEl.insertAdjacentHTML('beforeEnd', generateMarkup(img));
  });
}

function hideLoadMoreBtn() {
  loadBtnEl.classList.remove('is-hidden');
}

function generateMarkup(img) {
  return `<div class="photo-card">
        <div class="img-wrap">
          <img src="${img.webformatURL}" alt="" loading="lazy" class="card-img"/>
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
      </div>`;
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

function fetchApiRequest() {
  const searchQuery = formEl.elements.searchQuery.value;
  searchBtn.disabled = true;
  fetchQuery(searchQuery)
    .then(r => {
      if (r.totalHits === 0) {
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

        return;
      }

      const { page, PER_PAGE } = getPaginationSet();

      if (page * PER_PAGE >= r.totalHits) {
        if (document.querySelector('.error-text')) {
          return;
        }
        const newText = document.createElement('p');
        newText.classList.add('end-text');
        newText.textContent =
          "We're sorry, but you've reached the end of search results.";

        loadBtnEl.classList.add('is-hidden');
        galleryContainerEl.after(newText);
        return;
      }

      const imgArr = getNecessaryFields(r);
      return imgArr;
    })
    .then(createContent)
    .finally(() => {
      searchBtn.disabled = false; // Enable search button after API request completion
    });
}
