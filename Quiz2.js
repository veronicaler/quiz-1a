var questions = [{
  question: "What is the answer for 10*3/0?",
  choices: [10, 15, 30],
  correctAnswer: 2
}, {
  question: "What is the answer for 3+3+3+3?",
  choices: [9, 12, 18],
  correctAnswer: 1
}, {
  question: "What is the answer for 9*9*2?",
  choices: [72, 162, 168],
  correctAnswer: 1
}, {
  question: "What is the answer for 1*7*0?",
  choices: [0, 7, 17],
  correctAnswer: 0
}, {
  question: "What is the answer for 2+2*2?",
  choices: [6, 8, 12],
  correctAnswer: 1
}, {
  question: "What is the answer for 3*3*3?",
  choices: [9, 18, 27],
  correctAnswer: 2
}, {
  question: "What is the answer for 3*7*3?",
  choices: [9, 27, 63],
  correctAnswer: 2
}, {
  question: "What is the answer for 10*3/3?",
  choices: [3, 10, 30],
  correctAnswer: 1
}, {
  question: "What is the answer for 10*3*3?",
  choices: [16, 27, 90],
  correctAnswer: 2
}, {
  question: "What is the answer for 8*3*3?",
  choices: [72, 109, 127],
  correctAnswer: 0
}];



$(document).ready(function() {

  var currQuestion = questions[currentQuestion()];
  var totalAnswerQuestion = 1;
  var player1Score = 0;
  var player2Score = 0;
  var currChoices = currQuestion.choices;
  var currPlayer = "player1";
  var selectedChoice = -1;


  //=======Functions for internal logic=========
  function numberOfQuestions() {
    return questions.length;
  }

  function currentQuestion() {
    return Math.floor((Math.random() * 10));
  }

  function correctAnswer() {
    return currQuestion.correctAnswer;
  }
  console.log(correctAnswer());


  function numberOfChoices() {
    return currQuestion.choices.length;

  }
  console.log(numberOfChoices());

  function playTurn(choice) {
    //check if choice equals actual correct answe
    return choice === correctAnswer;
  }

  function isGameOver() {
    return totalAnswerQuestion === 10;
  }

  function whoWon() {
    //console.log(isGameOver());
    if (isGameOver() === false) {
      return 0;
    } else {
      if (player1Score > player2Score) {
        alert("Player 1 win");
        restart();

      } else if (player2Score > player1Score) {
        alert("Player 2 Win");
        restart();
      } else {
        alert("Draw Game!!!");
        restart();
      }
    }
  }

  function restart() {
    location.reload();
  }

  //============Add event listeners ============

  $("#start").click(restart);

  function switchPlayer(selectedChoice, Qn) {
    if (selectedChoice == Qn.correctAnswer) {
      if (currPlayer === "player1") {
        player1Score += 1;
      } else {
        player2Score += 1;
      }
    }
    console.log("choice is " + selectedChoice);
    console.log("answer is " + Qn.correctAnswer);

    console.log("player 1 " + player1Score);
    console.log("player 2 " + player2Score);

    if (currPlayer === "player1") {
      currPlayer = "player2";
    } else {
      currPlayer = "player1";
    }
    document.getElementById('turn').innerHTML = currPlayer + " 's turn";
    showQuestion();
  }
  $('#submit').click(function(event) {
    //did user select option
    if (selectedChoice === -1) {
      alert("Please make a selection");
    } else {
      totalAnswerQuestion++;
      switchPlayer(selectedChoice, currQuestion);
      whoWon();
      selectedChoice = -1;
    }

  });

  function clickedChoice() {
    //unset all background color of answer buttons
    $('ol li button').css("background-color", "white");
    //Change clicked to red
    $(this).find('button').css("background-color", "red");
    //Set the selected choice
    selectedChoice = $(this).attr('id');
    console.log(selectedChoice);
  }

  function showQuestion() {
    currQuestion = questions[currentQuestion()];
    $('#quiz').html('<h1>Question</h1>');
    $('#quiz').append('<p>' + currQuestion.question + '</p>');
    $('#quiz').append('<ol>');


    for (var i = 0; i < numberOfChoices(); i++) {
      var btn = $('<li class="choice"><button >' + currQuestion.choices[i] + '</button></li>');
      btn.attr("class", "choice");
      btn.attr("id", i);
      $('ol').append(btn);

    }
    $(".choice").on("click", clickedChoice);
  }

  showQuestion();



}); //end of document ready
