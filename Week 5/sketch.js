// Questions
let questions = [
  {
    question: "Hoeveel tyfus heeft tyfus?",
    answers: ["tyfus III", "Tyfus II", "tyfus I", "Tyfus"],
    correct: 0
  },
  {
    question: "Heeft mijn kip bart tyfus?",
    answers: ["ja", "nee", "Tyfus III", "kan"],
    correct: 0
  },
  {
    question: "Kan je tyfus van een aardappel krijgen?",
    answers: ["nee", "alleen tyfus III", "er is altijd een kans", "ja"],
    correct: 1
  },
  {
    question: "kan je cholera krijgen van regen water?",
    answers: [
      "Ik heb het zelf gekregen van regen water",
      "nee",
      "ja",
      "goede vraag"
    ],
    correct: 1
  },
  {
    question: "welke ziekte was er eerder?",
    answers: ["covid", "cholera", "tyfus III", "tyfus"],
    correct: 2
  },
  {
    question: "kip kip kip?",
    answers: ["kip", "aardappel", "cholera", "schildpad"],
    correct: 1
  },
  {
    question: "wat is ongeveer de gemiddelde hoogte van een water fles?",
    answers: ["37cm", "20cm", "18cm", "19cm"],
    correct: 1
  },
  {
    question: "heb jij tyfus?",
    answers: ["ja", "Nee", "nEe", "nee"],
    correct: 1
  },
  {
    question: "hoeveel kippen zijn er op aarde?",
    answers: ["22 miljard", "kip II", "20 miljard", "30 miljard"],
    correct: 0
  },
  {
    question: "wat zit in een regrubmah",
    answers: ["kip", "tyfus III", "koe", "varken"],
    correct: 2
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
  text("QUIZB", width / 2, 160);

  textStyle(NORMAL);
  textSize(22);
  fill(190, 200, 230);
  text("10 vragen", width / 2, 225);

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
  text("QUIZB", width / 2, 40);

  textStyle(NORMAL);
  textSize(18);
  fill(170, 180, 210);

  text(
    "vraag " + (currentQuestion + 1) + " / " + questions.length,
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
  text("QUIZB FINISHED", width / 2, 130);

  textStyle(NORMAL);

  // Score
  fill(70, 130, 255);
  textSize(75);
  text(score + " / " + questions.length, width / 2, 250);

  let percentage = round(
    (score / questions.length) * 100
  );

  fill(200, 210, 235);
  textSize(25);
  text("Score: " + percentage + "%", width / 2, 330);

  // Result message
  let resultMessage;

  if (percentage === 100) {
    resultMessage = "hoe.";
  } else if (percentage >= 80) {
    resultMessage = "goed.";
  } else if (percentage >= 60) {
    resultMessage = "goed genoeg.";
  } else if (percentage >= 40) {
    resultMessage = "je kan beter dan dit.";
  } else {
    resultMessage = "probeer opnieuw.";
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
    "Speel opnieuw",
    color(60, 120, 255)
  );
}


// Mouse input
function mousePressed() {

  // Start screen
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

  // Quiz screen
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
      // Click anywhere to continue
      nextQuestion();
    }
  }

  // End screen — FIXED
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


// Start or restart quiz
function startQuiz() {
  currentQuestion = 0;
  score = 0;
  feedback = "";
  feedbackColor = color(255);
  answerButtons = [];
  gameState = "quiz";
}


// Check answer
function checkAnswer(selectedAnswer) {
  let correctAnswer =
    questions[currentQuestion].correct;

  if (selectedAnswer === correctAnswer) {
    score++;
    feedback = "goed";
    feedbackColor = color(70, 220, 120);
  } else {
    feedback = "fout";
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