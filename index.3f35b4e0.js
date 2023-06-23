let e=1;async function t(t){let a=await fetch(`https://pixabay.com/api/?key=37711796-3b567f1c67dcaa6a50c805c9a&q=${t}&image_type=photo&orientation=horizontal&safesearch=true&page=${e}&per_page=100`).then(e=>e.json());return e+=1,a}const a=document.querySelector(".search-form"),s=document.querySelector(".search-btn"),r=document.querySelector(".gallery"),n=document.querySelector(".load-more-btn");function i(e){!function(e){e.map(e=>{r.insertAdjacentHTML("beforeEnd",`<div class="photo-card">
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
      </div>`)})}(e),n.classList.remove("is-hidden")}function o(){let o=a.elements.searchQuery.value;s.disabled=!0,t(o).then(t=>{if(0===t.totalHits){if(document.querySelector(".error-text"))return;let e=document.createElement("p");e.classList.add("error-text"),e.textContent="Sorry, there are no images matching your search query. Please try again.",s.disabled=!0,n.classList.add("is-hidden"),r.after(e);return}let{page:a,PER_PAGE:i}={page:e-1,PER_PAGE:100};if(a*i>=t.totalHits){if(document.querySelector(".error-text"))return;let e=document.createElement("p");e.classList.add("end-text"),e.textContent="We're sorry, but you've reached the end of search results.",n.classList.add("is-hidden"),r.after(e);return}let o=t.hits.map(({webformatURL:e,largeImageURL:t,tags:a,likes:s,views:r,comments:n,downloads:i})=>({webformatURL:e,largeImageURL:t,tags:a,likes:s,views:r,comments:n,downloads:i}));return o}).then(i).finally(()=>{s.disabled=!1})}a.addEventListener("submit",function(t){t.preventDefault(),r.innerHTML="",e=1,o()}),n.addEventListener("click",o);
//# sourceMappingURL=index.3f35b4e0.js.map
