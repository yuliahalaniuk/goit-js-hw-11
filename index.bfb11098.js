!function(){function e(e,n,t,r,o,a,c){try{var i=e[a](c),s=i.value}catch(e){t(e);return}i.done?n(s):Promise.resolve(s).then(r,o)}var n=1;function t(){var r;return(r=function(e){var t;return function(e,n){var t,r,o,a,c={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function i(i){return function(s){return function(i){if(t)throw TypeError("Generator is already executing.");for(;a&&(a=0,i[0]&&(c=0)),c;)try{if(t=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return c.label++,{value:i[1],done:!1};case 5:c.label++,r=i[1],i=[0];continue;case 7:i=c.ops.pop(),c.trys.pop();continue;default:if(!(o=(o=c.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){c=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){c.label=i[1];break}if(6===i[0]&&c.label<o[1]){c.label=o[1],o=i;break}if(o&&c.label<o[2]){c.label=o[2],c.ops.push(i);break}o[2]&&c.ops.pop(),c.trys.pop();continue}i=n.call(e,c)}catch(e){i=[6,e],r=0}finally{t=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}}(this,function(r){switch(r.label){case 0:return[4,fetch("".concat("https://pixabay.com/api","/?key=").concat("37711796-3b567f1c67dcaa6a50c805c9a","&q=").concat(e,"&image_type=photo&orientation=horizontal&safesearch=true&page=").concat(n,"&per_page=").concat(100)).then(function(e){return e.json()})];case 1:return t=r.sent(),n+=1,[2,t]}})},t=function(){var n=this,t=arguments;return new Promise(function(o,a){var c=r.apply(n,t);function i(n){e(c,o,a,i,s,"next",n)}function s(n){e(c,o,a,i,s,"throw",n)}i(void 0)})}).apply(this,arguments)}document.querySelector("body");var r=document.querySelector(".search-form"),o=document.querySelector(".gallery"),a=document.querySelector(".load-more-btn");function c(e){!function(e){e.map(function(e){o.insertAdjacentHTML("beforeEnd",'<div class="photo-card">\n        <div class="img-wrap">\n          <img src="'.concat(e.webformatURL,'" alt="" loading="lazy" class="card-img"/>\n        </div>\n        <div class="info">\n          <p class="info-item">\n            <b>Likes</b>').concat(e.likes,'\n          </p>\n          <p class="info-item">\n            <b>Views</b>').concat(e.views,'\n          </p>\n          <p class="info-item">\n            <b>Comments</b>').concat(e.comments,'\n          </p>\n          <p class="info-item">\n            <b>Downloads</b>').concat(e.downloads,"\n          </p>\n        </div>\n      </div>"))})}(e),a.classList.remove("is-hidden")}function i(){(function(e){return t.apply(this,arguments)})(r.elements.searchQuery.value).then(function(e){if(console.log(e),0===e.totalHits){console.log("Sorry, there are no images matching your search query. Please try again.");return}var t={page:n-1,PER_PAGE:100},r=t.page,c=t.PER_PAGE;if(console.log(r,c),r*c>=e.totalHits){var i=document.createElement("p");i.textContent="We're sorry, but you've reached the end of search results.",a.classList.add("is-hidden"),o.after(i);return}return e.hits.map(function(e){return{webformatURL:e.webformatURL,largeImageURL:e.largeImageURL,tags:e.tags,likes:e.likes,views:e.views,comments:e.comments,downloads:e.downloads}})}).then(c)}r.addEventListener("submit",function(e){e.preventDefault(),o.innerHTML="",n=1,i()}),a.addEventListener("click",i)}();
//# sourceMappingURL=index.bfb11098.js.map