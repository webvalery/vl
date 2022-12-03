gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
ScrollSmoother.create({
  wrapper: '.gsap-wrapper',
  content: '.gsap-content',
  smooth: 2.3,               
  effects: true,           
  smoothTouch: 0.1,       
});

const cursor = document.getElementById('cursor'),
      follower = document.getElementById('aura'),
      links = document.getElementById('a');
let mouseX = 0, mouseY = 0, posX = 0, posY = 0;

function mouseCoords(e){
  mouseX = e.clientX;
  mouseY = e.clientY;
}

gsap.to({}, .01, {
  repeat: -1,
  onRepeat: () => {
    posX += (mouseX - posX) / 5;
    posY += (mouseY - posY) / 5;

    gsap.set(follower, {
      css: {
        left: posX - 24,
        top: posY - 24
      }
    })

    gsap.set(cursor, {
      css: {
        left: mouseX,
        top: mouseY
      }
    })
  }
})

document.querySelector('body').addEventListener('mousemove', (event) => {
  cursor.classList.remove('hidden');
  follower.classList.remove('hidden');
  mouseCoords(event);
});

document.querySelector('body').addEventListener('mouseout', (event) => {
  cursor.classList.add('hidden');
  follower.classList.add('hidden');
});

// Услуги
const body = document.querySelector('body');
const servicesList = document.querySelector('.services__list');
if (servicesList) {
  const servicesItemList = servicesList.querySelectorAll('.services__item');
  const servicesSubItemList = servicesList.querySelectorAll('.services__subitem');

  servicesItemList.forEach(item => {
    let servicesItemBtn = item.querySelector('.services__item-btn');
    servicesItemBtn.addEventListener('click', (event) => {
      deleteActiveClass(item);
      openCategoryItem(item);
    });
  });

  servicesSubItemList.forEach(item => {
    let servicesSubitemBtn = item.querySelector('.services__subitem-btn');
    servicesSubitemBtn.addEventListener('click', (event) => {
      // openCategoryItem(item);
      item.querySelector('.services__subitem-btn').classList.toggle('active');
      item.querySelector('.services__subsublist').classList.toggle('active');
    });
  });

  // Сворачивание всех категорий, кроме текущей
  function deleteActiveClass(itemCurrent) {
    let allActiveEl = servicesList.querySelectorAll('.active')
    allActiveEl.forEach(el => {
      if(el.closest('.services__item') !== itemCurrent) {
        el.classList.remove('active');
      }
    });
  }

  // Открытие категории 1-ого уровня
  function openCategoryItem(item) {    
    let servicesItemBtn = item.querySelector('.services__item-btn');
    let servicesSublist = item.querySelector('.services__sublist');
    servicesItemBtn.classList.toggle('active');
    servicesSublist.classList.toggle('active');
  }

  // Кнопки-стрелки на картинке
  const servicesSymbol = document.querySelector('.services__symbol');
  if(servicesSymbol) {
    let servicesSymbolBtns = servicesSymbol.querySelectorAll('.services__symbol-btn');
    servicesSymbolBtns.forEach(btn => {
      btn.addEventListener('click', (event) => {
        openCategoryArrow(btn);
      });
    });
  }

  function openCategoryArrow(btn) {
    servicesItemList.forEach(item => {
      if(btn.getAttribute('data-type') === item.getAttribute('data-type')) {
        deleteActiveClass(item);
        openCategoryItem(item);
      }
    });
  }
}

// Слайдер gallery
new Swiper('.gallery-slider', {
  slidesPerView: 5,
  spaceBetween: 0,
  slidesPerGroup: 1,
  loop: true,

  effect: 'coverflow',
  coverflowEffect: {
    rotate: 20,
    stretch: 50,
    slideShadows: true,
  },
  
  // Пагинация
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction',
    // буллеты
    clickable: true,
    dynamicBullets: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
  },
  scrollbar: {
    el: '.swiper-scrollbar',
    draggable: true
  },
  mousewheel: {
    sensitivity: 1,
    eventsTarget: '.gallery-slider'
  },
  autoHeight: true,
  autoplay: {
    delay: 1000,
    disableOnInteraction: false
  },
});

// Слайдер apparatus
new Swiper('.apparatus-slider', {
  slidesPerView: 1,
  navigation: {
    nextEl: '.apparatus-slider__next',
    prevEl: '.apparatus-slider__prev',
  },
  autoplay: false,
  centeredSlides: true,
  effect: "fade",
  fadeEffect: {
    crossFade: true
  },
  pagination: {
      el: ".swiper-pagination",
      type: "fraction",
  },
});

// Слайдер certificate
new Swiper('.certificate-slider', {
  slidesPerView: 3,
  spaceBetween: 30,
  autoplay: {
    delay: 2000,
    stopOnLastSlide: false,
    disableOnInteraction: false,
  },
});

// Слайдер specialists
const specialistsSliderHtml = document.querySelector('.specialists-slider');
if(specialistsSliderHtml) {
  const specialistsSlider = new Swiper('.specialists-slider', {
    slidesPerView: 3,
    spaceBetween: 100,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    mousewheel: {
      sensitivity: 1,
      eventsTarget: '.specialists-slider'
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'progressbar'
    },
    autoplay: {
      delay: 5000,
      stopOnLastSlide: false,
      disableOnInteraction: false,
    },
  });

  let mySliderCurrentSlide = specialistsSliderHtml.querySelector('.specialists-slider__current');
  let mySliderAllSlides = specialistsSliderHtml.querySelector('.specialists-slider__total');
  console.log()
  mySliderAllSlides.innerHTML = specialistsSlider.slides.length - specialistsSlider.params.slidesPerView + 1;
  specialistsSlider.on('slideChange', function() {
    let currentSlide = ++specialistsSlider.realIndex;
    mySliderCurrentSlide.innerHTML = currentSlide; 
  });
}

// Слайдер recom
const recomSliderHtml = document.querySelector('.recom-slider');
if(recomSliderHtml) {
  const recomSlider = new Swiper('.recom-slider', {
    slidesPerView: 3,
    spaceBetween: 100,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    mousewheel: {
      sensitivity: 1,
      eventsTarget: '.recom-slider'
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'progressbar'
    },
    effect: 'coverflow',
    coverflowEffect: {
      rotate: 30,
      slideShadows: true,
    },
    autoplay: {
      delay: 2000,
      stopOnLastSlide: false,
      disableOnInteraction: false,
    },
  }); 
}

// Модальное окно обратной связи
let disappearsBtnList = document.querySelectorAll('.disappears-btn');
if(disappearsBtnList) {
  let popupBg = document.querySelector('.popup-back-call-bg');
  let popup = popupBg.querySelector('.popup-back-call');
  let closeBtn = popupBg.querySelector('.call__close-btn');
  disappearsBtnList.forEach(disappearsBtn => {
    disappearsBtn.addEventListener('click', (event) => {
      event.preventDefault();
      popupBg.classList.add('active');
      popup.classList.add('active');
    });
  });

  popupBg.addEventListener('click', (event) => {
    event.preventDefault();
    if(event.target === popupBg) {
      popupBg.classList.remove('active');
      popup.classList.remove('active');
    }
  });

  closeBtn.addEventListener('click', (event) => {
    event.preventDefault();
    popupBg.classList.remove('active');
    popup.classList.remove('active');
  });
}

// Модальное окно услуги
let servicesSubsubitemBtns = document.querySelectorAll('.services__subsubitem-btn');
let popupServiceBg = document.querySelector('.popup-service-bg');
if (servicesSubsubitemBtns) {
  servicesSubsubitemBtns.forEach(btn => {
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      popupServiceBg.classList.add('active');
      body.classList.add('blocked');
    });
  });

  popupServiceBg.addEventListener('click', (event) => {
    if(event.target.classList.contains('popup-service__prev-btn')) {
      popupServiceBg.classList.remove('active');
      body.classList.remove('blocked');
    }
  });

  // Слайдер before after
  let popupServiceDemo = document.querySelector('.popup-service__demo');
  let popupServiceDemoResize = popupServiceDemo.querySelector('.popup-service__demo-resize');
  let widthPopup = popupServiceDemo.offsetWidth;
  popupServiceDemo.addEventListener('mousemove', (event) => {
    popupServiceDemoResize.classList.remove('tr');
    let x = event.offsetX;
    let calc = (x * 100) / widthPopup;
    popupServiceDemoResize.style.width = calc + '%';
    console.log(calc)
  });
  
  popupServiceDemo.addEventListener('mouseleave', (event) => {
    popupServiceDemoResize.style.width = 50 + '%';
    popupServiceDemoResize.classList.add('tr');
  });  
}


// Параллакс листьев
let servicesLeafSheet1 = document.querySelector('.services__leaf-sheet1');
let servicesLeafSheet2 = document.querySelector('.services__leaf-sheet2');
let servicesLeafSheet3 = document.querySelector('.services__leaf-sheet3');
let servicesLeafBottom = document.querySelector('.services__leaf-bottom');
let clinicLeafCenter = document.querySelector('.clinic__leaf-center');
let certificateLeafImg1 = document.querySelector('.certificate__leaf-img1');
let certificateLeafImg2 = document.querySelector('.certificate__leaf-img2');
let certificateLeafImg3 = document.querySelector('.certificate__leaf-img3');
let certificateLeafImg4 = document.querySelector('.certificate__leaf-img4');

let previousScroll = 0;
let currentScroll = 0;
let topKf1 = 0, topKf2 = 0, topKf3 = 0, topKf5 = 0, topKf6 = 0, topKf7 = 0, bottomKf1 = 0;

document.addEventListener('scroll', (event) => {
  currentScroll = window.pageYOffset;
  
  let posTopServices1 = servicesLeafSheet1.getBoundingClientRect().top;
  let isVisibilityServices1 = posTopServices1 + servicesLeafSheet1.clientHeight <= window.innerHeight && posTopServices1 >= 0;

  let posTopServices2 = servicesLeafSheet2.getBoundingClientRect().top;
  let isVisibilityServices2 = posTopServices2 + servicesLeafSheet2.clientHeight <= window.innerHeight && posTopServices2 >= 0;

  let posTopServices3 = servicesLeafSheet3.getBoundingClientRect().top;
  let isVisibilityServices3 = posTopServices3 + servicesLeafSheet3.clientHeight <= window.innerHeight && posTopServices3 >= 0;

  let posTopServices4 = servicesLeafBottom.getBoundingClientRect().top;
  let isVisibilityServices4 = posTopServices4 < window.innerHeight;

  let posTopServices5 = certificateLeafImg1.getBoundingClientRect().top;
  let isVisibilityServices5 = posTopServices5 + certificateLeafImg1.clientHeight <= window.innerHeight && posTopServices5 >= 0;

  let posTopServices6 = certificateLeafImg2.getBoundingClientRect().top;
  let isVisibilityServices6 = posTopServices6 + certificateLeafImg2.clientHeight <= window.innerHeight && posTopServices6 >= 0;

  let posTopServices7 = certificateLeafImg3.getBoundingClientRect().top;
  let isVisibilityServices7 = posTopServices7 + certificateLeafImg3.clientHeight <= window.innerHeight && posTopServices7 >= 0;

  let posTopServices8 = certificateLeafImg4.getBoundingClientRect().top;
  let isVisibilityServices8 = posTopServices8 + certificateLeafImg4.clientHeight <= window.innerHeight && posTopServices8 >= 0;

  if(currentScroll > previousScroll) {

    if(isVisibilityServices1 && topKf1 < 220) {
      topKf1 = topKf1 + 3;
      servicesLeafSheet1.style.top = topKf1 + 'px';
    }
    
    if(isVisibilityServices2 && topKf2 < 150) {
      topKf2 = topKf2 + 4;
      servicesLeafSheet2.style.top = topKf2 + 'px';
    }

    if(isVisibilityServices3 && topKf3 < 150) {
      topKf3 = topKf3 + 2;
      servicesLeafSheet3.style.top = topKf3 + 'px';
    }

    if(isVisibilityServices4) {
      servicesLeafBottom.style.bottom = -54 + 'px';
      servicesLeafBottom.style.transform = 'scale(0.6)';
    }

    if(isVisibilityServices5 && topKf5 < 70) {
      topKf5 = topKf5 + 2;
      certificateLeafImg1.style.top = topKf5 + 'px';
    }

    if(isVisibilityServices6 && topKf6 < 100) {
      topKf6 = topKf6 + 2;
      certificateLeafImg2.style.top = topKf6 + 'px';
    }

    if(isVisibilityServices7 && topKf7 < 70) {
      topKf7 = topKf7 + 3.5;
      certificateLeafImg3.style.top = topKf7 + 'px';
    }

    if(isVisibilityServices8 && bottomKf1 < 70) {
      bottomKf1 = bottomKf1 - 3.5;
      certificateLeafImg4.style.bottom = -85 + '%';
      certificateLeafImg4.style.left = -30 + '%';
      certificateLeafImg4.style.transform = 'scale(-0.8, 0.8) rotate(360deg)';
    }

  } else {

    if(isVisibilityServices1 && topKf1 > -115) {
      topKf1 = topKf1 - 5;
      servicesLeafSheet1.style.top = topKf1 + 'px';
    }

    if(isVisibilityServices2 && topKf2 > - 50) {
      topKf2 = topKf2 - 7;
      servicesLeafSheet2.style.top = topKf2 + 'px';
    }

    if(isVisibilityServices3 && topKf3 > 60) {
      topKf3 = topKf3 - 2;
      servicesLeafSheet3.style.top = topKf3 + 'px';
    }

    if(isVisibilityServices5 && topKf5 > -20) {
      topKf5 = topKf5 - 4;
      certificateLeafImg1.style.top = topKf5 + 'px';
    }

    if(isVisibilityServices6 && topKf6 > -80) {
      topKf6 = topKf6 - 3;
      certificateLeafImg2.style.top = topKf6 + 'px';
    }

    if(isVisibilityServices7 && topKf7 > -50) {
      topKf7 = topKf7 - 3.5;
      certificateLeafImg3.style.top = topKf7 + 'px';
    }
  }


  previousScroll = window.pageYOffset;
});

// Параллакс бочки
/*
    let topIndent = 0;
 
    console.log(headerParallaxSheet1.getBoundingClientRect().top)
    document.addEventListener('scroll', (e) => {
        currentScroll = window.pageYOffset;
        let posTop = headerParallaxSheet1.getBoundingClientRect().top;
        // Блок целиком находится в видимой зоне
        // let areaСondition = posTop + gasParallax.clientHeight <= window.innerHeight && posTop >= 0;

        // Блок достиг верхней границы экрана (или выше)
        // let areaСondition = posTop <= 0;

        // Блок только появляется снизу (или выше)
        let areaСondition = posTop < window.innerHeight;
        if (areaСondition && currentScroll > previousScroll && topIndent < 120) {
            topIndent = topIndent + 3;
            headerParallaxSheet1.style.top = `${topIndent}px`;
        } else if (areaСondition && currentScroll < previousScroll && topIndent > -75) {
            topIndent = topIndent - 3;
            headerParallaxSheet1.style.top = `${topIndent}px`;
        }
        previousScroll = window.pageYOffset;
    });


*/




























// Карта
let mapRender = document.querySelector('.map__render');
if (mapRender) {
  function init() {
    let map = new ymaps.Map('map-render', {
      center: [51.80119910072757,107.6047449576721],
      zoom: 18,
    });

    let placemark = new ymaps.Placemark([51.80092807337309,107.60505558982867], {
      balloonContent: `<p class="map-ballon">Ул. Бабушкина 166</p>`,
      
    },
    {
      iconLayout: 'default#image',
      iconImageHref: 'img/placemark.png',
      iconImageSize: [70, 70],
      iconImageOffset: [-100, -70],
      hideIconOnBalloonOpen: false,
      closeButton: false,
    });

    map.geoObjects.add(placemark);
    placemark.balloon.open();

    map.controls.remove('geolocationControl'); // удаляем геолокацию
    map.controls.remove('searchControl'); // удаляем поиск
    map.controls.remove('trafficControl'); // удаляем контроль трафика
    map.controls.remove('typeSelector'); // удаляем тип
    map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
    map.controls.remove('zoomControl'); // удаляем контрол зуммирования
    map.controls.remove('rulerControl'); // удаляем контрол правил
    // map.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)    
  }
  ymaps.ready(init);
}