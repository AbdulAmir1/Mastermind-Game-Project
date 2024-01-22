const NUMBER_OF_HOLES = 4
let player1CodePattern = ['red', 'blue', 'yellow', 'green']
// let resultArray = []

const compareP1CodeToP2Guess = (p2Guess) => {
  let j = 0
  let colorMatch = true
  let resultArray = []

  console.assert(
    p2Guess.length === NUMBER_OF_HOLES,
    'p2Guess array length is correct'
  )

  for (let i = 0; i < player1CodePattern.length; i++) {
    if (p2Guess[i] === player1CodePattern[i]) {
      resultArray.push(2)
    } else if (player1CodePattern.includes(p2Guess[i])) {
      resultArray.push(1)
    } else {
      resultArray.push(0)
    }
  }

  while (resultArray[j] === 2) {
    j++
    if (j > NUMBER_OF_HOLES - 1) {
      return { playerWin: true, roundGuessResult: resultArray }
    }
  }

  return { playerWin: false, roundGuessResult: resultArray }
}

const evaluatePlayerGuessPattern = (player2Guess) => {
  let player2GuessedRight
  const roundResult = compareP1CodeToP2Guess(player2Guess)

  if (roundResult.playerWin) {
    player2GuessedRight = true
  } else {
    player2GuessedRight = false
  }

  updateGameboardUIDOM(roundResult.roundGuessResult)
  return player2GuessedRight
}
