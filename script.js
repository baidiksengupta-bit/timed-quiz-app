// 1. Question Bank (20 Questions)
const questions = [
  {
    text: "Which HTML tag is used to define an internal style sheet?",
    choices: ["<css>", "<script>", "<style>", "<link>"],
    correct: 2
  },
  {
    text: "Which of the following is NOT a JavaScript data type?",
    choices: ["Undefined", "Number", "Float", "Boolean"],
    correct: 2
  },
  {
    text: "What does API stand for?",
    choices: [
      "Application Programming Interface",
      "Applied Program Interaction",
      "Automated Protocol Integration",
      "Application Process Instruction"
    ],
    correct: 0
  },
  {
    text: "Which method removes the last element from an array in JavaScript?",
    choices: ["shift()", "pop()", "push()", "unshift()"],
    correct: 1
  },
  {
    text: "What is the time complexity of binary search on a sorted array?",
    choices: ["O(n)", "O(n log n)", "O(1)", "O(log n)"],
    correct: 3
  },
  {
    text: "Which CSS property is used to change text color?",
    choices: ["text-color", "color", "font-color", "text-style"],
    correct: 1
  },
  {
    text: "What is the output of typeof NaN in JavaScript?",
    choices: ["number", "NaN", "undefined", "object"],
    correct: 0
  },
  {
    text: "Which HTTP status code signifies 'Not Found'?",
    choices: ["200", "500", "404", "403"],
    correct: 2
  },
  {
    text: "Which data structure operates on a First-In, First-Out (FIFO) basis?",
    choices: ["Stack", "Queue", "Tree", "Graph"],
    correct: 1
  },
  {
    text: "How do you declare an arrow function in JavaScript?",
    choices: [
      "function => myFunc()",
      "const myFunc = () => {}",
      "def myFunc() =>",
      "function:myFunc() => {}"
    ],
    correct: 1
  },
  {
    text: "Which command initializes a new Git repository?",
    choices: ["git start", "git new", "git init", "git clone"],
    correct: 2
  },
  {
    text: "What does the === operator check in JavaScript?",
    choices: [
      "Value only",
      "Value and type",
      "Reference address only",
      "Type only"
    ],
    correct: 1
  },
  {
    text: "Which CSS layout model is designed for one-dimensional layouts?",
    choices: ["Flexbox", "Grid", "Table", "Float"],
    correct: 0
  },
  {
    text: "Which JavaScript function converts a JSON string into an object?",
    choices: [
      "JSON.toObject()",
      "JSON.stringify()",
      "JSON.parse()",
      "JSON.convert()"
    ],
    correct: 2
  },
  {
    text: "What is the base of the hexadecimal number system?",
    choices: ["2", "8", "10", "16"],
    correct: 3
  },
  {
    text: "Which method adds an event listener to an element in JavaScript?",
    choices: [
      "element.attachListener()",
      "element.addEventListener()",
      "element.listen()",
      "element.onEvent()"
    ],
    correct: 1
  },
  {
    text: "What does SQL stand for?",
    choices: [
      "Structured Question Language",
      "Structured Query Language",
      "Simple Query Logic",
      "System Query Layout"
    ],
    correct: 1
  },
  {
    text: "Which array method creates a new array with filtered items?",
    choices: ["forEach()", "filter()", "reduce()", "find()"],
    correct: 1
  },
  {
    text: "Which tag is used to create a hyperlink in HTML?",
    choices: ["<link>", "<a>", "<href>", "<url>"],
    correct: 1
  },
  {
    text: "What does the keyword const mean in JavaScript?",
    choices: [
      "The variable cannot be reassigned",
      "The variable is completely immutable",
      "The variable has global scope only",
      "The variable is hoisted as undefined"
    ],
    correct: 0
  }
];

// 2. Wrap initialization inside DOMContentLoaded so HTML is guaranteed to exist
document.addEventListener("DOMContentLoaded", () => {
  const questionText = document.getElementById("question-text");
  const answerButtons = document.getElementById("answer-buttons");
  const timerEl = document.getElementById("timer");
  const scoreCount = document.getElementById("score-count");
  const questionBox = document.getElementById("question-box");
  const resultBox = document.getElementById("result-box");
  const finalScore = document.getElementById("final-score");
  const restartBtn = document.getElementById("restart-btn");

  let currentIndex = 0;
  let score = 0;
  let timeLeft = 10;
  let timerId = null;

  function startQuiz() {
    currentIndex = 0;
    score = 0;
    if (scoreCount) scoreCount.textContent = score;
    if (resultBox) resultBox.classList.add("hidden");
    if (questionBox) questionBox.classList.remove("hidden");
    loadQuestion();
  }

  function loadQuestion() {
    resetTimer();

    const currentQ = questions[currentIndex];
    questionText.textContent = `${currentIndex + 1}. ${currentQ.text}`;
    answerButtons.innerHTML = "";

    currentQ.choices.forEach((choice, index) => {
      const btn = document.createElement("button");
      btn.textContent = choice;
      btn.classList.add("btn");
      btn.addEventListener("click", () => handleAnswer(index));
      answerButtons.appendChild(btn);
    });

    startTimer();
  }

  function startTimer() {
    timeLeft = 10;
    if (timerEl) timerEl.textContent = timeLeft;

    timerId = setInterval(() => {
      timeLeft--;
      if (timerEl) timerEl.textContent = timeLeft;

      if (timeLeft <= 0) {
        clearInterval(timerId);
        nextQuestion();
      }
    }, 1000);
  }

  function resetTimer() {
    if (timerId) clearInterval(timerId);
  }

  function handleAnswer(selectedIndex) {
    resetTimer();

    if (selectedIndex === questions[currentIndex].correct) {
      score++;
      if (scoreCount) scoreCount.textContent = score;
    }

    nextQuestion();
  }

  function nextQuestion() {
    currentIndex++;
    if (currentIndex < questions.length) {
      loadQuestion();
    } else {
      showResults();
    }
  }

  function showResults() {
    resetTimer();
    if (questionBox) questionBox.classList.add("hidden");
    if (resultBox) resultBox.classList.remove("hidden");
    if (finalScore) {
      finalScore.textContent = `You scored ${score} out of ${questions.length}!`;
    }
  }

  if (restartBtn) {
    restartBtn.addEventListener("click", startQuiz);
  }

  startQuiz();
});