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
  if (compareP1CodeToP2Guess(player2Guess)) {
    return true
  } else {
    return false
  }
}

const updateGameboardUIDOM = () => {}

const test = () => {
  console.assert(
    evaluatePlayerGuessPattern([
      'colorName1',
      'colorName2',
      'colorName3',
      'colorName4'
    ]),
    'evaluatePlayerGuessPattern() can evaluate the player2 guess 1'
  )

  console.assert(
    evaluatePlayerGuessPattern([
      'colorName1',
      'colorName2',
      'colorName',
      'colorName4'
    ]) === false,
    'evaluatePlayerGuessPattern() can evaluate the player2 guess 2'
  )
}

console.log('testing...')
test()
