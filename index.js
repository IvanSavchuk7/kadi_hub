document.addEventListener("DOMContentLoaded", function () {
    const sectionElements = document.querySelectorAll(`
  .fade-effect,
  .fade-effect-strong,
  .fade-effect-strong2,
  .fade-effect-strong3
`);
    const observerOptions = {
        threshold: 0.5
    };

    const fadeInOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sectionElements.forEach(element => {
        fadeInOnScroll.observe(element);
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const burgerCheckbox = document.getElementById("burger");
    const nav = document.querySelector("nav.nav-mobile");
    const navWrapper = document.querySelector(".nav-wrapper");

    window.addEventListener("scroll", () => {
        const triggerY = 650;
        if (window.scrollY > triggerY && !burgerCheckbox.checked) {
            navWrapper.classList.add("scrolled");
        } else {
            navWrapper.classList.remove("scrolled");
        }
    });

    burgerCheckbox.addEventListener("change", () => {
        if (burgerCheckbox.checked) {
            nav.style.transform = "translateY(0)";
            document.body.classList.add("no-scroll");
            navWrapper.classList.remove("scrolled");
        } else {
            nav.style.transform = "translateY(-100%)";
            document.body.classList.remove("no-scroll");
        }
    });

    // Close menu when a nav link is clicked
    document.querySelectorAll(".nav-mobile a").forEach(link => {
        link.addEventListener("click", () => {
            burgerCheckbox.checked = false;
            nav.style.transform = "translateY(-100%)";
            document.body.classList.remove("no-scroll");
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const counters = document.querySelectorAll(".number span");
    let animated = false;

    function animateCounters() {
        if (animated) return;

        const numbersWrapper = document.querySelector(".numbers-wrapper");
        const wrapperTop = numbersWrapper.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (wrapperTop < windowHeight - 100) {
            counters.forEach(counter => {
                const rawText = counter.textContent;
                const isDollar = rawText.includes('$');
                const isPlus = rawText.includes('+');

                const target = parseInt(rawText.replace(/\D/g, ''), 10);
                let current = 0;
                const duration = 5000;
                const increment = Math.ceil(target / (duration / 20));

                const formatter = new Intl.NumberFormat('de-DE');

                const update = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(update);
                    }
                    counter.textContent =
                        (isDollar ? '$' : '') + formatter.format(current) + (isPlus ? '+' : '');
                }, 20);
            });

            animated = true;
        }
    }

    window.addEventListener("scroll", animateCounters);
});

document.addEventListener("DOMContentLoaded", function () {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const circle = entry.target.querySelector(".circle");
                    circle.classList.add("animate");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 1,
        }
    );

    const animationBlock = document.getElementById("line-animation");
    if (animationBlock) {
        observer.observe(animationBlock);
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const items = document.querySelectorAll(".department-item");

    items.forEach(item => {
        item.addEventListener("mouseenter", () => {
            // Remove active from all
            items.forEach(el => el.classList.remove("active"));
            // Add to current
            item.classList.add("active");
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const departmentItems = document.querySelectorAll(".department-item");
    const innerBlocks = document.querySelectorAll(".wrapper .inner");

    departmentItems.forEach(item => {
        item.addEventListener("mouseenter", () => {
            const target = item.querySelector(".inner")?.dataset.department || item.dataset.department;

            innerBlocks.forEach(block => {
                if (block.dataset.department === target) {
                    block.classList.add("active");
                } else {
                    block.classList.remove("active");
                }
            });
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const items = document.querySelectorAll(".department-item");

    items.forEach(item => {
        item.addEventListener("click", function () {
            // Remove active class from all
            items.forEach(i => i.classList.remove("active"));
            // Add to tapped one
            this.classList.add("active");
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const section = document.querySelector('section.benefits .top');
    const texts = section.querySelectorAll('.text');
    let triggered = false;

    function onScroll() {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (!triggered && sectionTop < windowHeight - 100) {
        triggered = true;

        texts.forEach((el, i) => {
          setTimeout(() => {
            el.classList.add('visible');
          }, i * 1250);
        });

        window.removeEventListener('scroll', onScroll);
      }
    }

    window.addEventListener('scroll', onScroll);
    onScroll();
  });

function updatePlayerButtons(swiperInstance) {
    const slides = swiperInstance.slides;

    slides.forEach(slide => {
        const img = slide.querySelector('.player-button img');
        if (!img) return;

        if (slide.classList.contains('swiper-slide-active')) {
            img.src = 'assets/images/player-button.svg';
        } else {
            img.src = 'assets/images/player-button-grey.svg';
        }
    });
}

function updateNavState(swiperInstance) {
    const prev = document.querySelector('.swiper-button-prev');
    const next = document.querySelector('.swiper-button-next');

    prev.classList.remove('disabled');
    next.classList.remove('disabled');

    if (swiperInstance.realIndex === 0) {
        prev.classList.add('disabled');
    }

    if (swiperInstance.realIndex === swiperInstance.slides.length - swiperInstance.loopedSlides - 1) {
        next.classList.add('disabled');
    }
}

function disableScroll() {
    const scrollY = window.scrollY || window.pageYOffset;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
}

function enableScroll() {
    const scrollY = document.body.style.top;

    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';

    window.scrollTo(0, parseInt(scrollY || '0') * -1);
}

new TypeIt('#typed-block', {
    speed: 40,
    waitUntilVisible: true,
    afterComplete: function (instance) {
        instance.destroy();
    }
}).go();

new TypeIt('#typed-block-2', {
    speed: 50,
    waitUntilVisible: true,
    afterComplete: function (instance) {
        instance.destroy();
    }
}).go();

new TypeIt('#typed-block-3', {
    speed: 150,
    waitUntilVisible: true,
    afterComplete: function (instance) {
        instance.destroy();
    }
}).go();

new TypeIt('#typed-block-4', {
    speed: 50,
    waitUntilVisible: true,
    afterComplete: function (instance) {
        instance.destroy();
    }
}).go();

var swiper = new Swiper(".feedback-swiper", {
    slidesPerView: 1.25,
    spaceBetween: -100,
    centeredSlides: true,
    allowTouchMove: false,
    loop: true,
    on: {
        init(swiperInstance) {
            updatePlayerButtons(swiperInstance);
            updateNavState(swiperInstance);
        },
        slideChangeTransitionEnd(swiperInstance) {
            updatePlayerButtons(swiperInstance);
            updateNavState(swiperInstance);
        }
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        600: {
            slidesPerView: 2,
            spaceBetween: -75,
            centeredSlides: true,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: -75,
            centeredSlides: true,
        },
        1100: {
            slidesPerView: 3,
            spaceBetween: -100,
            centeredSlides: true,
        },
    }
});




