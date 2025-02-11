(function () {
  "use strict";

  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  function aosInit() {
    AOS.init({
      duration: 400,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  document.querySelectorAll('.carousel-indicators').forEach((carouselIndicator) => {
    carouselIndicator.closest('.carousel').querySelectorAll('.carousel-item').forEach((carouselItem, index) => {
      if (index === 0) {
        carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}" class="active"></li>`;
      } else {
        carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}"></li>`;
      }
    });
  });

  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  new PureCounter();

})();

document.addEventListener('DOMContentLoaded', function () {
  const properties = [
    {

      title: "Modern Condominium Building",
      status: "RENTED 2024",
      description: "A contemporary four-story structure with beige and white cladding, large windows, covered parking, and a clean, minimalist design."
    },
    {
      title: "Modern Rooftop Deck",
      status: "RENTED 2024",
      description: "This Chelsea condo features 3 bedrooms, 2 full baths, a covered parking space, and a rooftop deck. Rented for $3,600 – happy tenants!"

    }
  ];

  const slide = document.querySelector('.carousel-slide');
  let currentIndex = 0;

  function updateContent() {
    const property = properties[currentIndex];
    document.querySelector('.carousel-title').textContent = property.title;
    document.querySelector('.carousel-status').textContent = property.status;
    document.querySelector('.carousel-description').textContent = property.description;
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % 2;
    slide.style.transform = `translateX(-${currentIndex * 50}%)`;
    updateContent();
  }

  const images = document.querySelectorAll('.carousel-slide img');
  images.forEach(img => {
    img.onerror = function () {
      console.error(`Error loading image: ${img.src}`);
      img.src = 'assets/img/fallback-image.png';
    };
  });

  updateContent();

  setInterval(nextSlide, 6000);
});

let statesAndCities = {};

const stateSelect = document.querySelector('select[name="state"]');
const citySelect = document.querySelector('select[name="city"]');

async function loadJSON() {
  try {
    const response = await fetch('/forms/US_States_and_Cities.json');
    if (!response.ok) {
      throw new Error('No se pudo cargar el archivo JSON');
    }
    statesAndCities = await response.json();
    loadStates();
  } catch (error) {
    console.error('Error cargando el JSON:', error);
  }
}

function loadStates() {
  stateSelect.value = 'Massachusetts';
  loadCities('Massachusetts');
}

function loadCities(state) {
  const defaultOption = citySelect.options[0];
  citySelect.innerHTML = '';
  citySelect.appendChild(defaultOption);

  if (!state) return;

  statesAndCities[state].forEach(city => {
    const option = document.createElement('option');
    option.value = city;
    option.textContent = city;
    citySelect.appendChild(option);
  });
}

stateSelect.addEventListener('change', (e) => {
  loadCities(e.target.value);
  citySelect.value = '';
});

document.addEventListener('DOMContentLoaded', loadJSON);