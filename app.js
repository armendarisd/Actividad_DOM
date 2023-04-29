const gameBoard = document.getElementById('board')
const scoreDisplay = document.getElementById('score')
const newGameButton = document.getElementById('newGame')

const rows = 4
const cols = 4
let SCORE = 0
let GAME_STATE = []

window.onload = () => createGame()
newGameButton.addEventListener('click', () => resetGame())
document.addEventListener('keyup', (event) => {
  if (event.key === 'ArrowUp') {
    moveUp()
    setNewTWoOrFour()
  } else if (event.key === 'ArrowDown') {
    moveDown()
    setNewTWoOrFour()
  } else if (event.key === 'ArrowLeft') {
    moveLeft()
    setNewTWoOrFour()
  } else if (event.key === 'ArrowRight') {
    moveRight()
    setNewTWoOrFour()
  }
})

// UI functions
function createGame() {
  SCORE = 0
  GAME_STATE = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const cell = document.createElement('div')
      const number = GAME_STATE[i][j]
      cell.id = `cell-${i}-${j}`
      updateCell(cell, number)
      gameBoard.appendChild(cell)
    }
  }

  setNewTWoOrFour()
  setNewTWoOrFour()
}

function resetGame() {
  scoreDisplay.innerText = SCORE
  gameBoard.innerHTML = ''
  createGame()
}

function updateCell(cell, number) {
  cell.innerText = ''
  cell.className = 'cell'

  if (number > 0) {
    cell.innerText = number
    cell.classList.add(`x${number}`)
    if (number >= 8192) {
      cell.classList.add('x8192')
    }
  }

  scoreDisplay.innerText = SCORE
  if (number === 2048) {
    setTimeout(() => alert('You win!'), 250)
  }
}

// Utility functions
const filterZeros = (arr) => arr.filter((num) => num !== 0)
function slide(row) {
  let arr = filterZeros(row)
  for (let i = 0; i < row.length - 1; i++) {
    if (arr[i + 1] != null && arr[i] === arr[i + 1]) {
      arr[i] *= 2
      arr[i + 1] = 0
      SCORE += arr[i]
    }
  }

  arr = filterZeros(arr)
  while (arr.length < cols) {
    arr.push(0)
  }
  return arr
}

function hasEmptyCell() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const cell = GAME_STATE[i][j]
      if (cell === 0) return true
    }
  }
  return false
}
function setNewTWoOrFour() {
  if (!hasEmptyCell()) {
    alert('Game Over')
    return
  }

  let found = false
  while (!found) {
    let row = Math.floor(Math.random() * rows)
    let col = Math.floor(Math.random() * cols)

    if (GAME_STATE[row][col] === 0) {
      GAME_STATE[row][col] = Math.random() < 0.9 ? 2 : 4
      const cell = document.getElementById(`cell-${row}-${col}`)
      updateCell(cell, GAME_STATE[row][col])
      found = true
    }
  }
}

// Move functions
function moveUp() {
  for (let j = 0; j < cols; j++) {
    let col = [
      GAME_STATE[0][j],
      GAME_STATE[1][j],
      GAME_STATE[2][j],
      GAME_STATE[3][j]
    ]
    col = slide(col)

    for (let i = 0; i < rows; i++) {
      GAME_STATE[i][j] = col[i]
      const cell = document.getElementById(`cell-${i}-${j}`)
      const number = GAME_STATE[i][j]
      updateCell(cell, number)
    }
  }
}

function moveDown() {
  for (let j = 0; j < cols; j++) {
    let col = [
      GAME_STATE[0][j],
      GAME_STATE[1][j],
      GAME_STATE[2][j],
      GAME_STATE[3][j]
    ]
    col.reverse()
    col = slide(col)
    col.reverse()

    for (let i = 0; i < rows; i++) {
      GAME_STATE[i][j] = col[i]
      const cell = document.getElementById(`cell-${i}-${j}`)
      const number = GAME_STATE[i][j]
      updateCell(cell, number)
    }
  }
}

function moveLeft() {
  for (let i = 0; i < rows; i++) {
    let row = GAME_STATE[i]
    row = slide(row)
    GAME_STATE[i] = row

    for (let j = 0; j < cols; j++) {
      const cell = document.getElementById(`cell-${i}-${j}`)
      const number = GAME_STATE[i][j]
      updateCell(cell, number)
    }
  }
}

function moveRight() {
  for (let i = 0; i < rows; i++) {
    let row = GAME_STATE[i]
    row.reverse()
    row = slide(row)
    row.reverse()
    GAME_STATE[i] = row

    for (let j = 0; j < cols; j++) {
      const cell = document.getElementById(`cell-${i}-${j}`)
      const number = GAME_STATE[i][j]
      updateCell(cell, number)
    }
  }
}
