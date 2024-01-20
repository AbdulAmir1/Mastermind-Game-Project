const NUMBER_OF_HOLES = 4
let player1CodePattern = [
  'colorName1',
  'colorName2',
  'colorName3',
  'colorName4'
]

const compareP1CodeToP2Guess = (p2Guess) => {
  let i = 0
  console.assert(
    p2Guess.length === NUMBER_OF_HOLES,
    'p2Guess array length is correct'
  )
  while (p2Guess[i] === player1CodePattern[i]) {
    i++
    if (i > NUMBER_OF_HOLES - 1) {
      return true
    }
  }

  return false
}

const evaluatePlayerGuessPattern = (player2Guess) => {
  let player2GuessedRight
  if (compareP1CodeToP2Guess(player2Guess)) {
    player2GuessedRight = true
  } else {
    player2GuessedRight = false
  }

  updateGameboardUIDOM(player2GuessedRight, player2Guess)
  return player2GuessedRight
}

const updateGameboardUIDOM = (player2GuessedRight, player2Guess) => {}
