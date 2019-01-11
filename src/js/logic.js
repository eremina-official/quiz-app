(function() {

  //cache DOM, declare variables
  const resultButton = document.querySelector('.js-result-button');
  const result = document.querySelector('.js-result');
  const questionNumber = 6;
  let counterRight = 0;
  let counterWrong = 0;

  //bind events
  document.addEventListener('click', movePrevNext);
  document.addEventListener('click', processAnswer);
  resultButton.addEventListener('click', showResult);
  document.addEventListener('click', clearMessage);

  //function declarations
  function movePrevNext(event) {
    
    let currentQuestion = document.querySelector('.question-is-active');

    if (event.target.classList.contains('prev')) {
      if (currentQuestion.classList.contains('position-relative')) {
        return;
      } else {
        let prevQuestion = currentQuestion.previousElementSibling;
        currentQuestion.classList.remove('question-is-active');
        prevQuestion.classList.add('question-is-active');
      }
    }
    if (event.target.classList.contains('next')) {
      if (currentQuestion.classList.contains('question-result')) {
        return;
      } else {
        let nextQuestion = currentQuestion.nextElementSibling;
        currentQuestion.classList.remove('question-is-active');
        nextQuestion.classList.add('question-is-active');
      }
    }
  }

  function processAnswer(event) {

    let selectedAnswer = event.target;
    
    if (selectedAnswer.tagName == 'SPAN') {

      let currentQuestion = document.querySelector('.question-is-active');

      if (!currentQuestion.classList.contains('done')) {    
        
        if (selectedAnswer.classList.contains('js-correct')) {
          selectedAnswer.classList.add('right');
          counterRight = counterRight + 1;
        } else {
          let correctAnswer = currentQuestion.querySelector('span.js-correct');
          correctAnswer.classList.add('right');
          selectedAnswer.classList.add('wrong');
          counterWrong = counterWrong + 1;
        }

        currentQuestion.classList.add('done');
      }
    }
  }
  //show result or info that not all questions have been answered
  function showResult() {
    let totalCount = counterRight + counterWrong;

    result.innerHTML = (totalCount === questionNumber) 
    ? `Wynik: ${counterRight} z ${questionNumber}.`
    : `Please answer all questions.`;
    
  }
  
  //remove message after all questions have been answered
  function clearMessage(event) {
    let totalCount = counterRight + counterWrong;    
    
    if (event.target.tagName == 'SPAN' && totalCount === questionNumber && result.innerHTML === "Please answer all questions.") {
      result.innerHTML = '';
    }
  }











})();
//IIFE