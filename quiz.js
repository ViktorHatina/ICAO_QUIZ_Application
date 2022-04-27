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


//let questions = [];

let questions = [
    {
        question: "Bari/Palese",
        choice1: "LIBP",
        choice2: "LIBD",
        choice3: "LICC",
        choice4: "LIBR",
        answer: 2
    },
    {
        question: "Pescara",
        choice1: "LIBP",
        choice2: "LICB",
        choice3: "LIBR",
        choice4: "LICJ",
        answer: 1
    },
    {
        question: "Brindisi",
        choice1: "LIPH",
        choice2: "LIBR",
        choice3: "LIBD",
        choice4: "LICB",
        answer: 2
    },
    {
        question: "Lamezia Terme",
        choice1: "LICB",
        choice2: "LICC",
        choice3: "LICT",
        choice4: "LICA",
        answer: 4
    },
    {
        question: "Comiso",
        choice1: "LIEO",
        choice2: "LIPA",
        choice3: "LICB",
        choice4: "LIMC",
        answer: 3
    },
    {
        question: "Catania/Fontanarossa",
        choice1: "LICT",
        choice2: "LICC",
        choice3: "LIEE",
        choice4: "LIPE",
        answer: 2
    },
    {
        question: "Palermo",
        choice1: "LICJ",
        choice2: "LIPX",
        choice3: "LIRF",
        choice4: "LIMC",
        answer: 1
    },
    {
        question: "Trapani/Birgi [mil]",
        choice1: "LICT",
        choice2: "LIEA",
        choice3: "LICB",
        choice4: "LIME",
        answer: 1
    },
    {
        question: "Alghero",
        choice1: "LICC",
        choice2: "LIMF",
        choice3: "LIEE",
        choice4: "LIEA",
        answer: 4
    },
    {
        question: "Cagliari/Elmas",
        choice1: "LIEA",
        choice2: "LIEE",
        choice3: "LIMC",
        choice4: "LIPB",
        answer: 2
    },
    {
        question: "Olbia",
        choice1: "LICC",
        choice2: "LIEE",
        choice3: "LIEA",
        choice4: "LIEO",
        answer: 4
    },
    {
        question: "Milano-Malpensa",
        choice1: "LIMF",
        choice2: "LIMC",
        choice3: "LIML",
        choice4: "LICT",
        answer: 2
    },
    {
        question: "Bergamo",
        choice1: "LIME",
        choice2: "LIMJ",
        choice3: "LIBR",
        choice4: "LIBD",
        answer: 1
    },
    {
        question: "Torino-Caselle",
        choice1: "LIMF",
        choice2: "LIMJ",
        choice3: "LIML",
        choice4: "LIME",
        answer: 1
    },
    {
        question: "Genova",
        choice1: "LIPQ",
        choice2: "LIMF",
        choice3: "LIME",
        choice4: "LIMJ",
        answer: 4
    },
    {
        question: "Milano-Linate",
        choice1: "LIMJ",
        choice2: "LIME",
        choice3: "LIML",
        choice4: "LIMC",
        answer: 3
    },
    {
        question: "Aviano [Mil]",
        choice1: "LIMF",
        choice2: "LIPA",
        choice3: "LIPG",
        choice4: "LIEA",
        answer: 2
    },
    {
        question: "Bolzano",
        choice1: "LICB",
        choice2: "LIPQ",
        choice3: "LIPB",
        choice4: "LIPA",
        answer: 3
    },
    {
        question: "Bologna",
        choice1: "LIPE",
        choice2: "LIPB",
        choice3: "LIPX",
        choice4: "LIBR",
        answer: 1
    },
    {
        question: "Treviso",
        choice1: "LIPZ",
        choice2: "LIRS",
        choice3: "EBBR",
        choice4: "LIPH",
        answer: 4
    },
    {
        question: "Brescia",
        choice1: "LIPQ",
        choice2: "LIRP",
        choice3: "LIPO",
        choice4: "LIPB",
        answer: 3
    },
    {
        question: "Trieste",
        choice1: "LIPO",
        choice2: "LIPQ",
        choice3: "LIPR",
        choice4: "LIRE",
        answer: 2
    },
    {
        question: "Rimini/Miramare",
        choice1: "LIRP",
        choice2: "LIPX",
        choice3: "LIPR",
        choice4: "LIPY",
        answer: 3
    },
    {
        question: "Verona/Villafranca",
        choice1: "LIPX",
        choice2: "LIPY",
        choice3: "LIPH",
        choice4: "LIPZ",
        answer: 1
    },
    {
        question: "Ancona/Falconara",
        choice1: "LIPR",
        choice2: "LIPX",
        choice3: "LIPZ",
        choice4: "LIPY",
        answer: 4
    },
    {
        question: "Venezia/Tessera",
        choice1: "LIRF",
        choice2: "LIPQ",
        choice3: "LIPZ",
        choice4: "LIRE",
        answer: 3
    },
    {
        question: "Roma-Ciampino",
        choice1: "LIRE",
        choice2: "LIRA",
        choice3: "LIRF",
        choice4: "LIRN",
        answer: 2
    },
    {
        question: "Pratica di Mare [Mil]",
        choice1: "LIRS",
        choice2: "LIRA",
        choice3: "LIRE",
        choice4: "LIPB",
        answer: 3
    },
    {
        question: "Roma-Fiumicino",
        choice1: "LIRF",
        choice2: "LIPZ",
        choice3: "LIRP",
        choice4: "LIRS",
        answer: 1
    },
    {
        question: "Napoli",
        choice1: "LIRA",
        choice2: "LIPY",
        choice3: "LIRP",
        choice4: "LIRN",
        answer: 4
    },
    {
        question: "Pisa/San Giusto",
        choice1: "LIRQ",
        choice2: "LIRP",
        choice3: "LIPR",
        choice4: "LIRZ",
        answer: 2
    },
    {
        question: "Firenze",
        choice1: "LIPZ",
        choice2: "LIRQ",
        choice3: "LIRS",
        choice4: "LICT",
        answer: 2
    },
    {
        question: "Grosseto [Mil]",
        choice1: "LICB",
        choice2: "LIPX",
        choice3: "LIRE",
        choice4: "LIRS",
        answer: 4
    },
    {
        question: "Perugia",
        choice1: "LIRZ",
        choice2: "LIRF",
        choice3: "LIPQ",
        choice4: "LIPO",
        answer: 1
    }
];

/*
fetch('questions_italy.json')
    .then((res) => {
        return res.json();
    })
    .then((loadedQuestions) => {
        questions = loadedQuestions;
        console.log(loadedQuestions);
        startGame();
    })
    .catch((error) => {
    console.error(error);
    });

 */

console.log('Questions After Loading')
console.log(questions);


//CONSTANTS
const SCORE_BONUS = 1;
const MAX_QUESTIONS = 33;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]; /*using the spread operator - to get a full copy of all questions from questions array to available questions*/
    getNewQuestion();
};
summarize = () => {
        localStorage.setItem("lastScore", scoreCorrect);
        localStorage.setItem('wrong_que', wrong_question)
        localStorage.setItem('totalQuestions', MAX_QUESTIONS)
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
