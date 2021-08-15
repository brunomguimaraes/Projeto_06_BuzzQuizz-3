let allQuizzes = [];
let userQuizzes = [];

function getAllQuizzes () {
    const promise = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes');

    promise.then(loadAllQuizzes);
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

    getAllQuizzes();
}

function goToQuizzPage (){
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
            document.querySelector('.quizzCover .quizzTitle').innerHTML = allQuizzes[i].title;
            document.querySelector('.quizzCover img').src = allQuizzes[i].image;

            const ulQuestions = document.querySelector('.quizzPage ul');
            ulQuestions.innerHTML = "";

            for (let j = 0; j < allQuizzes[i].questions.length; j++) {
                
                ulQuestions.innerHTML += `
                    <li>
                        <div class="quizzQuestion">

                            <div class="questionText" style="background-color:${allQuizzes[i].questions[j].color}">
                                <p>${allQuizzes[i].questions[j].title}</p>
                            </div>
        
                            <div class="possibleAnswers">
        
                                <ul>
        
                                </ul>
        
                            </div>
                        </div>
                    </li>`

                const ulAnswers = document.querySelectorAll('.possibleAnswers ul')
                ulAnswers[j].innerHTML = "";

                for (let k = 0; k < allQuizzes[i].questions[j].answers.length; k++) {
                    
                    ulAnswers[j].innerHTML += `
                        <li>
                            <img src="${allQuizzes[i].questions[j].answers[k].image}">
                            <p>${allQuizzes[i].questions[j].answers[k].text}</p>
                        </li>`
                }
                
            }
        }        
    } 
    goToQuizzPage();   
}

function startCreateQuizzes() {
    const disableUser = document.querySelector('.userQuizzes');
    const disableAll = document.querySelector('.allQuizzes');

    disableUser.classList.add('hide-class');
    disableAll.classList.add('hide-class');

    const showCreateQuizzes = document.querySelector('.createQuizzes');
    showCreateQuizzes.classList.remove('hide-class');
}
enterQuizz();