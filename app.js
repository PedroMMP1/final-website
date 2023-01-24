const questionDisplay = document.querySelector('#questions')
const answerDisplay = document.querySelector('#answer')

const questions = [
    {
       id: 0,
       text: "Qual é o teu género de filmes favorito?",
       answers: [
           {
               text: "Fantasia",
               image: "images/fantasy-4.png",
               alt: "Avada Kedavra",
              
           },
           {
               text: "Ação",
               image: "images/boom-4.png",
               alt:"I´ll be back",
               
           },
           {
               text: "Comédia",
               image: "images/laugh-4a.png",
               alt:"Risos a mil",
               
           },
           {
               text: "Romance",
               image: "images/romance-4.png",
               alt:"Bon Voyage",
               
           }
       ]
    },
    {
        id: 1,
        text: "Qual é o teu snack essencial para ver um filme?",
        answers: [
            {
                text: "Pipocas",
                image: "images/pop-4.png",
                alt:"POP POP POP",
                
            },
            {
                text: "Nachos",
                image: "images/nachos-4a.png",
                alt:"Triângulos Amarelos",
                
            },
            {
                text: "Almoço/Jantar",
                image: "images/dinners-4.png",
                alt:"O que vai ser o comer?",
                
            },
            {
                text: "Comida? Temos um filme para ver!",
                image: "images/air-4.png",
                alt:"Comida? Temos a sem porcento",
                
            }
        ]
    },
    {
        id: 2,
        text: "Que pessoa escolherias para tomar conta da tua casa?",
        answers: [
            {
                text: "O teu Vizinho",
                image: "images/neighbor-4.png",
                alt:"Aquele que te comprimenta todos os dias",
               
            },
            {
                text: "A tua Mãe/Pai",
                image: "images/parents-4.png",
                alt:"Pedra, papel, tesoura",
               
            },
            {
                text: "O/A teu melhor amigo/a",
                image: "images/friend-4.png",
                alt:"O menos desorganizado",
                
            },
            {
                text: "A casa cuida-se sozinha!",
                image: "images/emptyhouse-4.png",
                alt:"A casa tem paredes por alguma razão!",
                
            }
        ]
    }
]

const answers = [
    {
        combination: ["Ação", "Pipocas", "A casa cuida-se sozinha!"],
        text: "THE TERMINATOR",
        image: "images/term.jpg",
       
        
    },

    {
        combination: ["Fantasia", "Comida? Temos um filme para ver!", "O teu Vizinho"],
        text: "Harry Potter e a Câmara dos Segredos",
        image: "images/harry2.jpg",

        
    },
    {
        combination: ["Comédia", "Nachos", "O/A teu melhor amigo/a"],
        text: "Daddy Day Care",
        image: "images/eddy.jpg",

        
    },

    {
        combination: ["Romance", "Almoço/Jantar", "A tua Mãe/Pai"],
        text: "You, Me and Dupree",
        image: "images/you.jpg",

        
    },
    {
        combination: ["Ação", "Nachos", "O teu Vizinho"],
        text: "Taken",
        image: "images/taken.jpg",

        
    },
    {
        combination: ["Ação", "Comida? Temos um filme para ver!", "O/A teu melhor amigo/a"],
        text: "Uncharted",
        image: "images/un.jpg",

        
    },
    {
        combination: ["Ação", "Almoço/Jantar", "A tua Mãe/Pai"],
        text: "Creed I/II",
        image: "images/creed.jpg",

        
    },
    {
        combination: ["Fantasia", "Almoço/Jantar", "A tua Mãe/Pai"],
        text: "Star Wars Episode V",
        image: "images/star.jpg",

        
    },

]
// need to have a default answer to compensate for lack of combination data

const unansweredQuestions = []
const chosenAnswers = []

const populateQuestions = () => {
    questions.forEach(question => {
        const titleBlock = document.createElement('div')
        titleBlock.id = question.id
        titleBlock.classList.add('title-block')
        titleBlock.classList.add("title-block")
        const titleHeading = document.createElement('h2')
        titleHeading.textContent = question.text
        titleBlock.append(titleHeading)
        questionDisplay.append(titleBlock)

        const answersBlock = document.createElement('div')
        answersBlock.id = question.id + "-questions"
        answersBlock.classList.add('answer-options')

        unansweredQuestions.push(question.id)

        question.answers.forEach(answer => {
            const answerBlock = document.createElement('div')
            answerBlock.classList.add('answer-block')
            answerBlock.addEventListener('click', () => handleClick(question.id, answer.text))
            const answerImage = document.createElement('img')
            answerImage.setAttribute('src', answer.image)
            answerImage.setAttribute('alt', answer.alt)

            const answerTitle = document.createElement('h3')
            answerTitle.textContent = answer.text

            const answerInfo = document.createElement('p')
            const imageLink = document.createElement('a')
            imageLink.setAttribute('href', answer.image)
            imageLink.textContent = answer.credit
            const sourceLink = document.createElement('a')


            answerBlock.append(answerImage, answerTitle, answerInfo)

            answersBlock.append(answerBlock)
        })

        questionDisplay.append(answersBlock)

    })
}
populateQuestions()

const handleClick = (questionId, chosenAnswer) => {
    if (unansweredQuestions.includes(questionId))
    chosenAnswers.push(chosenAnswer)
    const itemToRemove = unansweredQuestions.indexOf(questionId)

    if (itemToRemove > -1) {
        unansweredQuestions.splice(itemToRemove, 1)
    }
    console.log(chosenAnswers)
    console.log(unansweredQuestions)

    disableQuestionBlock(questionId, chosenAnswer)
    const lowestQuestionId = Math.min(...unansweredQuestions)
    location.href = '#' + lowestQuestionId

    if (!unansweredQuestions.length) {
        location.href = '#answer'
        showAnswer()
    }
}

const showAnswer = () => {
    let result
    answers.forEach(answer => {
        if (
            chosenAnswers.includes(answer.combination[0]) +
            chosenAnswers.includes(answer.combination[1]) +
            chosenAnswers.includes(answer.combination[2])
        ) {
            result = answer
            return
        } else if (!result) {
            //first answer object is default
            result = answers[0]
        }
    })

    const answerBlock = document.createElement('div')
    answerBlock.classList.add('result-block')
    const answerTitle = document.createElement('h3')
    answerTitle.textContent = result.text
    const answerImage = document.createElement('img')
    answerImage.setAttribute('src', result.image)
    answerImage.setAttribute('alt', result.alt)

    answerBlock.append(answerTitle, answerImage)

    answerDisplay.append(answerBlock)

    const allAnswerBlocks = document.querySelectorAll('.answer-block')
    Array.from(allAnswerBlocks).forEach(answerBlock => answerBlock.replaceWith(answerBlock.cloneNode(true)))

}

const disableQuestionBlock = (questionId, chosenAnswer) => {
    const currentQuestionBlock = document.getElementById(questionId + "-questions")

    Array.from(currentQuestionBlock.children).forEach(block => {
        if (block.children.item(1).innerText !== chosenAnswer) {
            block.style.opacity = "50%"
        }
    })
}



