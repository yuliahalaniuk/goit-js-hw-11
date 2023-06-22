const API_KEY = '37711796-3b567f1c67dcaa6a50c805c9a';
const BASE_URL = 'https://pixabay.com/api';

export async function fetchQuery(searchQuery, page) {
  const promise = await fetch(
    `${BASE_URL}/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=4`
  );
  page += 1;
  return promise.json();
}
