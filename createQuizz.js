let quizzTitle, quizzImg = "";
let quizzQuestions, quizzLevels = 0;
let printQuestions = [];
let zoneLevels = [];
let newQuizz = {};

function validateUrl(string) {  
    try {
        url = new URL(string);
    } catch (_) {
        return false; 
    }
    return true;
}

function hexColor (hex) {
    let color = /^#[0-9A-F]{6}$/i.test(hex)
    
    if(color) {
    return true
    } else {
    return false;
    }
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
    let verify = {};
    let areaAnswers = [];

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
        let incorrectAnswer3 = newQuestions[i].querySelector('.incorrectAnswere3').value;
        let incorrectAnswerImg3 = newQuestions[i].querySelector('.incorrectAnswerImg3').value;

        verify = {
            option: correctAnswer,
            image: correctAnswerImg,
            iscorrectAnswer: true
        };
        areaAnswers.push(verify);

        if (incorrectAnswer1 !== '' && incorrectAnswerImg1 !== '') {
            verify = {
                option: incorrectAnswer1,
                image: incorrectAnswerImg1,
                iscorrectAnswer: false
            };
            areaAnswers.push(verify);
        }
        if (incorrectAnswer2 !== '' && incorrectAnswerImg2 !== '') {
            verify = {
                option: incorrectAnswer2,
                image: incorrectAnswerImg2,
                iscorrectAnswer: false
            };
            areaAnswers.push(verify);
        }
        if (incorrectAnswer3 !== '' && incorrectAnswerImg3 !== ''){
            verify = {
                option: incorrectAnswer3,
                image: incorrectAnswerImg3,
                iscorrectAnswer: false
            };
            areaAnswers.push(verify);
        }

        printQuestions.push(areaQuestion);
        areaQuestion.answers = areaAnswers;
        areaQuestion = {};
        areaAnswers = [];
        verify = {};
    }
    if ( validateCreateQuestions()){
        CreateLevels()
        const enable = document.querySelector('.createLevels')
        enable.classList.remove('hide-class')

    }
    else{ 
        alert ('falhou')
        printQuestions = [];
    }
}

function validateCreateQuestions() {
    for (let i = 0; i < quizzQuestions; i++) {
        if (printQuestions[i].title === '' || printQuestions[i].color === ''){
            alert ('Os campos precisam ser preenchidos');
            return false;
        }
        else{
            if(printQuestions[i].title.length < 20) {
                alert ('O título precisa ter no mínimo 20 caracteres');
                return false;
            }
            if (!hexColor (printQuestions[i].color)){
                alert ('Insira uma cor válida, por exemplo #000000 (preto) ou #0000FF (azul)');
                return false;
            }
            for (let j = 0; j < printQuestions[i].answers.length; j++) {
                if (printQuestions[i].answers[j].text === '' || printQuestions[i].answers[j].image === ''){
                    alert ('Os campos precisam ser preenchidos corretamente');
                    return false;
                }
                else{
                    if(!validateUrl(printQuestions[i].answers[j].image)){
                        alert ('As imagens precisam ter URL válidas');
                        return false;
                    }
                    if (printQuestions[i].answers.length < 2) {
                        alert ('Sua pergunta deve conter uma resposta certa e respostas erradas');
                        return false;
                    }
                }
            }
        }
    }
    return true;
}

function CreateLevels() {
    const disable = document.querySelector ('.createQuestions')
    disable.classList.add('hide-class');

    let create = document.querySelector('.creatingLevels')
    create.innerHTML = ''; 
    for (let i = 0; i < quizzLevels; i++) {
        create.innerHTML += `
        <li class="levels">
            <span class="title-create">Nível ${i + 1}</span>
            <div class ="container-levels">
                <input type="text" class="levelTitle" spellcheck="true" placeholder="Título do nível">
                <input type="number" class="levelPercentage" placeholder="% de acerto mínima">
                <input type="text" class="levelImg" placeholder="URL da imagem do nível">
                <input class="levelDescription" type="text" spellcheck="true" placeholder="Descrição do nível">
            </div>
        </li>
        `
    }
}

function finishCreateLevels() {
    let newLevels = document.querySelectorAll('.levels');
    let areaLevels = {}

    for (let i = 0; i < quizzLevels; i++) {
        areaLevels = {
            title: newLevels[i].querySelector('.levelTitle').value,
            percentage: newLevels[i].querySelector('.levelPercentage').value,
            image: newLevels[i].querySelector('.levelImg').value,
            text: newLevels[i].querySelector('.levelDescription').value
        };
        zoneLevels.push(areaLevels);
    }

    if (validateCreateLevels()) {
        let disable = document.querySelector('.creationCompleted')
        disable.classList.remove('hide-class')
        CreateQuizz ()
    }
    else {
        zoneLevels = [];
    }
}

function validateCreateLevels() {
    for ( let i = 0; i < quizzLevels; i++) {
        zoneLevels[i].percentage = Number(zoneLevels[i].percentage);
        if(zoneLevels[i].title === '' || zoneLevels[i].image === '' || 
            zoneLevels[i].text === '' || zoneLevels[i].percentage === '') {
            alert ('Preencha todos os campos, por favor');
            return false;
        }
        if(zoneLevels[i].title.length < 10){
            alert ('O título deve conter no mínimo 10 caracteres');
            return false;
        }
        
        if(!validateUrl(zoneLevels[i].image)) {
            alert ('Insira uma URL válida');
            return false;
        }
        if(zoneLevels[i].text.length < 30) {
            alert ('A descrição deve ter no mínimo 30 caracteres');
            return false;
        }
        if(zoneLevels[i].percentage.length >= 0 || zoneLevels[i].percentage.length <= 100) {
            alert ('A porcentagem de acertos deve estar entre 0 e 100');
            return true;
        }
    }
    return true;
}

function newQuizzObj () {
    newQuizz = {
        title: quizzTitle,
        image: quizzImg,
        questions: printQuestions,
        levels: zoneLevels
    }
}

function CreateQuizz () {
    const disable = document.querySelector ('.createLevels')
    disable.classList.add('hide-class');

    let create = document.querySelector('.creationCompleted');
    create.innerHTML = ``
    

}

