let e=1;async function t(t){let a=await fetch(`https://pixabay.com/api/?key=37711796-3b567f1c67dcaa6a50c805c9a&q=${t}&image_type=photo&orientation=horizontal&safesearch=true&page=${e}&per_page=100`).then(e=>e.json());return e+=1,a}document.querySelector("body");const a=document.querySelector(".search-form"),o=document.querySelector(".gallery"),s=document.querySelector(".load-more-btn");function n(e){!function(e){e.map(e=>{o.insertAdjacentHTML("beforeEnd",`<div class="photo-card">
        <div class="img-wrap">
          <img src="${e.webformatURL}" alt="" loading="lazy" class="card-img"/>
        </div>
        <div class="info">
          <p class="info-item">
            <b>Likes</b>${e.likes}
          </p>
          <p class="info-item">
            <b>Views</b>${e.views}
          </p>
          <p class="info-item">
            <b>Comments</b>${e.comments}
          </p>
          <p class="info-item">
            <b>Downloads</b>${e.downloads}
          </p>
        </div>
      </div>`)})}(e),s.classList.remove("is-hidden")}function i(){let i=a.elements.searchQuery.value;t(i).then(t=>{if(console.log(t),0===t.totalHits){console.log("Sorry, there are no images matching your search query. Please try again.");return}let{page:a,PER_PAGE:n}={page:e-1,PER_PAGE:100};if(console.log(a,n),a*n>=t.totalHits){let e=document.createElement("p");e.textContent="We're sorry, but you've reached the end of search results.",s.classList.add("is-hidden"),o.after(e);return}let i=t.hits.map(({webformatURL:e,largeImageURL:t,tags:a,likes:o,views:s,comments:n,downloads:i})=>({webformatURL:e,largeImageURL:t,tags:a,likes:o,views:s,comments:n,downloads:i}));return i}).then(n)}a.addEventListener("submit",function(t){t.preventDefault(),o.innerHTML="",e=1,i()}),s.addEventListener("click",i);
//# sourceMappingURL=index.31b805cd.js.map
