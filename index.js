document.addEventListener("DOMContentLoaded", function () {
    const checkbox = document.getElementById("burger");
    const nav = document.querySelector("nav.nav-mobile");

    checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
            nav.style.transform = "translateY(0)";
        } else {
            nav.style.transform = "translateY(-100%)";
        }
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

                // Get numeric value from text (remove non-digit characters)
                const target = parseInt(rawText.replace(/\D/g, ''), 10);
                let current = 0;
                const duration = 3000;
                const increment = Math.ceil(target / (duration / 20));

                const formatter = new Intl.NumberFormat('de-DE'); // Use dots like 1.000.000

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
                    observer.unobserve(entry.target); // only once
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
