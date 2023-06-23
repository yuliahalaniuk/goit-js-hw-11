import { fetchQuery, PER_PAGE, resetPage, getPaginationSet } from './api.js';

const bodyEl = document.querySelector('body');
const formEl = document.querySelector('.search-form');
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

  fetchQuery(searchQuery)
    .then(r => {
      console.log(r);
      if (r.totalHits === 0) {
        console.log(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }

      const { page, PER_PAGE } = getPaginationSet();
      console.log(page, PER_PAGE);
      if (page * PER_PAGE >= r.totalHits) {
        const newText = document.createElement('p');
        newText.textContent =
          "We're sorry, but you've reached the end of search results.";

        loadBtnEl.classList.add('is-hidden');
        galleryContainerEl.after(newText);
        return;
      }

      const imgArr = getNecessaryFields(r);
      return imgArr;
    })
    .then(createContent);
}
