const question = document.getElementById("question");
console.log(question);
const choices = Array.from(document.getElementsByClassName("choice-text"));
console.log(choices);
const progressText = document.getElementById("progressText");
const scoreCorrectText = document.getElementById('s_correct_count');
const scoreIncorrectText = document.getElementById('s_incorrect_count');
const progressBarFull = document.getElementById("progressBarFull");
const nextButton = document.getElementById('next-btn');
let currentQuestion = {};
let acceptingAnswers = false;
let scoreCorrect = 0;
let scoreIncorrect = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "Montreal--Tradeau International Airport",
        choice1: "CYYZ",
        choice2: "CYUL",
        choice3: "BKPR",
        choice4: "FACT",
        answer: 2
    },
    {
        question: "Salzburg",
        choice1: "LOXT",
        choice2: "LOWL",
        choice3: "LOWS",
        choice4: "LOLS",
        answer: 3
    },
    {
        question: "Bejing-Capital",
        choice1: "ZBAA",
        choice2: "ZBAD",
        choice3: "ZHHH",
        choice4: "BIKF",
        answer: 1
    },
    {
        question: "Pristina",
        choice1: "KORD",
        choice2: "EPPO",
        choice3: "EBBR",
        choice4: "BKPR",
        answer: 4
    },
    {
        question: "Bangkok-Suvarnabhumi",
        choice1: "VTSP",
        choice2: "ZSPD",
        choice3: "VTBS",
        choice4: "VCBI",
        answer: 3
    }
];

//CONSTANTS
const SCORE_BONUS = 1;
const MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]; /*using the spread operator - to get a full copy of all questions from questions array to available questions*/
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
        //go to the end page
        return window.location.assign("end.html");
    }
    questionCounter++;
    //To get a random question
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    //Get question based on question index
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        //Get number that identifies each individual answer option
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    //get rid of the current question
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        //if things are not loaded yet, ignore click
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        console.log('selected option')
        console.log(selectedChoice)
        const selectedAnswer = selectedChoice.dataset["number"];

        //const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        let classToApply = 'incorrect';
        if (selectedAnswer == currentQuestion.answer) {
            classToApply = 'correct';
        }
        selectedChoice.parentElement.classList.add(classToApply);

        //this iterates over options and highlights (adds correct class) to the correct option answer
        choices.forEach(choice => {
            if (choice.dataset['number'] == currentQuestion.answer) {
                const correct_answer = choice
                console.log('correct ans')
                console.log(correct_answer);
                choice.parentElement.classList.add('correct');
                //figure out a way to use next button to move to next question, as opposed to timer.
                setTimeout(() => {
                    choice.parentElement.classList.remove('correct')
                }, 1500);
            }
        })

        if (classToApply === "correct") {
            incrementCorrectScore(SCORE_BONUS)
        }else{
            incrementIncorrectScore(SCORE_BONUS)
        }

        //figure out a way to use next button to move to next question, as opposed to timer.
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion();
        }, 1500);
        });
    });

//correct_answer =()=> {}

/*
reset = () => {
    const ans = currentQuestion.answer;
    const corrOptionStr = 'currentQuestion.choice' + ans;
    const correct_answer = eval(corrOptionStr);

//corrOptionStr.parentElement.classList.add('correct');
    console.log(corrOptionStr);
    console.log(correct_answer);
    if(classToApply == 'incorrect') {
        //selectedChoice.parentElement.classList.remove(classToApply);
    }
}
 */

incrementCorrectScore = num => {
    scoreCorrect += num;
    scoreCorrectText.innerText = scoreCorrect;
};
incrementIncorrectScore = num => {
    scoreIncorrect += num;
    scoreIncorrectText.innerText = scoreIncorrect;
};


startGame();

console.log(currentQuestion.answer);