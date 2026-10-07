// Questions
let questions = [
  {
    question: "Which video game has sold the most copies worldwide?",
    answers: ["Minecraft", "GTA V", "Wii Sports", "PUBG"],
    correct: 0
  },
  {
    question: "Approximately how many copies has Minecraft sold?",
    answers: ["200 million", "300 million", "350 million", "400 million"],
    correct: 2
  },
  {
    question: "Which game has sold more than 200 million copies?",
    answers: ["GTA V", "The Witcher 3", "Red Dead Redemption 2", "Mario Kart 8"],
    correct: 0
  },
  {
    question: "Which game is the best-selling Nintendo Switch game?",
    answers: ["Super Mario Odyssey", "Mario Kart 8 Deluxe", "Animal Crossing: New Horizons", "Breath of the Wild"],
    correct: 1
  },
  {
    question: "In which year was GTA V originally released?",
    answers: ["2011", "2012", "2013", "2014"],
    correct: 2
  },
  {
    question: "Which game sold more than 80 million copies on the Wii?",
    answers: ["Mario Kart Wii", "Wii Sports", "Wii Fit", "Super Mario Galaxy"],
    correct: 1
  },
  {
    question: "Which of these games was released first?",
    answers: ["Minecraft", "GTA V", "The Witcher 3", "Red Dead Redemption 2"],
    correct: 0
  },
  {
    question: "Which game has sold approximately 50 million copies?",
    answers: ["The Witcher 3", "Super Mario Odyssey", "God of War", "Hogwarts Legacy"],
    correct: 0
  },
  {
    question: "Which game reached 100 million players faster?",
    answers: ["Fortnite", "Minecraft", "Apex Legends", "PUBG"],
    correct: 2
  },
  {
    question: "Which game had the highest launch sales of these titles?",
    answers: ["GTA V", "Red Dead Redemption 2", "Cyberpunk 2077", "The Last of Us Part II"],
    correct: 0
  }
];

// Game variables
let currentQuestion = 0;
let score = 0;
let gameState = "start";
let feedback = "";
let feedbackColor;
let answerButtons = [];


function setup() {
  createCanvas(900, 650);
  textAlign(CENTER, CENTER);
}


// Main screen
function draw() {
  if (gameState === "start") {
    drawStartScreen();
  } else if (gameState === "quiz") {
    drawQuizScreen();
  } else if (gameState === "end") {
    drawEndScreen();
  }
}


// Start screen
function drawStartScreen() {
  background(20, 25, 50);

  // Decoration
  fill(60, 100, 255, 30);
  circle(100, 100, 200);
  circle(800, 550, 250);

  fill(255);
  textStyle(BOLD);
  textSize(52);
  text("GAME QUIZ", width / 2, 160);

  textStyle(NORMAL);
  textSize(22);
  fill(190, 200, 230);
  text("10 questions about video game statistics", width / 2, 225);

  // Start button
  drawButton(
    width / 2 - 150,
    340,
    300,
    80,
    "START",
    color(60, 120, 255)
  );

  fill(140, 150, 180);
  textSize(18);
  text("Multiple choice", width / 2, 470);
}


// Quiz screen
function drawQuizScreen() {
  background(20, 25, 50);

  fill(255);
  textStyle(BOLD);
  textSize(25);
  text("GAME QUIZ", width / 2, 40);

  textStyle(NORMAL);
  textSize(18);
  fill(170, 180, 210);

  text(
    "Question " + (currentQuestion + 1) + " / " + questions.length,
    width / 2,
    75
  );

  // Progress bar
  fill(45, 50, 80);
  rect(150, 100, 600, 12, 6);

  fill(70, 130, 255);
  rect(
    150,
    100,
    600 * ((currentQuestion + 1) / questions.length),
    12,
    6
  );

  drawQuestion();

  // Feedback
  if (feedback !== "") {
    fill(feedbackColor);
    textStyle(BOLD);
    textSize(22);
    textAlign(CENTER, CENTER);
    text(feedback, width / 2, 610);
    textStyle(NORMAL);
  }
}


// Draw question
function drawQuestion() {
  let questionData = questions[currentQuestion];

  // Question box
  fill(35, 42, 75);
  rect(70, 135, 760, 150, 20);

  // Question text
  fill(255);
  textStyle(BOLD);
  textSize(25);
  textAlign(CENTER, CENTER);
  textWrap(WORD);

  text(
    questionData.question,
    100,
    155,
    700,
    110
  );

  textStyle(NORMAL);

  answerButtons = [];

  // Answer buttons
  for (let i = 0; i < questionData.answers.length; i++) {

    let x = 100 + (i % 2) * 380;
    let y = 320 + floor(i / 2) * 105;

    answerButtons.push({
      x: x,
      y: y,
      width: 320,
      height: 75
    });

    let buttonColor = color(55, 65, 105);

    // Show correct answer
    if (feedback !== "" && i === questionData.correct) {
      buttonColor = color(40, 150, 90);
    }

    drawButton(
      x,
      y,
      320,
      75,
      questionData.answers[i],
      buttonColor
    );
  }
}


// Draw button
function drawButton(
  x,
  y,
  buttonWidth,
  buttonHeight,
  label,
  buttonColor
) {

  // Hover effect
  let hovering =
    mouseX >= x &&
    mouseX <= x + buttonWidth &&
    mouseY >= y &&
    mouseY <= y + buttonHeight;

  if (hovering && feedback === "") {
    buttonColor = lerpColor(
      buttonColor,
      color(255),
      0.15
    );
  }

  fill(buttonColor);
  noStroke();
  rect(x, y, buttonWidth, buttonHeight, 15);

  fill(255);
  textStyle(BOLD);
  textSize(19);
  textAlign(CENTER, CENTER);

  text(
    label,
    x + buttonWidth / 2,
    y + buttonHeight / 2
  );

  textStyle(NORMAL);
}


// End screen
function drawEndScreen() {
  background(20, 25, 50);

  fill(255);
  textStyle(BOLD);
  textSize(48);
  textAlign(CENTER, CENTER);
  text("QUIZ FINISHED", width / 2, 130);

  textStyle(NORMAL);

  // Score
  fill(70, 130, 255);
  textSize(75);
  text(score + " / " + questions.length, width / 2, 250);

  let percentage =
    round((score / questions.length) * 100);

  fill(200, 210, 235);
  textSize(25);
  text("Score: " + percentage + "%", width / 2, 330);

  // Result message
  let resultMessage;

  if (percentage === 100) {
    resultMessage = "All questions correct.";
  } else if (percentage >= 80) {
    resultMessage = "Very good result.";
  } else if (percentage >= 60) {
    resultMessage = "Good result.";
  } else if (percentage >= 40) {
    resultMessage = "You can improve your score.";
  } else {
    resultMessage = "Try again to improve your score.";
  }

  fill(170, 180, 210);
  textSize(21);
  text(resultMessage, width / 2, 390);

  // Restart button
  drawButton(
    width / 2 - 150,
    470,
    300,
    70,
    "PLAY AGAIN",
    color(60, 120, 255)
  );
}


// Mouse input
function mousePressed() {

  // Start
  if (gameState === "start") {

    if (
      mouseX >= width / 2 - 150 &&
      mouseX <= width / 2 + 150 &&
      mouseY >= 340 &&
      mouseY <= 420
    ) {
      startQuiz();
    }
  }

  // Quiz
  else if (gameState === "quiz") {

    if (feedback === "") {

      // Check clicked answer
      for (let i = 0; i < answerButtons.length; i++) {

        let button = answerButtons[i];

        if (
          mouseX >= button.x &&
          mouseX <= button.x + button.width &&
          mouseY >= button.y &&
          mouseY <= button.y + button.height
        ) {
          checkAnswer(i);
          break;
        }
      }

    } else {
      nextQuestion();
    }
  }

  // End
  else if (gameState === "end") {

    if (
      mouseX >= width / 2 - 150 &&
      mouseX <= width / 2 + 150 &&
      mouseY >= 470 &&
      mouseY <= 540
    ) {
      startQuiz();
    }
  }
}


// Start quiz
function startQuiz() {
  currentQuestion = 0;
  score = 0;
  feedback = "";
  gameState = "quiz";
}


// Check answer
function checkAnswer(selectedAnswer) {

  let correctAnswer =
    questions[currentQuestion].correct;

  if (selectedAnswer === correctAnswer) {
    score++;
    feedback = "Correct";
    feedbackColor = color(70, 220, 120);
  } else {
    feedback = "Incorrect";
    feedbackColor = color(255, 90, 90);
  }
}


// Next question
function nextQuestion() {
  currentQuestion++;
  feedback = "";

  if (currentQuestion >= questions.length) {
    gameState = "end";
  }
}
