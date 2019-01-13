(function() {

  //cache DOM, declare variables
  const resultButton = document.querySelector('.js-result-button');
  const result = document.querySelector('.js-result');
  const questionNumber = 8;
  let counterRight = 0;
  let counterWrong = 0;

  //bind events
  document.addEventListener('click', movePrevNextQuestion);
  document.addEventListener('click', processAnswer);
  resultButton.addEventListener('click', showResult);
  document.addEventListener('click', clearMessage);

  //function declarations
  function movePrevNextQuestion(event) {
    
    let currentQuestion = document.querySelector('.question-is-active');

    if (event.target.classList.contains('prev')) {
      if (currentQuestion.classList.contains('question-one')) {
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
    let currentQuestion = document.querySelector('.question-is-active');
    
    if (selectedAnswer.tagName == 'SPAN' && !currentQuestion.classList.contains('done')) { 
        
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
      let description = currentQuestion.querySelector('.js-description');
      description.classList.remove('not-active');
    }
  }

  //show result or info that not all questions have been answered
  function showResult() {
    
    let totalCount = counterRight + counterWrong;

    result.textContent = (totalCount === questionNumber) 
    ? `Wynik: ${counterRight} z ${questionNumber}.`
    : `Proszę odpowiedzieć na wszystkie pytania.`;
    
  }
  
  //remove message after all questions have been answered
  function clearMessage(event) {

    let totalCount = counterRight + counterWrong;    
    
    if (event.target.tagName == 'SPAN' && totalCount === questionNumber && result.textContent === 'Proszę odpowiedzieć na wszystkie pytania.') {
      result.textContent = '';
    }
  }

})();
//IIFE