// TODO : see the cdialog color circles click event issue
const gameBoardPlayer2SctionsDiv = document.querySelector(
  'div.game-board div.player2-sections'
)
const colorPickerDialog = document.querySelector('dialog.colors-dialog')
const submitPlayerPatternGuessDialog = document.querySelector(
  'dialog.submit-player2-answer'
)

const removeColorsFrom = (player2SectionDiv) => {
  console.log('player2SectionDiv ===> ', player2SectionDiv)
  for (let i = 0; i < player2SectionDiv.length; i++) {
    console.log('player2ColorHolesSection[i]: ', player2SectionDiv[i])
    player2SectionDiv[i].style.backgroundColor = 'unset'
  }
}

const player2SectionDiv = document.querySelector('div.player2-section')

const startNextRound = () => {
  let newPlayer2Section = player2SectionDiv.cloneNode(true)

  //const nextPlayer2ResultHoles = newPlayer2Section.querySelectorAll(

  newPlayer2Section = clearPlayer2ResultColorHoles(newPlayer2Section)
  clearPlayer2SelectedPattern(newPlayer2Section.children[1].children)
  removeColorsFrom(newPlayer2Section.children[1].children)
  console.log('newPlayer2Section ===> ', newPlayer2Section)
  gameBoardPlayer2SctionsDiv.appendChild(newPlayer2Section)
}

const fillPlayer1ColorHoles = () => {
  setPlayer1CodePattern()
  for (let i = 0; i < 4; i++) {
    player1ColorHoles[i].style.backgroundColor = player1CodePattern[i]
  }
}

let player2SelectedAllColorHoles = false

/* const submitPlayerPatternGuessDialogOkButton =
  submitPlayerPatternGuessDialog.querySelector('div .ok') */
const player1ColorHoles = document.querySelectorAll('div.player1-section div')

player1ColorHoles.forEach((colorHoleDiv) => {})

const player2ColorHoles = document.querySelectorAll(
  '.player2-color-holes div[title]'
)

const displayMessageDialog = document.querySelector(
  'dialog.display-message-dialog'
)

const playerResults = document.querySelectorAll('div.player-result')

const player1ResultDivs = playerResults[0].querySelectorAll(
  'div.player-result-hole'
)

const player2ResultDivs = playerResults[1].querySelectorAll(
  'div.player-result-hole'
)

/* player2ColorHoles.forEach((colorHoleDiv) => {
  colorHoleDiv.addEventListener('click', (e) => {
    pickColor(e)
  })
})
 */
// clearPlayer2SelectedPattern()

// fillPlayer1ColorHoles()

const clearPlayer2SelectedPattern = (player2ColorHolesSection) => {
  console.log('player2ColorHolesSection  ==>', player2ColorHolesSection)
  for (let i = 0; i < player2ColorHolesSection.length; i++) {
    console.log('player2ColorHolesSection[i]: ', player2ColorHolesSection[i])
    player2ColorHolesSection[i].setAttribute('colorValue', '')
  }
  // player2ColorHolesSection.forEach((colorHoleDiv) => {
  //   colorHoleDiv.setAttribute('colorValue', '')
  // })
}

const clearPlayer2ResultColorHoles = (player2Section) => {
  console.log('player2Section.child[0] ===> ', player2Section.children)
  player2Section.children[2].innerHTML = `<div class="player-result-hole" colorValue></div>
  <div class="player-result-hole" colorValue></div>
  <div class="player-result-hole" colorValue></div>
  <div class="player-result-hole" colorValue></div>`
  player2Section.children[2]
    .querySelectorAll('div.player-result-hole')
    .forEach((colorDivHole) => {
      colorDivHole.style.backgroundColor = 'unset'
    })
  return player2Section
}

const colorHoleNotEmpty = (colorHoleDiv) => {
  return colorHoleDiv.getAttribute('title') !== ''
}

const isAllPlayer2HolesFilled = (divsList) => {
  for (let i = 0; i < divsList.length; i++) {
    // 'hole #', i, ' color  =>', divsList[i].getAttribute('title')
    if (colorHoleNotEmpty(divsList[i]) === false) {
      return false
    }
  }

  return true
}

/* submitPlayerPatternGuessDialogOkButton.addEventListener('click', () => {
  // TODO : build the player2 guess array and call evaluatePlayerGuessPattern() method
  const playerPatternGuess = []
  player2ColorHoles.forEach((colorHoleDiv) => {
    // ('player2 selected', playerPatternGuess)
    playerPatternGuess.push(colorHoleDiv.getAttribute('title'))
  })

  // ('player2 selected', playerPatternGuess)
  if (evaluatePlayerGuessPattern(playerPatternGuess)) {
    //;('YOU WIN ----- ')
    displayMessage('YOU WIN')
  } else {
    //;('YOU LOSE ----- ')
    displayMessage('YOU LOSE')
    setTimeout(() => {
      displayMessageDialog.open = false
      startNextRound()
    }, 1500)
  }

  clearPlayer2SelectedPattern(player2ColorHoles)
  submitPlayerPatternGuessDialog.open = false
})
 */
submitPlayerPatternGuessDialog
  .querySelector('div .cancel')
  .addEventListener('click', () => {
    submitPlayerPatternGuessDialog.open = false
  })

// ('submit dialog is: ', submitPlayerPatternGuess)
// ('Your color picker dialog:', colorPickerDialog)
let currentColorHole = null

const pickColor = (e) => {
  // alert('Color select dialog openning...')
  // 'e in pickColor() is : ', e
  colorPickerDialog.open = true
  currentColorHole = e
  e.target.style.borderWidth = '3px'
}

const setSelectedHoleColor = (colorHole, color) => {
  //;('current hole selection ==> ', colorHole)('setting color to ', color)
  colorHole.style.backgroundColor = color
  colorHole.setAttribute('title', color)

  if (isAllPlayer2HolesFilled(player2ColorHoles)) {
    submitPlayerPatternGuessDialog.open = true
  }

  // ('All color holes selected ? ===> ', player2SelectedAllColorHoles)
}

/* const createColorPickerDialogCircles = () => {
  const colorsBox = colorPickerDialog.querySelector('div.colors-box')
  allColors.forEach((color) => {
    const colorCircle = document.createElement('div')
    colorCircle.className = 'color-selection-circle'
    colorCircle.style.backgroundColor = color
    colorCircle.setAttribute('color-name', color)
    colorsBox.appendChild(colorCircle)
  })
}
 */
// createColorPickerDialogCircles()
const allColorsDialiogColorCircles = colorPickerDialog.querySelectorAll(
  'div.color-selection-circle'
)

/* allColorsDialiogColorCircles.forEach((circleDiv) => {
  circleDiv.addEventListener('click', (e) => {
    // alert('color selected ok.')

    // ;('ok u select color circle on color dialog')
    const pickedColor = e.target.getAttribute('color-name')
    currentColorHole.target.style.borderWidth = '1px'
    setSelectedHoleColor(currentColorHole.target, pickedColor)
    colorPickerDialog.open = false
  })
})
 */
const displayMessage = (message) => {
  displayMessageDialog.querySelector('.message').innerText = message
  displayMessageDialog.open = true
}

const fillPlayer2GuessResultColorHoles = (player2GuessResultArray) => {
  // 'filling result holes...', player2GuessResultArray
  player2GuessResultArray.forEach((value) => {
    if (value === 2) {
      addColorToResultSectionCircle(true)
    } else if (value === 1) {
      addColorToResultSectionCircle(false)
    }
  })
}

const addColorToResultSectionCircle = (isItMatchColor) => {
  // TODO : add black or white circle
  // let nextColorDiv = player2ResultDivs[0]
  // 'player2ResultDivs is ====> ', player2ResultDivs
  // return
  let i = 0
  while (player2ResultDivs[i].getAttribute('colorValue') !== '') {
    i++
  }

  const resultColor = isItMatchColor ? 'black' : 'white'
  player2ResultDivs[i].style.backgroundColor = resultColor
  player2ResultDivs[i].setAttribute('colorValue', resultColor)
}

const updateGameboardUIDOM = (player2GuessResultArray) => {
  // displayResultInConsole()
  fillPlayer2GuessResultColorHoles(player2GuessResultArray)
}

//----------------------  USING CLASSES

let game = new MastermindGame()
console.log('game object is ==> ', game)
