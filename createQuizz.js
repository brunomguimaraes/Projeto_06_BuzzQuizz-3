let quizzTitle, quizzImg = "";
let quizzQuestions, quizzLevels = 0;

function validateUrl(string) {  
    try {
        url = new URL(string);
    } catch (_) {
        return false; 
    }
    return true;
}

function validateCreateQuizzes() {
    if (quizzImg === '' || quizzTitle === '' || quizzLevels === '' || quizzQuestions === '') {
        alert ('Preencha todos os campos por favor');
        return false;
    }
    else {
        if (isNaN(quizzLevels) || isNaN(quizzQuestions)) {
            alert ('As perguntas e níveis devem ser números');
            return false;
        }
        if (quizzTitle.length < 20 || quizzTitle.length > 65) {
            alert ('O título deve conter no mínimo 20 e no máximo 65 caracteres ');
            return false;
        }
        if (!validateUrl(quizzImg)) {
            alert ('URL inválida')
            return false;
        }
        if (quizzQuestions < 3) {
            alert ('O quizz deve conter no mínimo 3 perguntas');
            return false;
        }
        if (quizzLevels < 2) {
            alert ('O quizz deve conter no mínimo 2 níveis')
            return false;
        }
    } return true;
}

function finishCreateQuizzes() {
    quizzTitle = document.getElementById('isTitle').value;
    quizzImg = document.getElementById('isImg').value;
    quizzQuestions = document.getElementById('isQuestions').value;
    quizzLevels = document.getElementById('isLevels').value; 

    if(validateCreateQuizzes() ) {
        startCreateQuestions()
        const enable = document.querySelector('.createQuestions')
        enable.classList.remove('hide-class')
    } 
}

function startCreateQuestions() {
    const disableCreateBasic = document.querySelector ('.createQuizzes');
    disableCreateBasic.classList.add ('hide-class');

    let create = document.querySelector('.questioning');
    create.innerHTML = '';
    for (let i = 0; i < quizzQuestions; i++) {
        create.innerHTML += `
        <li class="questions">
            <div class="subtitle">
                 <span>Pergunta ${i + 1}</span>
                 <ion-icon name="create-outline"></ion-icon>
            </div>
            <div class="container-questions">       
                <input type="text" class="questionTitle" spellcheck="true" placeholder="Texto da pergunta">
                <input type="text" class="questionColor" placeholder="Cor de fundo da pergunta">

                <span>Resposta correta</span>
                <input type="text" class="correctAnswer" spellcheck="true" placeholder="Resposta correta">
                <input type="text" class="correctAnswerImg" placeholder="URL da imagem">
                        
                <span>Respostas incorretas</span>
                <input type="text" class="incorrectAnswer1" spellcheck="true" placeholder="Resposta incorreta 1">
                <input type="text" class="incorrectAnswerImg1" placeholder="URL da imagem 1">
                <input type="text" class="incorrectAnswer2" spellcheck="true" placeholder="Resposta incorreta 2">
                <input type="text" class="incorrectAnswerImg2" placeholder="URL da imagem 2">
                <input type="text" class="incorrectAnswere3" spellcheck="true" placeholder="Resposta incorreta 3">
                <input type="text" class="incorrectAnswerImg3" placeholder="URL da imagem 3">
            </div>
        </li>
        `
    }
}

function finishCreateQuestions() {
    let newQuestions = document.querySelectorAll('.questions');
    let areaQuestion = {};

    for (let i = 0; i < quizzQuestions; i++) {
        areaQuestion = {
            title: newQuestions[i].querySelector('.questionTitle').value,
            color: newQuestions[i].querySelector('.questionColor').value
        }

        let correctAnswer = newQuestions[i].querySelector('.correctAnswer').value;
        let correctAnswerImg = newQuestions[i].querySelector('.correctAnswerImg').value;
        let incorrectAnswer1 = newQuestions[i].querySelector('.incorrectAnswer1').value;
        let incorrectAnswerImg1 = newQuestions[i].querySelector('.incorrectAnswerImg1').value;
        let incorrectAnswer2 = newQuestions[i].querySelector('.incorrectAnswer2').value;
        let incorrectAnswerImg2 = newQuestions[i].querySelector('.incorrectAnswerImg2').value;
        let incorrectAnswere3 = newQuestions[i].querySelector('.incorrectAnswere3').value;
        let incorrectAnswerImg3 = newQuestions[i].querySelector('.incorrectAnswerImg3').value;
    }
}

