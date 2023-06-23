import axios from 'axios';

const API_KEY = '37711796-3b567f1c67dcaa6a50c805c9a';
const BASE_URL = 'https://pixabay.com/api';
const PER_PAGE = 100;
let page = 1;

export function getPaginationSet() {
  return { page: page - 1, PER_PAGE };
}

export async function fetchQuery(searchQuery) {
  const promise = await axios.get(
    `${BASE_URL}/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${PER_PAGE}`
  );

  page += 1;
  return promise.data;
}

export function resetPage() {
  page = 1;
}
