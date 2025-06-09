document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Handle contact form submission
  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const name = this.querySelector('input[placeholder="nombre"]').value;
      const email = this.querySelector('input[placeholder="Email"]').value;
      const phone = this.querySelector('input[placeholder="celular"]').value;
      const message = this.querySelector(
        'textarea[placeholder="mensaje"]'
      ).value;

      if (!name || !email || !message) {
        alert("Por favor, completa todos los campos obligatorios.");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Por favor, ingresa un email válido.");
        return;
      }

      alert("¡Gracias por tu mensaje! Te contactaré pronto.");

      this.reset();
    });
  }

  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-item");

  function updateActiveNav() {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.remove("active");
      const link = item.querySelector("a");
      if (link && link.getAttribute("href") === `#${current}`) {
        item.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveNav);

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll(
    ".service-item, .project-description, .project-image"
  );
  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });
});

window.addEventListener("load", function () {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";

  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});
