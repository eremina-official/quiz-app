(function() {

  //cache DOM, declare variables
  const nav = document.querySelector('.navigation');
  const question = document.querySelectorAll('.question');

  //bind events
  document.addEventListener('click', movePrevNext);

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
      if (currentQuestion.classList.contains('question-six')) {
        return;
      } else {
        let nextQuestion = currentQuestion.nextElementSibling;
        currentQuestion.classList.remove('question-is-active');
        nextQuestion.classList.add('question-is-active');
      }
    }
  }


})();
//IIFE