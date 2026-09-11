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
  setupThemePicker();
  setupMobileNavigation();
  setupPrototypeForms();
  setupBigDataActivity();
  setupFinalQuiz();
});

function setupThemePicker() {
  const headerContent = document.querySelector(".header-content");
  const siteNav = document.querySelector("#site-nav");

  if (!headerContent || !siteNav) {
    return;
  }

  const themes = [
    { id: "autumn", label: "Autumn" },
    { id: "winter", label: "Winter" },
    { id: "summer", label: "Summer" }
  ];
  const savedTheme = getSavedTheme();
  const startingTheme = themes.some((theme) => theme.id === savedTheme) ? savedTheme : "autumn";

  document.documentElement.dataset.theme = startingTheme;

  const picker = document.createElement("div");
  picker.className = "theme-picker";

  const label = document.createElement("label");
  label.setAttribute("for", "theme-select");
  label.textContent = "Theme";

  const select = document.createElement("select");
  select.id = "theme-select";
  select.setAttribute("aria-label", "Choose site theme");

  themes.forEach((theme) => {
    const option = document.createElement("option");
    option.value = theme.id;
    option.textContent = theme.label;
    option.selected = theme.id === startingTheme;
    select.appendChild(option);
  });

  select.addEventListener("change", () => {
    document.documentElement.dataset.theme = select.value;
    saveTheme(select.value);
  });

  picker.append(label, select);
  headerContent.insertBefore(picker, siteNav);
}

function getSavedTheme() {
  try {
    return localStorage.getItem("siteTheme");
  } catch (error) {
    return null;
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem("siteTheme", theme);
  } catch (error) {
    return;
  }
}

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

function setupBigDataActivity() {
  const activity = document.querySelector("[data-big-data-activity]");

  if (!activity) {
    return;
  }

  activity.querySelectorAll(".activity-feedback").forEach((feedback) => {
    feedback.dataset.message = feedback.textContent.trim();
  });

  activity.addEventListener("click", (event) => {
    const selectedButton = event.target.closest("[data-answer]");

    if (!selectedButton) {
      return;
    }

    const question = selectedButton.closest(".activity-question");
    const feedback = question.querySelector(".activity-feedback");
    const correctAnswer = feedback.dataset.correct;
    const selectedAnswer = selectedButton.dataset.answer;
    const isCorrect = selectedAnswer === correctAnswer;

    question.querySelectorAll("[data-answer]").forEach((button) => {
      button.classList.remove("is-selected", "is-correct", "is-incorrect");
    });

    selectedButton.classList.add("is-selected", isCorrect ? "is-correct" : "is-incorrect");
    feedback.classList.add("is-visible");
    feedback.textContent = isCorrect
      ? `Correct. ${feedback.dataset.message}`
      : `Try again. ${feedback.dataset.message}`;
  });
}

function setupFinalQuiz() {
  const quiz = document.querySelector("[data-final-quiz]");

  if (!quiz) {
    return;
  }

  const questions = [
    {
      question: "Which example is closest to Big Data?",
      options: ["A single homework grade", "Millions of app clicks every minute", "A handwritten grocery list"],
      correctIndex: 1
    },
    {
      question: "Which V describes whether data can be trusted?",
      options: ["Velocity", "Veracity", "Volume"],
      correctIndex: 1
    },
    {
      question: "What is the first stage in the simple data pipeline?",
      options: ["Analyze", "Use", "Collect"],
      correctIndex: 2
    }
  ];

  let currentIndex = 0;
  let score = 0;

  const counter = quiz.querySelector("[data-quiz-counter]");
  const questionTitle = quiz.querySelector("[data-quiz-question]");
  const optionsArea = quiz.querySelector("[data-quiz-options]");
  const feedback = quiz.querySelector("[data-quiz-feedback]");
  const results = quiz.querySelector("[data-quiz-results]");
  const restartButton = quiz.querySelector("[data-quiz-restart]");

  function renderQuestion() {
    const currentQuestion = questions[currentIndex];

    counter.textContent = `Question ${currentIndex + 1} of ${questions.length}`;
    questionTitle.textContent = currentQuestion.question;
    feedback.textContent = "";
    optionsArea.innerHTML = "";

    currentQuestion.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.className = "button button-secondary";
      button.type = "button";
      button.textContent = option;
      button.addEventListener("click", () => handleAnswer(index));
      optionsArea.appendChild(button);
    });
  }

  function handleAnswer(selectedIndex) {
    const currentQuestion = questions[currentIndex];
    const isCorrect = selectedIndex === currentQuestion.correctIndex;

    if (isCorrect) {
      score += 1;
      feedback.textContent = "Correct.";
    } else {
      feedback.textContent = `Not quite. Correct answer: ${currentQuestion.options[currentQuestion.correctIndex]}.`;
    }

    currentIndex += 1;

    if (currentIndex >= questions.length) {
      showResults();
      return;
    }

    setTimeout(renderQuestion, 900);
  }

  function showResults() {
    counter.textContent = "Prototype quiz complete";
    questionTitle.textContent = "Finished";
    optionsArea.innerHTML = "";
    results.textContent = `Score: ${score} out of ${questions.length}. This is a demo result for the V1 prototype.`;
  }

  restartButton.addEventListener("click", () => {
    currentIndex = 0;
    score = 0;
    results.textContent = "Answer the questions to see your prototype score.";
    renderQuestion();
  });

  renderQuestion();
}

// Future module progress section:
// Add functions here to mark lessons complete and update progress indicators.

// Future LocalStorage section:
// Add save/load helpers here so progress can persist in the same browser.

// Future quiz section:
// Expand the demo quiz into the final assessment after all module questions are approved.

// Future activity section:
// Add matching, sorting, scenario, and data-pipeline interaction helpers for later modules.

// Future scoring section:
// Add score calculation and completion screen logic here.
