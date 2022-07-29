const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
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
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
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

const questions = [
    {
        question: 'What is the type of your skin ?',
        answers: [
            { text: 'dry', correct: true },
            { text: 'ideal', correct: false },
            { text: 'soft', correct: false },
            { text: 'combination', correct: false }
        ]
    },
    {
        question: 'What is your gender',
        answers: [
            { text: 'male', correct: true },
            { text: 'female', correct: true },
        ]
    },
    {
        question: 'What result do you want to get ?',
        answers: [
            { text: 'Fresh and Clean Skin', correct: false },
            { text: 'No acne', correct: true },
            { text: 'Get rid of wrinkles', correct: false },
            { text: 'I am not sure yet', correct: false }
        ]
    },
    {
        question: 'What is the brand of the cosmetics you are looking for exactly?',
        answers: [
            { text: 'Garnier', correct: false },
            { text: 'Aloe Vera', correct: true },
            { text: 'Chanel', correct: true },
            { text: 'LOreal de Paris', correct: true }
        ]
    }
]

  
