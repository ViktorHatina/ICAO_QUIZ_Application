const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreCorrectText = document.getElementById('s_correct_count');
const scoreIncorrectText = document.getElementById('s_incorrect_count');
const progressBarFull = document.getElementById("progressBarFull");
const nextButton = document.getElementById('next-btn');
let currentQuestion = {};
let acceptingAnswers = false;
let scoreCorrect = 0;
let wrong_question = [];
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
summarize = () => {
        localStorage.setItem("lastScore", scoreCorrect);
        localStorage.setItem('wrong_que', wrong_question)
        //Reset Game
        scoreCorrect = 0;
        wrong_question = [];
        //Go to Summary
        return window.location.assign("summary.html");
}

document.getElementById('finish-btn').onclick = function() {
    summarize();
    console.log('Finishing up!')
}

getNewQuestion = () => {
    resetButtonStatus();
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        summarize();
    }

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    //Get question based on question index
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        //Get number that identifies each individual answer option
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });
    questionCounter++;
    //To get a random question
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

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
        const selectedAnswer = selectedChoice.dataset["number"];
        const ans = currentQuestion.answer;
        //Get Correct answer Text
        const corrOptionStr = 'currentQuestion.choice' + ans;
        const correct_answer = eval(corrOptionStr);

        //const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        let classToApply = 'incorrect';
        if (selectedAnswer == currentQuestion.answer) {
            classToApply = 'correct';
        }
        selectedChoice.parentElement.classList.add(classToApply);

        //Iterate over choices and add styling class
        choices.forEach(choice => {
            if (choice.dataset['number'] == currentQuestion.answer) {
                const correct_answer = choice
                console.log('correct ans')
                console.log(correct_answer);
                choice.parentElement.classList.add('correct');
            }
        })

        if (classToApply === "correct") {
            buttonStatus(true)
            incrementCorrectScore(SCORE_BONUS);
            setTimeout(() => {
                selectedChoice.parentElement.classList.remove(classToApply)
                getNewQuestion();
            }, 500);

        }else{
            buttonStatus(false)
            incrementIncorrectScore(SCORE_BONUS)
            wrong_question.push(currentQuestion.question);
            wrong_question.push(correct_answer);
            console.log('wrong question array')
            console.log(wrong_question);
            document.getElementById('next-btn').onclick = function() {
                selectedChoice.parentElement.classList.remove(classToApply);
                choices.forEach(choice=> {
                    choice.parentElement.classList.remove('correct');
                })
                getNewQuestion();
            }
        }

        /* //figure out a way to use next button to move to next question, as opposed to timer.
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion();
        }, 1500);
         */

        });
    });

//correct_answer =()=> {}
buttonStatus = boolean => {
    nextButton.disabled = boolean;
    if(boolean == true){
        nextButton.classList.add('disabled');
    }else{
        nextButton.classList.add('encourage')
    }
}
resetButtonStatus = () =>{
    nextButton.classList.remove('disabled');
    nextButton.classList.remove('encourage');
}

getRightAnswer = () => {

}

incrementCorrectScore = num => {
    scoreCorrect += num;
    scoreCorrectText.innerText = scoreCorrect;
};
incrementIncorrectScore = num => {
    scoreIncorrect += num;
    scoreIncorrectText.innerText = scoreIncorrect;
};

startGame();
