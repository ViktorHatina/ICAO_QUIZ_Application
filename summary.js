const finalScore = document.getElementById('finalScore');
const lastScore = localStorage.getItem('lastScore');
const review = document.getElementById('review');
const totalQuestions = localStorage.getItem('totalQuestions')

const wrong_que = localStorage.getItem('wrong_que');

finalScore.innerText = `${lastScore}/${totalQuestions}`;
console.log(finalScore);

/*
for (let i = 0; i < wrong_que.length*2; i+=2) {
    review.innerText += "Area: " + wrong_que[i] + "Correct Answer: " + wrong_que[i+1] + '<br>';
}

 */


console.log(wrong_que);
let text = wrong_que.split(',');
console.log(text);
console.log(wrong_que.length);

if(!wrong_que) {
    review.innerText = "Nothing to Review :)";
}else{
    for (let i = 0; i < text.length; i+=2) {
        console.log(i);
        review.innerText += text[i] + "\t ||\t "  + text[i+1] + '\n';
    }
}

