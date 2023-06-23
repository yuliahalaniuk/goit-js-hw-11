const API_KEY = '37711796-3b567f1c67dcaa6a50c805c9a';
const BASE_URL = 'https://pixabay.com/api';

const formEl = document.querySelector('.search-form');
const galleryContainerEl = document.querySelector('.gallery');
const loadBtnEl = document.querySelector('.load-more');

formEl.addEventListener('submit', onFormSubmit);
loadBtnEl.addEventListener('click', onLoadBtnClick);

function onFormSubmit(e) {
  e.preventDefault();
  galleryContainerEl.innerHTML = '';

  fetchApiRequest();
}

async function fetchQuery(searchQuery, page) {
  const promise = await fetch(
    `${BASE_URL}/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=4`
  );
  page += 1;
  return promise.json();
}

function appendMarkup(imgArray) {
  imgArray.map(img => {
    galleryContainerEl.insertAdjacentHTML('beforeEnd', generateMarkup(img));
  });
}

function generateMarkup(img) {
  return `<div class="photo-card">
        <img src="${img.webformatURL}" alt="" loading="lazy" />
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

function fetchApiRequest(page) {
  const searchQuery = formEl.elements.searchQuery.value;

  fetchQuery(searchQuery)
    .then(r => {
      console.log(r);
      if (r.totalHits === 0) {
        console.log(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      const imgArr = getNecessaryFields(r);
      console.log(imgArr);

      return imgArr;
    })
    .then(appendMarkup)
    .then(() => {
      const per_page = 4;
      if (page * per_page >= r.totalHits) {
        console.log(
          "We're sorry, but you've reached the end of search results."
        );
      }
    });
}

function onLoadBtnClick(e) {
  fetchApiRequest();
}

// additional check
if (page * per_page >= r.totalHits) {
  console.log(
    '"We are sorry, but you have reached the end of search results."'
  );
}
