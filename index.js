$(document).ready(() => {
    // Welcome introduction
    // Mechanics
    Swal.fire({
        title: "Answer the random Math equation as fast as you can, you are only given 10 seconds. If your answer is correct, additional 1 second is added to the countdown.",
        text: "As of now ONLY ADDITION(+) OPERATOR IS AVAILABLE. Coming Soon: Subtraction(-), Multiplication(*), and Division(/). Enjoy!!!",
        position: "center",
        backdrop: "linear-gradient(grey, blue)",
        background: "white",
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        showConfirmButton: false,
        showCancelButton: false,
        timer: 8000
    });
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
        document.getElementById('backgroundMusic').play();
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
                    document.getElementById('backgroundMusic').pause();
                    document.getElementById('gameOver').play();
                    Swal.fire({
                        icon: 'error',
                        title: 'Time is up!',
                        text: "I'm sorry my friend, you ran out of time. :D",
                        footer: 'Hope you enjoy the Game! :)'
                    })
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
            document.getElementById('correctAnswer').play();
            renderNewRandomQuestion();
            $('#user-answer').val('');
            updateTimeRemaining(+1);
            updateCurrentScore(+1);
        } else if (userInput != result) {
            document.getElementById('wrongAnswer').play();
        }
    }

    var updateCurrentScore = (quantity) => {
        currentScore += quantity;
        $('#currentScoreSpan').text(currentScore);
    };

    var updateTopScore = () => {
        if (currentScore > topScore) {
            topScore = currentScore;
            document.getElementById('newTopScore').play();
        }
        $('#topScoreSpan').text(topScore);
    }

    var resetTopScore = () => {
        topScore = 0;
        $('#topScoreSpan').text(topScore);
    }

    var resetCurrentScore = () => {
        currentScore = 0;
        $('#currentScoreSpan').text(currentScore);
    }

    var resetTime = () => {
        timeRemaining = 10;
        $('#timeRemainingElement').text(timeRemaining);
    }

    var newGameButton = document.querySelector('#newGameButton');

    newGameButton.addEventListener('click', () => {
        resetTopScore();
        resetCurrentScore();
        resetTime();
        renderNewRandomQuestion();
        gameBegins();
    });

    renderNewRandomQuestion();
});