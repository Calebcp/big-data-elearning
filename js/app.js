const courseConfig = {
  projectName: "Big Data E-Learning",
  modules: [
    {
      id: "module-1",
      title: "Introduction to Big Data",
      activity: "Is this Big Data?"
    },
    {
      id: "module-2",
      title: "The 5 Vs of Big Data",
      activity: "Explore the five characteristics"
    },
    {
      id: "module-3",
      title: "Types and Sources of Data",
      activity: "Classify sample data"
    },
    {
      id: "module-4",
      title: "How Big Data Works",
      activity: "Build a data pipeline"
    },
    {
      id: "module-5",
      title: "Applications and Challenges",
      activity: "Choose responses to real-world scenarios"
    }
  ]
};

document.addEventListener("DOMContentLoaded", () => {
  setupMobileNavigation();
  setupPrototypeForms();
});

function setupMobileNavigation() {
  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.querySelector("#site-nav");

  if (!navToggle || !siteNav) {
    return;
  }

  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

function setupPrototypeForms() {
  const forms = document.querySelectorAll("[data-prototype-form]");

  forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const message = form.querySelector(".form-message");
      if (message) {
        message.textContent = "Prototype only: no account data was saved.";
      }
    });
  });
}

// Future module progress section:
// Add functions here to mark lessons complete and update progress indicators.

// Future LocalStorage section:
// Add save/load helpers here so progress can persist in the same browser.

// Future quiz section:
// Add reusable question rendering, answer checking, and feedback helpers here.

// Future activity section:
// Add matching, sorting, scenario, and data-pipeline interaction helpers here.

// Future scoring section:
// Add score calculation and completion screen logic here.
