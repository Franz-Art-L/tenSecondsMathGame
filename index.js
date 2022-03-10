$(document).ready(() => {
    var currentRandomQuestion;
    var timeRemaining = 10;
    var interval;
    var currentScore = 0;
    var topScore = 0;


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

    var gameBegins = () => {
        updateTopScore(0);
        if (!interval) {

            if (timeRemaining === 0) {
                updateTimeRemaining(10);
                updateCurrentScore(-currentScore);
            }

            interval = setInterval(() => {
                updateTimeRemaining(-1);

                $('#timeRemainingElement').text(timeRemaining);
                if (timeRemaining === 0) {
                    clearInterval(interval);
                    interval = undefined;
                }
            }, 1000)
        }
    }

    $('#user-answer').on('keyup', function() {
        gameBegins();
        checkUserAnswer(Number($(this).val()), currentRandomQuestion.result);
    });

    $('#user-answer').on('click', function() {
        gameBegins();
        checkUserAnswer(Number($(this).val()), currentRandomQuestion.result);
    });

    var updateTimeRemaining = (second) => {
        timeRemaining += second;
        $('#timeRemainingElement').text(timeRemaining);
    }

    var renderNewRandomQuestion = () => {
        currentRandomQuestion = generateRandomQuestion();
        $('#questionDiv').text(currentRandomQuestion.randomEquation);
    }

    var checkUserAnswer = (userInput, result) => {
        if (userInput === result) {
            renderNewRandomQuestion();
            $('#user-answer').val('');
            updateTimeRemaining(+1);
            updateCurrentScore(+1);
        }
    }

    var updateCurrentScore = (quantity) => {
        currentScore += quantity;
        $('#currentScoreSpan').text(currentScore);
    };

    var updateTopScore = () => {
        if (currentScore > topScore) {
            topScore = currentScore;
        }
        $('#topScoreSpan').text(topScore);
    }

    renderNewRandomQuestion();

});