document.addEventListener('DOMContentLoaded', function() {
  // Quiz questions
  var questions = [
    {
      question: 'What is the capital of France?',
      choices: ['Paris', 'London', 'Berlin', 'Madrid'],
      answer: 'Paris'
    },
    {
      question: 'What is the capital of Bangladesh?',
      choices: ['Paris', 'London', 'Berlin', 'Dhaka'],
      answer: 'Paris'
    },
    {
      question: 'What is the capital of India?',
      choices: ['Paris', 'London', 'Delhi', 'Dhaka'],
      answer: 'Paris'
    },
    {
      question: 'What is the capital of United States?',
      choices: ['Paris', 'Delhi', 'Delhi', 'DC'],
      answer: 'Paris'
    },
    {
      question: 'What is the capital of Malaysia?',
      choices: ['Paris', 'Delhi', 'Kualalampur', 'Dhaka'],
      answer: 'Paris'
    },
    
  ];

  var currentQuestionIndex = 0;
  var score = 0;
  var time = 60;
  var timerInterval;

  var startButton = document.getElementById('start-btn');
  var quizContainer = document.getElementById('quiz-container');
  var questionElement = document.getElementById('question');
  var choicesElement = document.getElementById('choices');
  var submitButton = document.getElementById('submit-btn');
  var scoreContainer = document.getElementById('score-container');
  var scoreElement = document.getElementById('score');
  var initialsInput = document.getElementById('initials');
  var saveButton = document.getElementById('save-btn');
  var timerElement = document.getElementById('time');
  var highScoresElement = document.getElementById('high-scores');

  startButton.addEventListener('click', startQuiz);
  submitButton.addEventListener('click', checkAnswer);
  saveButton.addEventListener('click', saveScore);

  function startQuiz() {
    startButton.style.display = 'none';
    quizContainer.style.display = 'block';
    timerInterval = setInterval(updateTimer, 1000);

    displayQuestion();
  }

  function displayQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    choicesElement.innerHTML = '';
    currentQuestion.choices.forEach(function(choice) {
      var choiceButton = document.createElement('button');
      choiceButton.textContent = choice;
      choiceButton.classList.add('choice');
      choicesElement.appendChild(choiceButton);
    });
  }

  function checkAnswer() {
    var selectedChoice = event.target;
    var currentQuestion = questions[currentQuestionIndex];

    if (selectedChoice.textContent === currentQuestion.answer) {
      score++;
    } else {
      time -= 10; // Deduct 10 seconds for wrong answer
    }

    currentQuestionIndex++;

    if (currentQuestionIndex === questions.length) {
      endQuiz();
    } else {
      displayQuestion();
    }
  }

  function endQuiz() {
    clearInterval(timerInterval);
    quizContainer.style.display = 'none';
    scoreContainer.style.display = 'block';
    scoreElement.textContent = score;
  }

  function saveScore() {
    var initials = initialsInput.value.trim();

    if (initials !== '') {
      var highScores = JSON.parse(localStorage.getItem('highScores')) || [];
      var newScore = {
        initials: initials,
        score: score
      };
      highScores.push(newScore);
      localStorage.setItem('highScores', JSON.stringify(highScores));

      displayHighScores();
    }
  }

  function displayHighScores() {
    var highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    highScoresElement.innerHTML = '';

    highScores.forEach(function(score) {
      var scoreItem = document.createElement('p');
      scoreItem.textContent = score.initials + ' - ' + score.score;
      highScoresElement.appendChild(scoreItem);
    });
  }

  function updateTimer() {
    time--;
    timerElement.textContent = time;

    if (time <= 0) {
      endQuiz();
    }
  }
});