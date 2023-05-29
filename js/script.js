'use strict'

lightGallery(document.querySelector('.section-gallery__wrapper'), {
    // plugins: [lgZoom, lgThumbnail],
    // licenseKey: 'your_license_key',
    speed: 500,
})


const tabsSwiper = new Swiper('.tabs__swiper', {
    navigation: {
        nextEl: '.tabs__swiper-button-next',
        prevEl: '.tabs__swiper-button-prev',
      },
      slidesPerView: 5,
      spaceBetween: 20,
      breakpoints: {
        0: {
            slidesPerView: 1.1,
            spaceBetween: 10,
        },
        576: {
            slidesPerView: 2.1,
            spaceBetween: 10,
        },

        800: {
            slidesPerView: 3.1,
            spaceBetween: 10,
        },
        1280: {
            slidesPerView: 4,
            spaceBetween: 20,
        },
        1600: {
            slidesPerView: 5,
        },
      },
})

// Фукція яка при потрібних розмірах робить з блоку слайдер.
function isMobileViewport(cls, width) {
    if(window.innerWidth < width) {

        let timeSlide = document.querySelectorAll(cls)
    
        timeSlide.forEach(slide => {
            slide.classList.add('swiper-slide')
        })
    }
}

isMobileViewport('.time__swiper-slide', 1024)


const timeSwiper = new Swiper('.time__swiper', {
    slidesPerView: 2,
    loop: true,
    navigation: {
        nextEl: '.time__swiper-button-next',
        prevEl: '.time__swiper-button-prev',
      },

      breakpoints: {
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
      },
      pagination: {
        el: '.time__swiper-pagination',
        clickable: true
      }
})

const eventsSwiper = new Swiper('.events__swiper', {
    
    spaceBetween: 10,
    breakpoints: {
        0: {
            slidesPerView: 1.2, 
        },
        768: {
            slidesPerView: 2.5,
        }
    }
})

isMobileViewport('.events__swiper-slide', 1280)

const managersSwiper = new Swiper('.managers__swiper', {
    slidesPerView: 3,
    spaceBetween: 10,
    navigation: {
        nextEl: '.managers__swiper-button-next',
        prevEl: '.managers__swiper-button-prev',
      },
    breakpoints: {
        0: {
            slidesPerView: 1.2, 
        },
        768: {
            slidesPerView: 2.5,
        },
        1024: {
            slidesPerView: 3,
        },
    },

    on: {
        init: function () {
          if (this.slides.length <= this.params.slidesPerView) {
            this.navigation.update();
            this.navigation.disable();
          } else {
            this.navigation.update();
            this.navigation.enable();
          }
        },
      },
})

managersSwiper.update();

// Перевіряємо чи "touch" чи "pc"
const isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBorry: function() {
        return navigator.userAgent.match(/BlackBorry/i);
    },
    IOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (
            isMobile.Android() ||
            isMobile.BlackBorry() ||
            isMobile.IOS() ||
            isMobile.Opera() ||
            isMobile.Windows()
        );
    }
};

if (isMobile.any()){
    document.body.classList.add('_touch');
} else {
    document.body.classList.add('_pc');
}

let events = document.body.classList.contains('_touch') ? 'click' : 'mousemove';


// Робимо бургер меню
function activeBurger() {
    let btn = document.querySelector('.header__burger')
    let header = document.querySelector('.header')

    if(btn) {
        let navInner = document.querySelector('.header__inner')

        btn.addEventListener('click', function() {
            this.classList.toggle('active')
            navInner.classList.toggle('active')
            header.classList.toggle('active')
        })
    }
}
activeBurger()

// Показуємо список понктів мов
function activeListSelect() {
    let selectActive = document.querySelectorAll('.select')

    if(selectActive.length > 0) {
        selectActive.forEach(btn => {

            let selecteList = btn.querySelector('.select-list')
            // let selectActive = select.querySelector('.select-active')
    
            if(document.body.classList.contains('_pc')) {
                btn.addEventListener(events, function() {
                    selecteList.classList.add('active')
                })
    
                btn.addEventListener('mouseleave', function() {
                    selecteList.classList.remove('active')
                })
            } else if(document.body.classList.contains('_touch')) {
                if (selectActive) {
                    btn.addEventListener('click', function() {
                        selecteList.classList.toggle('active')

                        if(btn.classList.contains('location')) {
                            let active = btn.querySelector('.select-active')
                            let opcions = btn.querySelectorAll('.selec-item')

                            opcions.forEach(opc => {
                                opc.addEventListener('click', function() {
                                    let src = opc.querySelector('img').src
                                    
                                    active.querySelector('img').src = src
                                })
                            })
                        }
                    })
                }
            }
        }) 
    }
}
activeListSelect()

// Робимо 'вкл - викл' для кнопки .melody
function playMusik() {
    let btns = document.querySelectorAll('.melody')

    if(btns.length >= 0) {
        let audio = document.querySelector('.box-melody audio')

        btns.forEach(btn => {
            btn.addEventListener('click', function() {
                this.classList.toggle('active')
    
                if(this.classList.contains('active')) {
                    audio.play()
                } else {
                    audio.pause()
                }
            })
        })
    }
}
playMusik()

// При скролі додаємо класс для Header.
function headerScroll() {
    let header = document.querySelector('.header')

    if(header) {
        document.addEventListener('scroll', function() {
            if(window.scrollY > 0) {
                header.classList.add('scroll')
            } else {
                header.classList.remove('scroll')
            }
        })
    }
}
headerScroll()

// Робимо таби.
function activeTab() {
    let tabsBtns = document.querySelectorAll('.tabs-header__btn')
    let tabsbody = document.querySelectorAll('.tabs__body')

    if(tabsBtns) {
        tabsBtns.forEach(item => {
            item.addEventListener('click', function() {
                removeClassActive(tabsBtns, 'active-tab')
                removeClassActive(tabsbody, 'active-tab-body')
                this.classList.add('active-tab')

                let index = this.dataset.tab
                
                let body = document.querySelector(`.tabs-body-${index}`)

                if(body) {
                    body.classList.add('active-tab-body')
                }
            })
        })
    }
}

function removeClassActive(list, cls) {
    list.forEach(item => {
        item.classList.remove(cls)
    })
            
}

activeTab()


// Робимо селект для мобілки.
function createselect() {
    let current = document.querySelector('.tabs-header__current')
    let name = current.querySelector('span')
    let opcions = document.querySelector('.tabs-header__opcions')
    let opcionsItem = opcions.querySelectorAll('.tabs-header__btn')

    if(current) {
        current.addEventListener('click', function() {
            let opcions = current.nextElementSibling

            if(opcions) {
                if(this.classList.contains('show')) {
                    this.classList.remove('show')
                    opcions.style.height = `0px`
                } else {
                    this.classList.add('show')
                    opcions.style.height = `${opcions.scrollHeight}px`
                }
            }
        })

        opcionsItem.forEach(item => {
            item.addEventListener('click', function() {
                let text = this.innerText
                current.classList.remove('show')
                opcions.style.height = `0px`
                name.innerHTML = text
            })

            if(item.classList.contains('active-tab')) {
                let text = item.innerText
                name.innerHTML = text
            }   
        })
    }
}
createselect()

// Ховаємо кнопки слайдера коли елементів менше чиа задано.
function hiddenBtnSlider() {
    let tabsSlider = document.querySelectorAll('.tabs__swiper')

    if(tabsSlider) {
        let length = 5

        // if(window.matchMedia("(max-width: 1280px)").matches) {
        //     length = 4
        // }

        tabsSlider.forEach(wrapper => {
            let list = wrapper.querySelectorAll('.tabs__swiper-slide')

            if(list.length <= length) {
                let btnPrewSlider = wrapper.querySelectorAll('.tabs__swiper-button-prev')
                let tabsNextSlider = wrapper.querySelectorAll('.tabs__swiper-button-next')

                btnPrewSlider.forEach(btn => {
                    btn.classList.add('hidden')
                })

                tabsNextSlider.forEach(btn => {
                    btn.classList.add('hidden')
                })
            }
        })
    }
}

hiddenBtnSlider()
window.addEventListener('resize', hiddenBtnSlider)


// Робимо по сайту клік на кнупку і показуємо додаткову інформацію.
function goMore() {
    let btnMore = document.querySelectorAll('.go-info')

    if(btnMore) {
        btnMore.forEach(btn => {
            btn.addEventListener('click', function() {
                let body = this.nextElementSibling

                if(this.classList.contains('active')) {
                    this.classList.remove('active')
                    body.style.height = `0px`
                } else {
                    this.classList.add('active')
                    body.style.height = `${body.scrollHeight}px`
                }
            })
        })
    }
}

goMore()


// Робимо навігацію доя відео.
function playVideo() {
    let play = document.querySelectorAll('.video-play')

    if(play.length >= 0) {
        play.forEach(btn => {
            btn.addEventListener('click', function() {
            let video = this.parentNode.querySelector('video')
            let discription = this.parentNode.querySelector('.events__discription')

                if(this.classList.contains('active')) {
                    this.classList.remove('active')
                    discription.classList.remove('hidden')
                    video.pause()
                    video.controls = false
                } else {
                    this.classList.add('active')
                    discription.classList.add('hidden')
                    video.play()
                    video.controls = true
                }
            })
        })
    }
}
playVideo()


// Робимо прокрутку до якорря по сайту.
function scrollAnchor() {
    let btns = document.querySelectorAll('.btn-scroll')
    let header = document.querySelector('.header')
    let headerInner  = document.querySelector('.header__inner')
    let burger  = document.querySelector('.header__burger')

    if(btns.length > 0) {
        btns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault()

                if(headerInner.classList.contains('active')) {
                    headerInner.classList.remove('active')
                    burger.classList.remove('active')
                }

                let id = this.dataset.id
                
                let section = document.getElementById(`${id}`)

                window.scrollBy({
                    top: section.getBoundingClientRect().top - (header.clientHeight + 20),
                    behavior: "smooth"
                })
            })
        })
    }
}
scrollAnchor()