var quizQuestions = [
    "Commonly used data types in javascript include all of the following EXCEPT:", 
    "A usful tool provided by Chrome Dev Tools to help diagnose issues in Javascript is:", 
    "Inorder to create a random number you must use _________.random().", 
    "What is a statement that is simaler to an if / else statement?",
    "The proper way to diclare a function statement is 'function ____________':"
];
var quizQuestionAnswers = [
    {
    one: "Array",
    two: "String",
    three: "Boolean",
    answer: "Alert"
    },
        {
        one: ".innerText",
        two: ".addEventListener()",
        three: "prompt",
        answer: "consle.log()"
        },
            {
            one: "Random",
            two: "Int",
            three: "Number",
            answer: "Math"
            },
                {
                one: "Array",
                two: "if / other",
                three: "and / or",
                answer: "switch / case"
                },
                    {
                    one: "functionName {}",
                    two: "{(functionName)}",
                    three: "functionName:",
                    answer: "functionName() {}"
                    }
];
var questionNumber = 0; //This number will go up everytime a question is answered
var seeHighScores = document.querySelector("#see-high-scores");
var header = document.querySelector("#header");
var highScoresLink = true;
var highScores = [];
var contentArea = document.querySelector("#content-area");
var score = 100;
var totalQuizTime = 120;
var quizTime = 120;
var timerEnd = false;
var timer = null;
var testActive = false;
var testTimerActive = false;
var answerToQuestion = 0;
var transition = false;
var relay = "";



// Home screen and eventListener Functions --------------------------------------------------------------------


function setHomeScreen() {
    //Creates the initial html elements for the home screen or start quiz screen
    transitionDeletion();
    var introTextDiv = document.createElement("div");
    introTextDiv.className = "main-content-div";
    contentArea.appendChild(introTextDiv);

    var introHeading = document.createElement("h2");
    introHeading.className = "quiz-title";
    introHeading.innerText = "Coding Quiz Challange"
    introTextDiv.appendChild(introHeading);

    var introDescription = document.createElement("p");
    introDescription.className = "description";
    introDescription.innerText = "Welcome to this short Coding Quiz Challange! Try to answer all the questions as fast as you can and get as many right as you can. Your total score will be based on how fast and accuratly you complete the test. Good luck!";
    introTextDiv.appendChild(introDescription);

    var startQuizDiv = document.createElement("div");
    startQuizDiv.className = "start-quiz-div";
    introTextDiv.appendChild(startQuizDiv);

    var startQuizBtn = document.createElement("button");
    startQuizBtn.className = "start-quiz-btn";
    startQuizBtn.innerText = "Start Quiz!";
    startQuizDiv.appendChild(startQuizBtn);
}

function highScoresClick() {
    //Changes the view high scores html link depending on if you are already viewing the highscores screen
    //Then choses weather to run viewHighScores or setHomeScreen.
    if (!testActive) {
        if (highScoresLink) {
            seeHighScores.textContent = "Return to Quiz";
            viewHighScores();
            highScoresLink = false;
        }
        else if (!highScoresLink) {
            seeHighScores.textContent = "View High Scores";
            setHomeScreen();
            highScoresLink = true;
        }
    }
    else {
        alert("You can not view the high scores durring the test!");
    }
    
}

function contentAreaClick(event) {
    //Determains what code to run based on what button was hit in the <main> tag.
    targetEl = event.target;

    if (targetEl.matches(".start-quiz-btn")) {
        initializeQuiz();
    }

    else if (targetEl.matches(".answer-button")) {
        if (!transition) {
            answerSelection(targetEl);
        }
    }
}

function contentAreaSubmit(event) {
    targetEl = event.target;

    if (targetEl.matches("#end-screen-form")) {

    }
}

function viewHighScores() {
    //Changes HTML of page to the view High scores page
    transitionDeletion();
    var viewHighScoreDiv = document.createElement("div");
    viewHighScoreDiv.className = "main-content-div";
    contentArea.appendChild(viewHighScoreDiv);

    var listDiv = document.createElement("div");
    listDiv.className = "hs-list-div";
    viewHighScoreDiv.appendChild(listDiv);

    var listHeader = document.createElement("h2");
    listHeader.className = "list-header";
    listHeader.textContent = "Top 5 High Scores!";
    listDiv.appendChild(listHeader);

    var listEl = document.createElement("ul");
    listEl.className = "hs-ul";
    listDiv.appendChild(listEl);

    if (highScores.length === 0) {
        var noScore = document.createElement("li");
        noScore.className = "high-score-display";
        noScore.innerText = "Their are currently no scores recorded. Please take the test to display your top scores!";
        listEl.appendChild(noScore);
    }
    else {

    }
}

function timerStart() {
    //Creates the timer at the top of the page
    testTimerActive = true;
    time();
    timer = setInterval(time, 1000);
}

function time() {
    //controls the timer for the quiz
    var tempTimer = document.querySelector("#timer");
    if (quizTime === 0 || timerEnd === true) {
        clearInterval(timer);
        if (tempTimer) {
            tempTimer.remove();
        }
        if (quizTime === 0) {
            quizCompleted();
        }
    }
    else if (testTimerActive){
        if (tempTimer) {
            tempTimer.remove();
            var timerEl = document.querySelector(".timer-div");
            var timerP = document.createElement("p");
            timerP.className = "timer";
            timerP.setAttribute("id", "timer");
            timerP.innerText = "Time left: " + quizTime;
            timerEl.appendChild(timerP);
        }
        else {
            var timerEl = document.createElement("div");
            timerEl.className = "timer-div";
            timerEl.innerHTML = "<p class='timer' id='timer'>Time left: " + quizTime;
            header.appendChild(timerEl);
        }
        quizTime--;
    }
    
}

function randomBetween(totalNum, startNum) {
    return Math.floor(Math.random() * totalNum + startNum);
}

function transitionDeletion() {
    var deletion = document.querySelector(".main-content-div");
    if (deletion != null) {
        deletion.remove();
    }
}

function reset() {
    questionNumber = 0;
    score = 100;
    quizTime = 120;
    timerEnd = false;
    timer = null;
    testActive = false;
    testTimerActive = false;
    answerToQuestion = 0;
    transition = false;
    relay = "";
}


// Questions handing functions --------------------------------------------------------------------------


function initializeQuiz() {
    //Initilizes the quiz based on if the button from home screen is high duh
    timerStart();
    testActive = true;
    question();

}
var yes = 1;
function question() {
    //sets up the question HMTL based on the question number index
    transition = false;
    if (questionNumber === 5) {
        quizCompleted();
        return null;
    }
    transitionDeletion();

    console.log(questionNumber);

    var questionDiv = document.createElement("div");
    questionDiv.className = "main-content-div";
    contentArea.appendChild(questionDiv);

    var questionHeadDiv = document.createElement("div");
    questionHeadDiv.className = "question-div";
    questionHeadDiv.innerHTML = "<h2 class='question-head' id='question-head'>" + quizQuestions[questionNumber] + "</h2>";
    questionDiv.appendChild(questionHeadDiv);

    var answersDiv = document.createElement("div");
    answersDiv.className = "answers-div";
    questionDiv.appendChild(answersDiv);

    var one = false;
    var two = false;
    var three = false;
    var answer = false;
    var index = 1;
    for (var i = 0; i < 4;) {
        var randomNum = randomBetween(4, 0);
        if (randomNum === 0) {
            if (!one) {
                var answerOneDiv = document.createElement("div");
                answerOneDiv.className = "answer-buttons";
                answerOneDiv.innerHTML = "<button class='answer-button' id='answer-one'>" + index + ". " + quizQuestionAnswers[questionNumber].one + "</button>";
                answersDiv.appendChild(answerOneDiv);

                index++;
                one = true;
                i++;
            }
        }

        else if (randomNum === 1) {
            if (!two) {
                var answerTwoDiv = document.createElement("div");
                answerTwoDiv.className = "answer-buttons";
                answerTwoDiv.innerHTML = "<button class='answer-button' id='answer-two'>" + index + ". " + quizQuestionAnswers[questionNumber].two + "</button>";
                answersDiv.appendChild(answerTwoDiv);

                index++;
                two = true;
                i++;
            }
        }

        else if (randomNum === 2) {
            if (!three) {
                var answerThreeDiv = document.createElement("div");
                answerThreeDiv.className = "answer-buttons";
                answerThreeDiv.innerHTML = "<button class='answer-button' id='answer-three'>" + index + ". " + quizQuestionAnswers[questionNumber].three + "</button>";
                answersDiv.appendChild(answerThreeDiv);

                index++;
                three = true;
                i++;
            }
        }

        else if (randomNum === 3) {
            if (!answer) {
                var answerFourDiv = document.createElement("div");
                answerFourDiv.className = "answer-buttons";
                answerFourDiv.innerHTML = "<button class='answer-button' id='answer-four'>" + index + ". " + quizQuestionAnswers[questionNumber].answer + "</button>";
                answersDiv.appendChild(answerFourDiv);

                index++;
                answer = true;
                i++;
            }
        }
    }
    var bottomDiv = document.createElement("div");
    bottomDiv.className = "bottom-div";
    bottomDiv.innerHTML = "<p class='relay-answer' id='relay-answer'>" + relay + "</p>";
    questionDiv.appendChild(bottomDiv);
}

function answerSelection(targetEl) {
    //disides what to do based on what answer was picked
    transition = true;
    if (targetEl.matches("#answer-four")) {
        rightAnswer();
    }
    else {
        wrongAnswer();
    }
}

function wrongAnswer() {
    //Determains what happens if you get an answer wrong
    relay = "Incorrect!";
    score = score - 20;
    quizTime = quizTime - 10;
    questionNumber++;
    question();
}

function rightAnswer() {
    //Determains what happens if you get an answer right
    relay = "Correct!";
    questionNumber++;
    question();
}

function quizCompleted() {
    //Closes out quiz, gives your score, sees if your score beates the high score (high score is based on time and answers)\
    transitionDeletion();
    timerEnd = true;
    if (score === 100) {
        var tempScore = score + 100;
    }
    else {
        var tempScore = score;
    }
    var scoreIndex = {
        totalScore: Math.max(0, tempScore + (quizTime - totalQuizTime) + 5),
        score: score,
        time: totalQuizTime - quizTime,
        name: ""
    };

    if (highScores.length === 1) {
        if (scoreIndex.totalScore > highScores[0].totalScore) {
            newHighestScore(scoreIndex);   
        }
        else {
            newHighScore(1, scoreIndex);
        }
    }
    else if (highScores.length > 1) {
        var largerThan = [];
        for (var i = 0; i > highScores.length; i++) {
            if (scoreIndex.totalScore < highScores[i].totalScore) {
                largerThan[i] = false;
            }
            else if (scoreIndex.totalScore > highScores[i].totalScore) {
                largerThan[i] = true;
            }
        }
        var totalCurrentScores = largerThan.length - 1;
        if (largerThan[totalCurrentScores] === false) {
            didNotBeatHighScore();
        }
        else if (largerThan[totalCurrentScores] === true) {
            newHighScoreMath(largerThan, scoreIndex);
        }
    }
    else if (highScores.length === 0) {
        newHighestScore(scoreIndex);
    } 
}


//Saving and adding new High scores / getting high scores from local storage -------------------------


function newHighScoreMath(possition, scoreIndex) {
    //IF the player got a higher score than the top 5 (does not count if < 1 score is saved to LocalStorage) THEN determain the scores ranking
    var index = false;
    var i = 0;
    while (index === false) {
        if (possition[i] === true) {
            if (i === 0) {
                newHighestScore(scoreIndex); 
            }
            else {
                newHighScore(i, scoreIndex);
            }
            index = true;
        }
        else {
            i++;
        }
    }
}

function newHighScore(rank, scoreIndex) {
    //based off the rank of the new high score, print to screen, rank and score and input new score into localStorage (also ask for player initals)
    highScores.splice(rank, 0, scoreIndex);

    var endScreen = endScreenEl(scoreIndex);
    contentArea.appendChild(endScreen);

    var place = ["st", "nd", "rd", "th", "th"];
    var highScore = document.createElement("div");
    highScore.className = "end-screen-div";
    highScore.innerHTML = "<p class='end-score'>You got the " + rank + place[rank]+ " highest score! With a total score of:" + scoreIndex.totalScore + "!";
    endScreen.appendChild(highScore);
}

function newHighestScore(scoreIndex) {
    //IF the player got the highest score out of the top 5, print to screen and get initials for score board
    highScores.splice(0, 0, scoreIndex);

    var endScreen = endScreenEl(scoreIndex);
    contentArea.appendChild(endScreen);

    var highScore = document.createElement("div");
    highScore.className = "end-screen-div";
    highScore.innerHTML = "<p class='end-score'>You beat the High Score with a total score of: " + scoreIndex.totalScore + "!";
    endScreen.appendChild(highScore);


}

function didNotBeatHighScore() {
    //Inform the player they did not beat the high score, display high score
    var endScreen = endScreenEl(scoreIndex);
    contentArea.appendChild(endScreen);

    var highScore = document.createElement("div");
    highScore.className = "end-screen-div";
    highScore.innerHTML = "<p class='end-score'>You did not beat the high score. Better luck next time!";
    endScreen.appendChild(highScore);

    
}

function endScreenEl(scoreIndex) {
    var endScreen = document.createElement("div");
    endScreen.className = "main-content-div";

    var allDoneDiv = document.createElement("div");
    allDoneDiv.className = "end-screen-div";
    allDoneDiv.innerHTML = "<h2 class='all-done'>All Done!<h2>"
    endScreen.appendChild(allDoneDiv);

    var scoreDiv = document.createElement("div");
    scoreDiv.className = "end-screen-div";
    scoreDiv.innerHTML = "<p class='end-score-p'>You got a total score of: " + scoreIndex.totalScore + "  and got " + score + "% of the questions right!";
    endScreen.appendChild(scoreDiv);

    return endScreen;
}

function highScoreForm() {
    //Creates the form for inputing the 
}

function submitHighScore() {
    alert("Your High Score Has Been Submitied!");
    saveHighScores();
    setHomeScreen();
    reset();
}

function saveHighScores() {
    if (highScores.length > 5) {
        highScores[5].remove();
    }
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

function initialHighScores() {
    //saves the high scores from local storage to active web script to the high scores var
    highScores = localStorage.getItem("highScores");
    console.log(highScores);

    if (highScores === null) {
        highScores = [];
        return highScores;
    }

    highScores = JSON.parse(highScores);
}


// Event listeners and starter code -------------------------------------------------------------------


setHomeScreen();
initialHighScores();
seeHighScores.addEventListener("click", highScoresClick);
contentArea.addEventListener("click", contentAreaClick);
contentArea.addEventListener("submit", contentAreaSubmit);