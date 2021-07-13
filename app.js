const grid = document.querySelector('.grid')
const startBtn = document.querySelector('#start')
const scoreDisplay = document.querySelector('#score')
const width = 10
let squares = []
let currentSnake = [2,1,0]
let direction = 1
let appleIndex = 0
let score = 0
let intervalTime = 1000
let speed = 0.9
let timerId = 0

function createGrid() {
    // Create 100 elements with a for loop
    for (let i = 0; i < 100; i++ ) {
    // Create element
    const square = document.createElement('div')
    // Add styling to the element
    square.classList.add('square')
    // Put the element into our grid
    grid.appendChild(square)
    // Push it into a new squares array
    squares.push(square)
    }
}

createGrid()

currentSnake.forEach(index => squares[index].classList.add('snake'))

function move() {
    if (
        // Checking if snake has hit bottom
        (currentSnake[0] + width >= width*width && direction === width) ||
        // if snake has hit right wall
        (currentSnake[0] % width === width - 1 && direction === 1) ||
        // if snake has hit left wall
        (currentSnake[0] % width === 0 && direction === -1) ||
        // if snake has hit top
        (currentSnake[0] - width < 0 && direction === -width) ||
        // if snake crushes into itself
        squares[currentSnake[0] + direction].classList.contains('snake')
    ) {
        return clearInterval(timerId)
    }

    // Remove last element from currentSnake array
    const tail = currentSnake.pop()
    // Remove styling from last element
    squares[tail].classList.remove('snake')
    // Add square in direction we are heading
    currentSnake.unshift(currentSnake[0] + direction)

    // Deal with snake head getting the apple
    if (squares[currentSnake[0]].classList.contains('apple')) {
        // Remove the class of apple
        squares[currentSnake[0]].classList.remove('apple')
        // Grow snake by adding class of snake to it
        squares[tail].classList.add('snake')
        // Grow snake array
        currentSnake.push(tail)
        // Generate a new apple
        generateApples()
        // Add one to the score
        score++
        // Display the score
        scoreDisplay.textContent = score
        // Speed up the snake
        clearInterval(timerId)
        intervalTime = intervalTime * speed
        timerId = setInterval(move, intervalTime)
    }

    // Add styling so we can see it
    squares[currentSnake[0]].classList.add('snake')
}


function generateApples () {
    do {
        appleIndex = Math.floor(Math.random() * squares.length) + 1
        // generate a random number
    } while (squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')
}

generateApples()

function control (e) {
    if (e.which === 39) {
        direction = 1
    } else if (e.which === 38) {
        direction = -width
    } else if (e.which === 37) {
       direction = -1
    } else if (e.which === 40) {
       direction = +width
    }
}

function startGame () {
    // remove the snake
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    // remove the apple
    squares[appleIndex].classList.remove('apple')
    clearInterval(timerId)
    currentSnake = [2,1,0]
    direction = 1
    score = 0
    // re-add a new score to browser
    scoreDisplay.textContent = score
    intervalTime = 1000
    generateApples()
    // readd the class of snake to a new currentSnake
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    timerId = setInterval(move, intervalTime)
}

startBtn.addEventListener('click', startGame)


document.addEventListener('keydown', control)


