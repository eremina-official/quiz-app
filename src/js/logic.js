(function() {
  
  'use strict';

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
    const currentQuestion = document.querySelector('.question-is-active');

    if (event.target.classList.contains('prev') && !currentQuestion.classList.contains('question-one')) {
      const prevQuestion = currentQuestion.previousElementSibling;
      currentQuestion.classList.remove('question-is-active');
      prevQuestion.classList.add('question-is-active');
    }
    
    if (event.target.classList.contains('next') && !currentQuestion.classList.contains('question-result')) {
      const nextQuestion = currentQuestion.nextElementSibling;
      currentQuestion.classList.remove('question-is-active');
      nextQuestion.classList.add('question-is-active');
    }
  }

  function processAnswer(event) {
    const selectedAnswer = event.target;
    const currentQuestion = document.querySelector('.question-is-active');
    
    if (!selectedAnswer.classList.contains('answer') || currentQuestion.classList.contains('done')) {
      return;
    }
        
    if (selectedAnswer.classList.contains('js-correct')) {
      selectedAnswer.classList.add('right');
      counterRight = counterRight + 1;
    } else {
      const correctAnswer = currentQuestion.querySelector('.js-correct');
      correctAnswer.classList.add('right');
      selectedAnswer.classList.add('wrong');
      counterWrong = counterWrong + 1;
    }

    const description = currentQuestion.querySelector('.js-description');
    description.classList.remove('not-active');
    currentQuestion.classList.add('done');
  }

  //show result or info that not all questions have been answered
  function showResult() {
    const totalCount = counterRight + counterWrong;

    result.textContent = (totalCount === questionNumber) 
    ? `Wynik: ${counterRight} z ${questionNumber}.`
    : `Proszę odpowiedzieć na wszystkie pytania.`;
  }
  
  //remove message after all questions have been answered
  function clearMessage(event) {
    const totalCount = counterRight + counterWrong;    
    
    if (event.target.tagName == 'SPAN' && totalCount === questionNumber && result.textContent === 'Proszę odpowiedzieć na wszystkie pytania.') {
      result.textContent = '';
    }
  }

})();
//IIFE