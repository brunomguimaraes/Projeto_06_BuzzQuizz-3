let allQuizzes = [];
let userQuizzes = [];
let quizzAnswer = [];
let quizzPosition;
let correctAnswer = 0;
let totalScore;
let levelTitle = "initial";
let levelImage = "initial";
let levelText = "initial";

function showUserQuizzes () {
    const ulQuizzes = document.querySelector('.filledUserQuizzes ul');
    ulQuizzes.innerHTML = "";

    for (let i = 0; i < userQuizzes.length; i++) {
        ulQuizzes.innerHTML +=  `
        <li onclick="findQuizz(this)">
            <img src=${userQuizzes[i].image}>
            <p class="quizzTitle">${userQuizzes[i].title}</p>
        </li>`
    }
}

function showAllQuizzes () {
    const ulQuizzes = document.querySelector('.allQuizzes ul');
    ulQuizzes.innerHTML = "";

    for (let i = 0; i < allQuizzes.length; i++) {
        ulQuizzes.innerHTML += `
        <li onclick="findQuizz(this)">
            <img src=${allQuizzes[i].image}>
            <p class="quizzTitle">${allQuizzes[i].title}</p>
        </li>`
    }
}

function loadAllQuizzes (response) {
    allQuizzes = response.data;
    console.log(response.data)

    showAllQuizzes();
    showUserQuizzes();

    if (userQuizzes.length === 0) {
        document.querySelector('.userQuizzes').classList.remove('hide-class');
        document.querySelector('.emptyUserQuizzes').classList.remove('hide-class');
        document.querySelector('.allQuizzes').classList.remove('hide-class');
    } else {
        document.querySelector('.userQuizzes').classList.remove('hide-class');
        document.querySelector('.filledUserQuizzes').classList.remove('hide-class');
        document.querySelector('.allQuizzes').classList.remove('hide-class');
    }
}

function getAllQuizzes () {
    const promise = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes');

    promise.then(loadAllQuizzes);
}

function enterQuizz () {   

    document.querySelector('.userQuizzes').classList.add('hide-class');
    document.querySelector('.emptyUserQuizzes').classList.add('hide-class');
    document.querySelector('.filledUserQuizzes').classList.add('hide-class');
    document.querySelector('.allQuizzes').classList.add('hide-class');

    document.querySelector('.quizzPage').classList.add('hide-class');

    document.querySelector('.createQuizzes').classList.add('hide-class');
    document.querySelector('.createQuestions').classList.add('hide-class');
    document.querySelector('.createLevels').classList.add('hide-class');
    document.querySelector('.creationCompleted').classList.add('hide-class');

    quizzAnswer = [];
    getAllQuizzes();
}

function goToQuizzPage (){
    window.scrollTo(0, 0);
    document.querySelector('.userQuizzes').classList.add('hide-class');
    document.querySelector('.emptyUserQuizzes').classList.add('hide-class');
    document.querySelector('.filledUserQuizzes').classList.add('hide-class');
    document.querySelector('.allQuizzes').classList.add('hide-class');

    document.querySelector('.quizzResult').classList.add('hide-class');
    document.querySelector('.resultButtons').classList.add('hide-class');

    document.querySelector('.quizzPage').classList.remove('hide-class');
}

function findQuizz (quizz) {
    const title = quizz.querySelector('.quizzTitle').innerHTML;

    for (let i = 0; i < allQuizzes.length; i++) {
        if (title === allQuizzes[i].title) {
            quizzPosition = i;

            document.querySelector('.quizzCover .quizzTitle').innerHTML = allQuizzes[i].title;
            document.querySelector('.quizzCover img').src = allQuizzes[i].image;

            const ulQuestions = document.querySelector('.quizzPage ul');
            ulQuestions.innerHTML = "";

            for (let j = 0; j < allQuizzes[i].questions.length; j++) {
                
                ulQuestions.innerHTML += `
                    <li>
                        <div class="quizzQuestion question${j}">

                            <div class="questionText" style="background-color:${allQuizzes[i].questions[j].color}">
                                <p>${allQuizzes[i].questions[j].title}</p>
                            </div>
        
                            <div class="possibleAnswers">
        
                                <ul>
        
                                </ul>
        
                            </div>
                        </div>
                    </li>`

                const sortAnswers = allQuizzes[i].questions[j].answers;
                sortAnswers.sort(comparator);

                const ulAnswers = document.querySelectorAll('.possibleAnswers ul')
                ulAnswers[j].innerHTML = "";

                for (let k = 0; k < allQuizzes[i].questions[j].answers.length; k++) {

                    if (allQuizzes[i].questions[j].answers[k].isCorrectAnswer === true) {
                        ulAnswers[j].innerHTML += `
                        <li onclick="checkAnswer(this);" class="correctAnswer">
                            <img src="${allQuizzes[i].questions[j].answers[k].image}">
                            <p>${allQuizzes[i].questions[j].answers[k].text}</p>
                        </li>`
                    } else {
                        ulAnswers[j].innerHTML += `
                        <li onclick="checkAnswer(this);" class="wrongAnswer">
                            <img src="${allQuizzes[i].questions[j].answers[k].image}">
                            <p>${allQuizzes[i].questions[j].answers[k].text}</p>
                        </li>`
                    }
                }
            }
        }        
    } 
    goToQuizzPage();   
}

function validateLevel () {
    levelImage = "";
    levelText = "";
    levelTitle = "";

    for (let i = 0; i < allQuizzes[quizzPosition].levels.length; i++) {

        if((totalScore >= allQuizzes[quizzPosition].levels[i].minValue)) {
            levelTitle = allQuizzes[quizzPosition].levels[i].title;
            levelImage = allQuizzes[quizzPosition].levels[i].image;
            levelText = allQuizzes[quizzPosition].levels[i].text;
        }  
    }
}

function calculateScore (){
    correctAnswer = 0;

    for (let i = 0; i < quizzAnswer.length; i++) {
        if (quizzAnswer[i].classList.contains('correctAnswer')) {
            correctAnswer++;
        }           
    }   

    totalScore = Math.round((correctAnswer / (allQuizzes[quizzPosition].questions.length)) * 100);
    console.log(totalScore);

    validateLevel();
}

function generateQuizzResult () {
    const result = document.querySelector('.quizzResult')
    result.classList.remove('hide-class');

    document.querySelector('.resultButtons').classList.remove('hide-class');

    result.scrollIntoView();

    document.querySelector('.successText p').innerHTML = `
    ${totalScore}% de acerto: ${levelTitle}`;

    document.querySelector('.levelInfo img').src = levelImage;

    document.querySelector('.levelInfo .levelText p').innerHTML = levelText;

}

function checkAnswer(answer) {
    const selected = answer.parentNode.querySelectorAll('li');

    const rightAnswer = answer.parentNode.querySelector('.correctAnswer');
    rightAnswer.classList.add('rightColor');

    const wrongAnswer = answer.parentNode.querySelectorAll('.wrongAnswer');    

    for (let i = 0; i < wrongAnswer.length; i++) {
        wrongAnswer[i].classList.add('wrongColor');        
    }

    for (let i = 0; i < selected.length; i++) {
        selected[i].removeAttribute("onclick");    
    }
    console.log('depois',answer)

    quizzAnswer.push(answer);

    if (quizzAnswer.length === allQuizzes[quizzPosition].questions.length) {     
        setTimeout(generateQuizzResult, 2000);
        calculateScore();
    }    
}

function startCreateQuizzes() {
    const disableUser = document.querySelector('.userQuizzes');
    const disableAll = document.querySelector('.allQuizzes');

    disableUser.classList.add('hide-class');
    disableAll.classList.add('hide-class');

    const showCreateQuizzes = document.querySelector('.createQuizzes');
    showCreateQuizzes.classList.remove('hide-class');
}

function comparator() { 
	return Math.random() - 0.5; 
}

enterQuizz();