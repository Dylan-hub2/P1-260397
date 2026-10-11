let questions = [
  {
    question: "Wat is ongeveer het hoogste gebouw ter wereld?",
    answers: ["500 meter", "828 meter", "1.000 meter", "650 meter"],
    correct: 1
  },
  {
    question: "Wat is de hoogste berg ter wereld?",
    answers: ["K2", "Mont Blanc", "Mount Everest", "Kilimanjaro"],
    correct: 2
  },
  {
    question: "Hoe lang kan een blauwe vinvis ongeveer worden?",
    answers: ["5 meter", "15 meter", "30 meter", "50 meter"],
    correct: 2
  },
  {
    question: "Hoe diep is de Marianentrog ongeveer?",
    answers: ["2 kilometer", "5 kilometer", "11 kilometer", "20 kilometer"],
    correct: 2
  },
  {
    question: "Wat is ongeveer de diameter van de aarde?",
    answers: ["6.400 km", "12.700 km", "25.000 km", "40.000 km"],
    correct: 1
  },
  {
    question: "Hoe hoog kan een giraf ongeveer worden?",
    answers: ["2 meter", "3 meter", "5,5 meter", "10 meter"],
    correct: 2
  },
  {
    question: "wat is ongeveer de gemiddelde hoogte van een water fles?",
    answers: ["37cm", "20cm", "18cm", "19cm"],
    correct: 1
  },
  {
    question: "Hoe lang is een olympisch zwembad?",
    answers: ["25 meter", "50 meter", "75 meter", "100 meter"],
    correct: 1
  },
  {
    question: "Hoe hoog is de Eiffeltoren ongeveer, inclusief antennes?",
    answers: ["150 meter", "220 meter", "330 meter", "450 meter"],
    correct: 2
  },
  {
    question: "Hoe lang is de Chinese Muur ongeveer, inclusief vertakkingen?",
    answers: ["2.000 km", "8.000 km", "21.000 km", "50.000 km"],
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
  textFont("Arial");
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

  fill(60, 100, 255, 30);
  noStroke();
  circle(100, 100, 200);
  circle(800, 550, 250);

  fill(255);
  textStyle(BOLD);
  textSize(52);
  textAlign(CENTER, CENTER);
  text("QUIZB", width / 2, 160);

  textStyle(NORMAL);
  textSize(22);
  fill(190, 200, 230);
  text("10 vragen over metingen", width / 2, 225);

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
  text("Hoe groot, hoog, diep of lang?", width / 2, 470);
}

// Quiz screen
function drawQuizScreen() {
  background(20, 25, 50);

  fill(255);
  textStyle(BOLD);
  textSize(25);
  textAlign(CENTER, CENTER);
  text("QUIZB", width / 2, 40);

  textStyle(NORMAL);
  textSize(18);
  fill(170, 180, 210);

  text(
    "Vraag " + (currentQuestion + 1) + " / " + questions.length,
    width / 2,
    75
  );

  // Progress bar
  noStroke();
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

    text(feedback, width / 2, 600, 700, 35);

    fill(170, 180, 210);
    textStyle(NORMAL);
    textSize(14);
    text("Klik ergens om verder te gaan", width / 2, 630);
  }
}

// Draw question
function drawQuestion() {
  let questionData = questions[currentQuestion];

  // Question box
  noStroke();
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
    110,
    155,
    680,
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

    // Show correct answer after selection
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

  // Button background
  fill(buttonColor);
  noStroke();
  rect(x, y, buttonWidth, buttonHeight, 15);

  // Button text
  fill(255);
  textStyle(BOLD);
  textSize(18);
  textAlign(CENTER, CENTER);
  textWrap(WORD);

  text(
    label,
    x + 10,
    y + 5,
    buttonWidth - 20,
    buttonHeight - 10
  );

  textStyle(NORMAL);
}

// End screen
function drawEndScreen() {
  background(20, 25, 50);

  fill(255);
  textStyle(BOLD);
  textSize(46);
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
    resultMessage = "Perfect!";
  } else if (percentage >= 80) {
    resultMessage = "Goed gedaan!";
  } else if (percentage >= 60) {
    resultMessage = "Goed genoeg!";
  } else if (percentage >= 40) {
    resultMessage = "Je kan beter dan dit!";
  } else {
    resultMessage = "Probeer opnieuw!";
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

  // End screen
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
    feedback = "Goed!";
    feedbackColor = color(70, 220, 120);
  } else {
    feedback = "Fout!";
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