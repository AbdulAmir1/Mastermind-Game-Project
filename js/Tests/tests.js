const test = () => {
  console.log('testing...')
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

test()

console.log(
  'result of assert 1',
  evaluatePlayerGuessPattern([
    'colorName1',
    'colorName2',
    'colorName3',
    'colorName4'
  ])
)
