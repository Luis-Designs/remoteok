const inputSearchJob = document.getElementById('searchJob') as HTMLInputElement;
const searchJobDropIcon = document.getElementById('searchJobDropIcon');
const ulSearchJob = document.querySelector(
  'ul[id="searchJob"]'
) as HTMLUListElement;

let isInputFocused = false;
let inputPlaceholder = inputSearchJob.placeholder;

const _handleFocusInputElement = (input: HTMLInputElement) => {
  if (isInputFocused) {
    input.blur();
    input.placeholder = inputPlaceholder;
    isInputFocused = false;
  } else {
    input.focus();
    input.placeholder = 'Type...';
    isInputFocused = true;
  }
};

inputSearchJob?.addEventListener('click', () => {
  ulSearchJob.classList.toggle('open');
  _handleFocusInputElement(inputSearchJob);
  _handleEnabledButton();
  _handleHiddenJobPosting();
});

searchJobDropIcon?.addEventListener('click', () => {
  ulSearchJob?.classList.toggle('open');
  _handleFocusInputElement(inputSearchJob);
});

// Función para filtrar los elementos de la lista
const filterListSearchJob = () => {
  const searchText = inputSearchJob.value.toLowerCase();
  const elements = ulSearchJob.getElementsByTagName('li');
  for (let i = 0; i < elements.length; i++) {
    const text = elements[i].id.toLowerCase();
    if (text.includes(searchText)) {
      elements[i].style.display = 'block';
    } else {
      elements[i].style.display = 'none';
    }
  }
};

// Función de "throttle" para limitar la tasa de llamadas mientras el usuario escribe
function throttle(fn: Function, delay: number) {
  let lastCall = 0;
  return function (...args: any[]) {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    fn(...args);
  };
}

// Función de "debounce" para limitar las llamadas a la función a una sola vez después de un retraso
function debounce(fn: Function, delay: number) {
  let timer: number;
  return function (...args: any[]) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

inputSearchJob.addEventListener(
  'input',
  debounce(throttle(filterListSearchJob, 300), 500)
);

/* ENABLED BUTTON */
const sortingFiltersSearch = document.querySelector(
  '.sorting-filters-search'
) as HTMLElement;

const buttonsFiltersSearch = Array.from(
  sortingFiltersSearch.querySelectorAll('button')
) as HTMLButtonElement[];

const _handleEnabledButton = () => {
  buttonsFiltersSearch.map((button, i) => {
    button.classList.remove('sorting-filters-search--show');
    button.setAttribute('disabled', '');

    if (button.id.toLowerCase() === inputSearchJob.value.toLowerCase()) {
      button.classList.add('sorting-filters-search--show');
      button.removeAttribute('disabled');
    }
  });
};

/* FILTER ACTIVE */
const jobPostingContainer = document.querySelector(
  '.job-posting-container'
) as HTMLElement;

const divsJobPosting = Array.from(
  jobPostingContainer.querySelectorAll('div[class="job-posting"]')
) as HTMLDivElement[];

const _handleHiddenJobPosting = () => {
  if (inputSearchJob.value.toLowerCase() === '') {
    return;
  }

  divsJobPosting.map((divJobPosting) => {
    divJobPosting.classList.toggle('hidden');
    const buttons = divJobPosting.children[2].children;
    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i].id.includes(inputSearchJob.value.toLowerCase())) {
        divJobPosting.classList.toggle('hidden');
      }
    }
  });
};

const remoteJobAdvertisement = document.querySelector(
  '.remote-job-advertisement'
) as HTMLDivElement;

remoteJobAdvertisement.children[2].addEventListener('click', () => {
  remoteJobAdvertisement.classList.toggle('hidden');
});

divsJobPosting.map((divJobPosting) => {
  const [button] = divJobPosting.children[4].children;
  button.addEventListener('click', () => {
    button.classList.toggle('btn-active-apply');
    divJobPosting.nextElementSibling?.classList.toggle('hidden');
  });
});
