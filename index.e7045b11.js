const inputSearchJob=document.getElementById("searchJob"),searchJobDropIcon=document.getElementById("searchJobDropIcon"),ulSearchJob=document.querySelector('ul[id="searchJob"]');let isInputFocused=!1,inputPlaceholder=inputSearchJob.placeholder;const _handleFocusInputElement=e=>{isInputFocused?(e.blur(),e.placeholder=inputPlaceholder,isInputFocused=!1):(e.focus(),e.placeholder="Type...",isInputFocused=!0)};inputSearchJob?.addEventListener("click",(()=>{ulSearchJob.classList.toggle("open"),_handleFocusInputElement(inputSearchJob),_handleEnabledButton(),_handleHiddenJobPosting()})),searchJobDropIcon?.addEventListener("click",(()=>{ulSearchJob?.classList.toggle("open"),_handleFocusInputElement(inputSearchJob)}));const filterListSearchJob=()=>{const e=inputSearchJob.value.toLowerCase(),t=ulSearchJob.getElementsByTagName("li");for(let o=0;o<t.length;o++){t[o].id.toLowerCase().includes(e)?t[o].style.display="block":t[o].style.display="none"}};function throttle(e,t){let o=0;return function(...n){const s=(new Date).getTime();s-o<t||(o=s,e(...n))}}function debounce(e,t){let o;return function(...n){clearTimeout(o),o=setTimeout((()=>{e(...n)}),t)}}inputSearchJob.addEventListener("input",debounce(throttle(filterListSearchJob,300),500));const sortingFiltersSearch=document.querySelector(".sorting-filters-search"),buttonsFiltersSearch=Array.from(sortingFiltersSearch.querySelectorAll("button")),_handleEnabledButton=()=>{buttonsFiltersSearch.map(((e,t)=>{e.classList.remove("sorting-filters-search--show"),e.setAttribute("disabled",""),e.id.toLowerCase()===inputSearchJob.value.toLowerCase()&&(e.classList.add("sorting-filters-search--show"),e.removeAttribute("disabled"))}))},jobPostingContainer=document.querySelector(".job-posting-container"),divsJobPosting=Array.from(jobPostingContainer.querySelectorAll('div[class="job-posting"]')),_handleHiddenJobPosting=()=>{""!==inputSearchJob.value.toLowerCase()&&divsJobPosting.map((e=>{e.classList.toggle("hidden");const t=e.children[2].children;for(let o=0;o<t.length;o++)t[o].id.includes(inputSearchJob.value.toLowerCase())&&e.classList.toggle("hidden")}))},remoteJobAdvertisement=document.querySelector(".remote-job-advertisement");remoteJobAdvertisement.children[2].addEventListener("click",(()=>{remoteJobAdvertisement.classList.toggle("hidden")})),divsJobPosting.map((e=>{const[t]=e.children[4].children;t.addEventListener("click",(()=>{t.classList.toggle("btn-active-apply"),e.nextElementSibling?.classList.toggle("hidden")}))}));
//# sourceMappingURL=index.e7045b11.js.map
