document.addEventListener("DOMContentLoaded", () => {
  const currentPage = document.body.dataset.page || "";
  const header = document.querySelector("#site-header");
  const footer = document.querySelector("#site-footer");

  const pages = [
    ["home", "Home", "index.html"],
    ["about", "About", "about.html"],
    ["projects", "Projects", "projects.html"],
    ["services", "Services", "services.html"],
    ["blog", "Blog", "blog.html"],
    ["skills", "Skills", "careers.html"],
    ["contact", "Contact", "contact.html"]
  ];

  if (header) {
    const navigation = pages.map(([key, label, url]) => `
      <a class="nav-link ${currentPage === key ? "active" : ""}"
         href="${url}"
         ${currentPage === key ? 'aria-current="page"' : ""}>
        ${label}
      </a>
    `).join("");

    header.innerHTML = `
      <header class="site-header">
       
      <div class="container nav-wrap">
          <img src="images/loo.jpg"  alt="logo" width="100" height="100">
      <a class="logo" href="index.html">
            MY PERSONAL PORTFOLIO.<span class="logo-mark">.</span>
          </a>

          <button class="menu-toggle"
                  id="menuToggle"
                  type="button"
                  aria-label="Open navigation menu"
                  aria-expanded="false"
                  aria-controls="siteNav">
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav class="site-nav" id="siteNav" aria-label="Main navigation">
            ${navigation}
            <button class="theme-toggle"
                    id="themeToggle"
                    type="button"
                    aria-label="Switch to dark mode">
              ☾
            </button>
          </nav>
        </div>
      </header>
    `;

    const menuButton = document.querySelector("#menuToggle");
    const navigationMenu = document.querySelector("#siteNav");
    const themeButton = document.querySelector("#themeToggle");

    const closeMenu = () => {
      navigationMenu.classList.remove("is-open");
      menuButton.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation menu");
      document.body.classList.remove("menu-open");
    };

    menuButton.addEventListener("click", () => {
      const isOpen = navigationMenu.classList.toggle("is-open");

      menuButton.classList.toggle("is-open", isOpen);
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
      );
      document.body.classList.toggle("menu-open", isOpen);
    });

    navigationMenu.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    const savedTheme = localStorage.getItem("softly-theme");

    if (savedTheme === "dark") {
      document.body.classList.add("dark");
      themeButton.textContent = "☀";
      themeButton.setAttribute("aria-label", "Switch to light mode");
    }

    themeButton.addEventListener("click", () => {
      const darkMode = document.body.classList.toggle("dark");

      themeButton.textContent = darkMode ? "☀" : "☾";
      themeButton.setAttribute(
        "aria-label",
        darkMode ? "Switch to light mode" : "Switch to dark mode"
      );

      localStorage.setItem("softly-theme", darkMode ? "dark" : "light");
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  if (footer) {
    footer.innerHTML = `
      <footer class="site-footer">
        <div class="container footer-wrap">
          <p class="lead">&copy; ${new Date().getFullYear()} RONNY OPIYO ODHIAMBO. All rights reserved.</p>
          <a class="footer-link" href="contact.html">Start a conversation →</a>
        </div>
      </footer>
    `;
  }

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  document.querySelectorAll(".read-more").forEach((button) => {
    button.addEventListener("click", () => {
      const article = button.closest(".blog-card");
      const expanded = article.classList.toggle("expanded");

      button.textContent = expanded
        ? "Hide article ↑"
        : "Read article →";
    });
  });

  document.querySelectorAll(".apply-button").forEach((button) => {
    button.addEventListener("click", () => {
      const role = button.dataset.role;
      const message = document.querySelector("#application-message");

      if (message) {
        message.textContent =
          
          "Please send your message to ronnyopiyo124@gmail.com or kidly go to the contact page and contact me.Thank you and have a great website day!";

        message.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }
    });
  });

  document.querySelectorAll("form[data-form-message]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const messageId = form.dataset.formMessage;
      const message = document.getElementById(messageId);

      if (message) {
        message.textContent =
          "Thank you. Your message has been received successfully.";
      }

      form.reset();
    });
  });
});

const slider = document.querySelector(".image-slider");

let position = 0;

setInterval(() => {

    position += window.innerWidth * 0.8;

    if (position >= slider.scrollWidth - slider.clientWidth) {
        position = 0;
    }

    slider.scrollTo({
        left: position,
        behavior: "smooth"
    });

}, 4000);

let slideIndex = 1;

showSlide(slideIndex);


// Next / Previous buttons

function changeSlide(n) {
    showSlide(slideIndex += n);
}


// Dot navigation

function currentSlide(n) {
    showSlide(slideIndex = n);
}


// Show slide

function showSlide(n) {

    let slides = document.querySelectorAll(".slide");
    let dots = document.querySelectorAll(".dot");


    // Go back to first slide

    if (n > slides.length) {
        slideIndex = 1;
    }


    // Go to last slide

    if (n < 1) {
        slideIndex = slides.length;
    }


    // Hide all images

    slides.forEach(function(slide) {
        slide.classList.remove("active");
    });


    // Remove active dot

    dots.forEach(function(dot) {
        dot.classList.remove("active-dot");
    });


    // Show current image

    slides[slideIndex - 1].classList.add("active");


    // Activate current dot

    dots[slideIndex - 1].classList.add("active-dot");
}


// Automatic slider

setInterval(function() {

    changeSlide(1);

}, 4000);
