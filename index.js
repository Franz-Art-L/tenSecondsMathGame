$(document).ready(() => {
    var currentRandomQuestion;
    var timeRemaining = 10;

    var generateRandomNumber = number => {
        return Math.floor(Math.random() * number);
    }

    var generateRandomQuestion = () => {
        let questionObj = {};

        let firstNumber = generateRandomNumber(10);
        let secondNumber = generateRandomNumber(10);

        questionObj.result = firstNumber + secondNumber;
        questionObj.randomEquation = String(firstNumber) + " + " + String(secondNumber) + " = " + ' ?';

        return questionObj;
    }

    var renderNewRandomQuestion = () => {
        currentRandomQuestion = generateRandomQuestion();
        $('#questionDiv').text(currentRandomQuestion.randomEquation);
    }

    var checkUserAnswer = (userInput, result) => {
        if (userInput === result) {
            renderNewRandomQuestion();
            $('#user-answer').val('');
        }
    }

    $('#user-answer').on('keyup', function() {
        checkUserAnswer(Number($(this).val()), currentRandomQuestion.result);
    });

    $('#user-answer').on('click', function() {
        checkUserAnswer(Number($(this).val()), currentRandomQuestion.result);
    });

    renderNewRandomQuestion();

});

setInterval(() => {
    console.log('1 sec passed');
}, 1000)