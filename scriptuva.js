const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const restartButton = document.getElementById('restart-btn')
const riprovaButton = document.getElementById('riprova-btn')
const risultato = document.getElementById('risultato')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const titolo = document.getElementById('titolo')

let nome = window.prompt("Inserisci il tuo nome:"); 

const questions = [
  {
    question: nome + ', come preferisci definirti?',
    answers: [
      { text: 'uomo', correct: false},
      { text: 'donna', correct: false },
      { text: 'uva', correct: true }
    ]
  },
  {
    question: nome + ', preferisci utilizzare',
    answers: [
      { text: 'il bagno degli uomini', correct: false },
      { text: 'il bagno delle donne', correct: false },
      { text: 'il bagno dei vegetali', correct: true }
    ]
  },
  {
    question: nome + ', hai mai deciso di assaggiarti?',
    answers: [
      { text: 'si, ho un sapore dolciastro', correct: true },
      { text: 'si, ho un sapore aspro', correct: true },
      { text: 'non so di niente', correct: false }
    ]
  },
  {
    question: nome + ', passi molto tempo sulla vite?',
    answers: [
      { text: 'non mi hanno ancora staccato', correct: true },
      { text: 'ogni tanto, per nostalgia', correct: true },
      { text: 'che vite?', correct: false }
    ]
  },
  {
    question: nome + ', da quanti acini è formato il tuo corpo?',
    answers: [
      { text: 'circa una decina, senza esagerare', correct: true },
      { text: 'non riuscirei a contarli tutti', correct: true },
      { text: 'acini?', correct: false }
    ]
  },
  {
    question: nome + ', cosa usi per pulirti?',
    answers: [
      { text: 'shampoo e docciaschiuma', correct: false },
      { text: 'nulla, puzzo', correct: false },
      { text: 'antibiotici', correct: true }
    ]
  },
  {
    question: nome + ', quanto costi?',
    answers: [
      { text: 'dipende che cosa, per esempio il fegato circa 83000€', correct: true },
      { text: 'queste domande iniziano a preoccuparmi', correct: true },
      { text: 'circa 80 centesimi al kg', correct: false }
    ]
  },
  {
    question: nome + ', capita spesso che la gente stacchi parti del tuo corpo per nutrirsi?',
    answers: [
      { text: 'si, spesso', correct: true },
      { text: 'si, molto spesso', correct: true },
      { text: 'no', correct: false }
    ]
  },
  {
    question: nome + ', qual è il ph della tua pelle?',
    answers: [
      { text: 'non ho idea di cosa voglia dire', correct: false },
      { text: 'tra i 2,8 e 3,6, se non mi sbaglio', correct: true },
      { text: 'mi sembra tra 4,2 e 5,6', correct: false }
    ]
  },
  {
    question: nome + ', hai i semi?',
    answers: [
      { text: 'si :(', correct: true },
      { text: 'no :)', correct: true },
      { text: 'certo che no', correct: false }
    ]
  },
  {
    question: 'e ' + nome + ', vorresti perderli i tuoi semi?',
    answers: [
      { text: 'si, non ne posso più', correct: true },
      { text: 'per fortuna sono nato senza', correct: true },
      { text: 'ho detto che non ne ho', correct: false }
    ]
  },
  {
    question: nome + ', sei fiero delle tue foglie?',
    answers: [
      { text: 'me le hanno staccate :(', correct: true },
      { text: 'si, molto', correct: true },
      { text: 'non dispongo di foglie', correct: false }
    ]
  },
  {
    question: nome + ', ti piace stare sulle torte?',
    answers: [
      { text: 'si, decisamente', correct: true },
      { text: 'preferisco la macedonia', correct: true },
      { text: 'preferisco mangiarle le torte', correct: false }
    ]
  },
  {
    question: nome + ', cibo preferito?',
    answers: [
      { text: 'ravioli sardi', correct: false },
      { text: 'acqua, sali minerali e tanto sole', correct: true },
      { text: 'uva', correct: false }
    ]
  },
  {
    question: nome + ', come preferisci definire il tuo sistema locomotore?',
    answers: [
      { text: 'graspo', correct: true },
      { text: 'sistema scheletrico e muscolare', correct: false },
      { text: 'sono stupido e non so cosa voglia dire', correct: false }
    ]
  },
  {
    question: nome + ', ultima domanda: sei fiero della tua natura da uva?',
    answers: [
      { text: 'si, assolutamente', correct: true },
      { text: 'no...', correct: false },
      { text: 'sono stufo di questo test inutile, non sono uva', correct: false }
    ]
  }
]

//document.getElementById("testo").innerHTML = "fai la tua scelta, " + nome;

let punteggio = 0

let shuffledQuestions, currentQuestionIndex

function click(){
  getElementById("question").style.backgroundColor = "green"
  getElementById("btn").style.backgroundColor = "green"
}

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})
restartButton.addEventListener('click', refreshPage)

function refreshPage(){
    window.location.reload();
}

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions//.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
   resetState()
   showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  restartButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}



function selectAnswer(e) {  
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (selectedButton.dataset.correct){
    console.log('correct')
    console.log(punteggio++)
  }else{
    console.log('wrong')
    console.log(punteggio)

  }
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
    restartButton.classList.remove('hide')
  } else {
    questionContainerElement.classList.add('hide')
    titolo.classList.add('hide')
    riprovaButton.classList.remove('hide')
    risultato.classList.remove('hide')
    if(punteggio <= 6){
      risultato.innerText = 'Tu non sei uva'
    } else {
      if(punteggio > 6 && punteggio <= 10){
        risultato.innerText = 'Uva bianca: \nÈ chiaro che tu sia uva, ma non hai ancora accettato la realtà. Dovresti prenderti un attimo per riflettere sulla tua esistenza da uva'
      } else {
        if(punteggio > 10 && punteggio <= 13) {
          risultato.innerText = 'Uva rossa: \nTu sei uva e ne sei consapevole, certo non rinneghi la tua esistenza, ma a volte la nascondi'
        } else {
          if (punteggio > 13) {
            risultato.innerText = 'Uva nera: \nSei consapevole e fortemente convinto della tua essenza da uva, ed inoltre ne vai fiero. Continua così!'
          }
        }
      }
    }
  }
 
}


function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}



function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

function one(){
let uno = document.getElementById('1')
let due= document.getElementById('2')
let tre = document.getElementById('3')
let quattro = document.getElementById('4')
  uno.style.backgroundColor = '#00FF6A'
  due.style.backgroundColor = '#ff00ff'
}


console.log(questions.length)
