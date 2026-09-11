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
  setupChoiceActivities();
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
        message.textContent = "This screen is ready for backend account connection.";
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

function setupChoiceActivities() {
  const activities = document.querySelectorAll("[data-choice-activity]");

  activities.forEach((activity) => {
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
      const isCorrect = selectedButton.dataset.answer === feedback.dataset.correct;

      question.querySelectorAll("[data-answer]").forEach((button) => {
        button.classList.remove("is-selected", "is-correct", "is-incorrect");
      });

      selectedButton.classList.add("is-selected", isCorrect ? "is-correct" : "is-incorrect");
      feedback.classList.add("is-visible");
      feedback.textContent = isCorrect
        ? `Correct. ${feedback.dataset.message}`
        : `Try again. ${feedback.dataset.message}`;
    });
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
    },
    {
      question: "Which V describes many different forms of data, such as text, images, and video?",
      options: ["Variety", "Value", "Veracity"],
      correctIndex: 0
    },
    {
      question: "Which example is usually unstructured data?",
      options: ["A customer table", "A traffic camera video", "A spreadsheet of scores"],
      correctIndex: 1
    },
    {
      question: "What does processing data usually involve?",
      options: ["Cleaning and preparing raw data", "Deleting every record", "Ignoring missing values"],
      correctIndex: 0
    },
    {
      question: "Why is value important in Big Data?",
      options: ["It means the data supports a useful decision", "It means the data is always private", "It means the data is small"],
      correctIndex: 0
    },
    {
      question: "Which action is a responsible data practice?",
      options: ["Collect all possible data", "Hide how data is used", "Collect only data that is needed"],
      correctIndex: 2
    },
    {
      question: "Which pipeline stage looks for trends or patterns?",
      options: ["Store", "Analyze", "Collect"],
      correctIndex: 1
    },
    {
      question: "What is veracity mostly about?",
      options: ["How trustworthy the data is", "How colorful the data is", "How old the website is"],
      correctIndex: 0
    },
    {
      question: "Which source could produce high-velocity data?",
      options: ["A printed poster", "Live sensor readings", "One saved note"],
      correctIndex: 1
    },
    {
      question: "What problem can biased data cause?",
      options: ["Unfair or inaccurate results", "Faster internet speed", "Better colors on a page"],
      correctIndex: 0
    },
    {
      question: "Which statement best describes Big Data?",
      options: ["Data that is large, fast, complex, or useful for finding patterns", "Any single number", "Only data stored on paper"],
      correctIndex: 0
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
    const percentage = Math.round((score / questions.length) * 100);

    counter.textContent = "Quiz complete";
    questionTitle.textContent = "Finished";
    optionsArea.innerHTML = "";
    results.textContent = `Score: ${score} out of ${questions.length} (${percentage}%). Review any missed topics, then move back through the modules to strengthen your understanding.`;
  }

  restartButton.addEventListener("click", () => {
    currentIndex = 0;
    score = 0;
    results.textContent = "Answer the questions to see your score and review guidance.";
    renderQuestion();
  });

  renderQuestion();
}
