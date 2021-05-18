var quizQuestions = [
    "", 
    "", 
    "", 
    ""
];
var quizQuestionAnswers = [
    {
    one: "",
    two: "",
    three: "",
    answer: ""
    },
        {
        one: "",
        two: "",
        three: "",
        answer: ""
        },
            {
            one: "",
            two: "",
            three: "",
            answer: ""
            },
                {
                one: "",
                two: "",
                three: "",
                answer: ""
                }
];
var questionNumber = 0; //This number will go up everytime a question is answered
var seeHighScores = document.querySelector("#see-high-scores");
var highScoresLink = true;
var highScores = [];
var contentArea = document.querySelector("#content-area");
var score = 100;
var totalQuizTime = 120;
var testActive = true;


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

function contentAreaClick(event) {
    targetEl = event.target;
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

        var noScores = document.createElement("li");
        noScores.className = "high-score-display";
        noScores.innerText = "Their are currently no scores recorded. Please take the test to display your top scores!";
        listEl.appendChild(noScores);
    }
    else {

    }
}

function timerStart() {
    //Creates the timer at the top of the page
}

function transitionDeletion() {
    var deletion = document.querySelector(".main-content-div");
    if (deletion != null) {
        deletion.remove();
    }
}


// Questions handing functions --------------------------------------------------------------------------

function initializeQuiz() {
    //Initilizes the quiz based on if the button from home screen is high duh
    transitionDeletion();

}

function question() {
    //sets up the question HMTL based on the question number index
    if (quizQuestions === 6) {
        quizCompleted();
        return null;
    }
    transitionDeletion();
    testActive = true;

}

function answerSelection() {
    //disides what to do based on what answer was picked

}

function wrongAnswer() {
    //Determains what happens if you get an answer wrong

    questionNumber++;
    question();
}

function rightAnswer() {
    //Determains what happens if you get an answer right

    questionNumber++;
    question();
}

function quizCompleted(endTime) {
    //Closes out quiz, gives your score, sees if your score beates the high score (high score is based on time and answers)\
    if (score === 100) {
        score = score + 100;
    }
    var scoreIndex = {
        totalScore: score - (endTime - totalQuizTime),
        score: score,
        time: endTime,
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
    score = 100;
    questionNumber = 0;
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
    score = 100;
}

function newHighScore(rank, scoreIndex) {
    //based off the rank of the new high score, print to screen, rank and score and input new score into localStorage (also ask for player initals)
    highScores.splice(rank, 0, scoreIndex);
}

function newHighestScore(scoreIndex) {
    //IF the player got the highest score out of the top 5, print to screen and get initials for score board
    highScores.splice(0, 0, scoreIndex);


    if (highScores.length > 5) {
        highScores[5].remove();
    }

}

function didNotBeatHighScore() {
    //Inform the player they did not beat the high score, display high score

}

function submitHighScore() {
    alert("Your High Score Has Been Submitied!");
    testActive = false;
    saveHighScores();
    setHomeScreen();
}

function saveHighScores() {
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