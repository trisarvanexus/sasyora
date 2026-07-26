/* ==========================================================
   SASYORA™
   script.js
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================
       Sticky Header
    ========================== */

    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 60) {

            header.style.background = "rgba(255,255,255,.96)";
            header.style.boxShadow = "0 8px 25px rgba(0,0,0,.08)";
            header.style.height = "75px";

        } else {

            header.style.background = "rgba(255,255,255,.82)";
            header.style.boxShadow = "0 5px 20px rgba(0,0,0,.05)";
            header.style.height = "";

        }

    });

    /* ==========================
       Scroll Reveal
    ========================== */

    const revealElements = document.querySelectorAll(
        ".section, .glass-card, .benefit-card, .product-grid, .pollachi-grid, .timeline > div"
    );

    const reveal = () => {

        const trigger = window.innerHeight * 0.88;

        revealElements.forEach((el) => {

            const top = el.getBoundingClientRect().top;

            if (top < trigger) {

                el.classList.add("active");
                el.classList.add("reveal");

            }

        });

    };

    window.addEventListener("scroll", reveal);

    reveal();

    /* ==========================
       FAQ Accordion
    ========================== */

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {

        const question = item.querySelector(".faq-question");

        if (!question) return;

        question.addEventListener("click", () => {

            faqItems.forEach(i => {

                if (i !== item) {

                    i.classList.remove("active");

                }

            });

            item.classList.toggle("active");

        });

    });

    /* ==========================
       Active Navigation
    ========================== */

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll("nav a");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 140;

            if (pageYOffset >= top) {

                current = section.getAttribute("id");

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");

            }

        });

    });

    /* ==========================
       Back To Top Button
    ========================== */

    const button = document.createElement("button");

    button.innerHTML = "↑";

    button.className = "backToTop";

    document.body.appendChild(button);

    button.style.cssText = `
        position:fixed;
        right:25px;
        bottom:25px;
        width:55px;
        height:55px;
        border:none;
        border-radius:50%;
        background:#2E7D32;
        color:#fff;
        font-size:24px;
        cursor:pointer;
        display:none;
        z-index:9999;
        box-shadow:0 10px 30px rgba(0,0,0,.2);
        transition:.3s;
    `;

    button.addEventListener("click", () => {

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

    window.addEventListener("scroll", () => {

        button.style.display =

            window.scrollY > 500 ? "block" : "none";

    });

    /* ==========================
       Floating Leaves
    ========================== */

    for (let i = 0; i < 8; i++) {

        const leaf = document.createElement("div");

        leaf.className = "leaf";

        leaf.innerHTML = "🍃";

        leaf.style.left = Math.random() * 100 + "%";

        leaf.style.fontSize =

            18 + Math.random() * 20 + "px";

        leaf.style.animationDuration =

            10 + Math.random() * 12 + "s";

        leaf.style.animationDelay =

            Math.random() * 6 + "s";

        document.body.appendChild(leaf);

    }

    /* ==========================
       Hero Parallax
    ========================== */

    const hero = document.querySelector(".hero");

    window.addEventListener("scroll", () => {

        const offset = window.pageYOffset;

        if (hero) {

            hero.style.backgroundPositionY = offset * 0.5 + "px";

        }

    });

    /* ==========================
       Counter Animation
    ========================== */

    const counters = document.querySelectorAll(".counter");

    const startCounter = counter => {

        const target = +counter.dataset.target;

        const speed = target / 150;

        let count = 0;

        const update = () => {

            count += speed;

            if (count < target) {

                counter.innerText = Math.floor(count);

                requestAnimationFrame(update);

            } else {

                counter.innerText = target;

            }

        };

        update();

    };

    const counterObserver = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                startCounter(entry.target);

                counterObserver.unobserve(entry.target);

            }

        });

    });

    counters.forEach(counter => {

        counterObserver.observe(counter);

    });

    /* ==========================
       Smooth Anchor Scroll
    ========================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function(e){

            e.preventDefault();

            const target = document.querySelector(this.getAttribute("href"));

            if(target){

                target.scrollIntoView({

                    behavior:"smooth",

                    block:"start"

                });

            }

        });

    });

});
