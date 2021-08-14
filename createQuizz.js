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
        quizzLevels = Number (quizzLevels);
        quizzQuestions = Number (quizzQuestions);
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
        //validar a url para por ! aqui 
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
        //chamar a próxima página 
        alert ('deu certooo')
    }
}