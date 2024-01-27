// Main class : the game functioalities including starting, ending a game and checking for a winner. The player info.
// and a set of methods to handle UI dynamic updates.

class MastermindGame {
  static currentColorHole = null
  static colorPickerDialog = document.querySelector('dialog.colors-dialog')
  static submitPlayerPatternGuessDialog = document.querySelector(
    'dialog.submit-player2-answer'
  )
  static allColors = [
    'red',
    'blue',
    'yellow',
    'green',
    'cyan',
    'pink',
    'orange'
  ]
  static codeCoveringBox = document.querySelector('.codeSectionCovering')

  static submitPlayerPatternGuessDialogOkButton =
    MastermindGame.submitPlayerPatternGuessDialog.querySelector('div .ok')

  static displayMessageDialog = document.querySelector(
    'dialog.display-message-dialog'
  )

  // Number of colors of a color pattern to guess and win the game
  static NUMBER_OF_HOLES = 4

  // UI DOM Elements
  static codeMakerPattern = null
  static player2Section = null
  static player2Sections = null
  static player2SectionResultHoles = null

  // variable to keep track of the number of the remaining rounds to play
  static roundNumber = 0

  // CodeBreaker class object (see below)
  static myCodeBreaker = null

  // CodeMaker class object (see below)
  static myCodeMaker = null

  // player name initial value
  static playerName = 'Unknown'
  static endTime = 0

  constructor() {
    this.gameLevel = 1
    this.playerName = 'Unknown'
    this.codeBreaker = null
    this.codeMaker = null
    this.player1CodePattern = []
    this.nextTurn = 0
    this.roundNumber = 0
    this.startGame()
  }

  // a method to start the game and set the object initial values
  startGame() {
    this.initializeVariables()
    this.codeMaker.createNewCode()
    MastermindGame.hideCodeSection(true)
    this.codeBreaker.setClickEventFor(this.codeBreaker.nextPlayerSection)
  }

  // a method to enable the player to replay the game
  static restartGame() {
    MastermindGame.myCodeBreaker.clearAllPlayer2Sections()
    this.myCodeMaker.createNewCode()
    MastermindGame.hideCodeSection(true)
    MastermindGame.roundNumber = 0
    MastermindGame.player2Section =
      MastermindGame.player2Sections[
        MastermindGame.player2Sections.length - 1 - MastermindGame.roundNumber
      ]
    MastermindGame.myCodeBreaker.setClickEventFor(MastermindGame.player2Section)
  }

  // method to handle the UI DOM
  static hideCodeSection(hide) {
    if (hide) {
      MastermindGame.codeCoveringBox.style.display = 'block'
    } else {
      MastermindGame.codeCoveringBox.style.display = 'none'
    }
  }

  // method to initialize the game variables
  initializeVariables() {
    this.codeMaker = new CodeMaker(this)
    this.codeBreaker = new CodeBreaker(this)
    MastermindGame.myCodeBreaker = this.codeBreaker
    MastermindGame.myCodeMaker = this.codeMaker
    MastermindGame.createColorPickerDialogCircles()
    MastermindGame.prepareColorsPickerDialog()
    MastermindGame.prepareSubmitDialogFunctions()
    this.playerName = this.setPlayerName()
    MastermindGame.playerName = document.querySelector('h2.player2')
    MastermindGame.playerName.innerText = this.playerName
  }

  // method to handle the UI DOM
  setPlayerName = () => {
    return localStorage.getItem('playerName')
  }

  // method to update the UI DOM when the game ends
  static endGame = (userWins) => {
    MastermindGame.myCodeBreaker.disableClickEventFor(
      MastermindGame.player2Section
    )

    if (!userWins) {
      MastermindGame.displayMessage('GAME OVER')
    }

    setTimeout(() => {
      MastermindGame.displayMessageDialog.open = false
    }, 1100)

    MastermindGame.hideCodeSection(false)
  }

  // method to update the UI DOM for playing next turn
  static startNextTurn() {
    MastermindGame.roundNumber++

    if (
      MastermindGame.roundNumber >
      MastermindGame.player2Sections.length - 1
    ) {
      MastermindGame.displayMessage('GAME OVER')
      MastermindGame.hideCodeSection(false)
      return
    }

    MastermindGame.myCodeBreaker.disableClickEventFor(
      MastermindGame.player2Section
    )
    MastermindGame.player2Section =
      MastermindGame.player2Sections[
        MastermindGame.player2Sections.length - 1 - MastermindGame.roundNumber
      ]

    MastermindGame.setNextPlayerSectionResultHoles()

    MastermindGame.myCodeBreaker.setClickEventFor(MastermindGame.player2Section)
  }

  // method to update the UI DOM
  static setNextPlayerSectionResultHoles() {
    MastermindGame.player2SectionResultHoles =
      MastermindGame.player2Section.querySelectorAll('div.player-result-hole')
  }

  // Make the color Mastermind game picker
  static createColorPickerDialogCircles() {
    const colorsBox =
      MastermindGame.colorPickerDialog.querySelector('div.colors-box')
    MastermindGame.allColors.forEach((color) => {
      const colorCircle = document.createElement('div')
      colorCircle.className = 'color-selection-circle'
      colorCircle.style.backgroundColor = color
      colorCircle.setAttribute('color-name', color)
      colorsBox.appendChild(colorCircle)
    })
  }

  // method to check UI DOM
  static colorHoleNotEmpty(colorHoleDiv) {
    return colorHoleDiv.getAttribute('title') !== ''
  }

  // method to display a dialog
  static displayMessage(message) {
    MastermindGame.displayMessageDialog.querySelector('.message').innerText =
      message
    MastermindGame.displayMessageDialog.open = true
  }

  // method to check the UI DOM
  static isAllPlayer2HolesFilled(divsList) {
    for (let i = 0; i < divsList.length; i++) {
      // 'hole #', i, ' color  =>', divsList[i].getAttribute('title')
      if (MastermindGame.colorHoleNotEmpty(divsList[i]) === false) {
        return false
      }
    }

    return true
  }

  // method to check the UI DOM
  static setSelectedHoleColor(colorHole, color) {
    //('setting color to ', color)
    colorHole.style.backgroundColor = color
    colorHole.setAttribute('title', color)
    const allColorCircles = MastermindGame.player2Section.querySelectorAll(
      '.player2-color-holes div[title]'
    )
    if (MastermindGame.isAllPlayer2HolesFilled(allColorCircles)) {
      MastermindGame.submitPlayerPatternGuessDialog.open = true
    }

    // ('All color holes selected ? ===> ', player2SelectedAllColorHoles)
  }

  // method to update the UI DOM
  static prepareColorsPickerDialog() {
    const allColorsDialiogColorCircles =
      MastermindGame.colorPickerDialog.querySelectorAll(
        'div.color-selection-circle'
      )

    allColorsDialiogColorCircles.forEach((circleDiv) => {
      circleDiv.addEventListener('click', (e) => {
        const pickedColor = e.target.getAttribute('color-name')
        MastermindGame.currentColorHole.target.style.borderWidth = '1px'
        MastermindGame.setSelectedHoleColor(
          MastermindGame.currentColorHole.target,
          pickedColor
        )
        MastermindGame.colorPickerDialog.open = false
      })
    })
  }

  // method to do color holes comparision in Mastermin game
  static compareP1CodeToP2Guess = (p2Guess) => {
    let j = 0
    let colorMatch = true
    let resultArray = []

    let obj = {}
    let colorComparisionResult = {}
    for (let i = 0; i < MastermindGame.codeMakerPattern.length; i++) {
      if (p2Guess[i] === MastermindGame.codeMakerPattern[i]) {
        colorComparisionResult = Object.create(obj)
        colorComparisionResult.value = 2
        colorComparisionResult.color = p2Guess[i]
        resultArray.push(colorComparisionResult)
      } else {
        colorComparisionResult = Object.create(obj)
        colorComparisionResult.value = 0
        colorComparisionResult.color = 'white'
        resultArray.push(colorComparisionResult)
      }
    }

    while (resultArray[j].value === 2) {
      j++
      if (j > MastermindGame.NUMBER_OF_HOLES - 1) {
        return { playerWin: true, roundGuessResult: resultArray }
      }
    }
    return { playerWin: false, roundGuessResult: resultArray }
  }

  // method to update the UI DOM
  static addColorToResultSectionCircle(isItMatchColor, matchingColor) {
    let i = 0
    while (
      MastermindGame.player2SectionResultHoles[i].getAttribute('colorValue') !==
      ''
    ) {
      i++
    }

    const resultColor = isItMatchColor ? 'black' : 'white'
    MastermindGame.player2SectionResultHoles[i].style.backgroundColor =
      matchingColor
    MastermindGame.player2SectionResultHoles[i].setAttribute(
      'colorValue',
      resultColor
    )
  }

  // method to update the UI DOM
  static fillPlayer2GuessResultColorHoles(player2GuessResultArray) {
    player2GuessResultArray.forEach((colorComparisionResult) => {
      if (colorComparisionResult.value === 2) {
        MastermindGame.addColorToResultSectionCircle(
          true,
          colorComparisionResult.color
        )
      }
    })
  }

  // method to update the UI DOM
  static updateGameboardUIDOM(player2GuessResultArray) {
    MastermindGame.fillPlayer2GuessResultColorHoles(player2GuessResultArray)
  }

  // method to check player guessed color pattern in Mastermind game
  static evaluatePlayerGuessPattern = (player2Guess) => {
    let player2GuessedRight
    const roundResult = MastermindGame.compareP1CodeToP2Guess(player2Guess)

    if (roundResult.playerWin) {
      player2GuessedRight = true
    } else {
      player2GuessedRight = false
    }

    MastermindGame.updateGameboardUIDOM(roundResult.roundGuessResult)
    return player2GuessedRight
  }

  // method to add event handles for a UI DOM to check if a player won the game
  static prepareSubmitDialogFunctions() {
    MastermindGame.submitPlayerPatternGuessDialogOkButton.addEventListener(
      'click',
      () => {
        const playerPatternGuess = []
        const player2ColorCircles =
          MastermindGame.player2Section.querySelectorAll(
            'div.player2-color-holes div[title]'
          )

        player2ColorCircles.forEach((colorHoleDiv) => {
          playerPatternGuess.push(colorHoleDiv.getAttribute('title'))
        })

        if (MastermindGame.evaluatePlayerGuessPattern(playerPatternGuess)) {
          MastermindGame.displayMessage('YOU WIN')
          MastermindGame.codeCoveringBox.style.display = 'none'
        } else {
          MastermindGame.displayMessage('YOU LOSE')
        }

        MastermindGame.submitPlayerPatternGuessDialog.open = false
      }
    )
  }
}

// class to set the secret color pattern in Mastermind game
class CodeMaker {
  constructor(gameParent) {
    this.parent = gameParent
    this.player1Section = document.querySelector('div.player1-section')
  }

  setCodePattern() {
    this.parent.player1CodePattern = []
    for (let i = 0; i < 4; i++) {
      const randomColorIndex = Math.floor(
        Math.random() * MastermindGame.allColors.length
      )
      this.parent.player1CodePattern.push(
        MastermindGame.allColors[randomColorIndex]
      )
    }

    MastermindGame.codeMakerPattern = this.parent.player1CodePattern
  }

  createNewCode() {
    this.setCodePattern()
    const codeMakerCircleDivs = this.player1Section.querySelectorAll('div')
    for (let i = 0; i < 4; i++) {
      codeMakerCircleDivs[i].style.backgroundColor =
        this.parent.player1CodePattern[i]
    }
  }
}

// class CodeBreaker is used to handle player actions. This inclues UI DOM dynamic update.
class CodeBreaker {
  static player2Section
  constructor(parentGame) {
    self = this
    this.parent = parentGame
    this.player2Sections = document.querySelectorAll(
      'div.game-board div.player2-sections div.player2-section'
    )

    this.nextPlayerSection =
      this.player2Sections[
        parentGame.nextTurn + this.player2Sections.length - 1
      ]

    this.nextPlayerSectionResultHoles = this.nextPlayerSection.querySelectorAll(
      'div.player-result-hole'
    )

    MastermindGame.player2Sections = this.player2Sections
    MastermindGame.player2Section = this.nextPlayerSection
    MastermindGame.player2SectionResultHoles = this.nextPlayerSectionResultHoles
  }

  // method to update the UI DOM
  pickColor(e) {
    MastermindGame.colorPickerDialog.open = true
    MastermindGame.currentColorHole = e
    e.target.style.borderWidth = '3px'
  }

  // method to handle user color selection
  clickHandler(e) {
    self.pickColor(e)
    e = MastermindGame.currentColorHole
  }

  // method to set click events for UI DOM
  setClickEventFor(player2Section) {
    const allColorCircles = player2Section.querySelectorAll(
      '.player2-color-holes div[title]'
    )

    allColorCircles.forEach((colorCircleDiv) => {
      colorCircleDiv.addEventListener('click', self.clickHandler)
    })
  }

  // method to remove click event handlers for UI DOM
  disableClickEventFor(player2Section) {
    const allColorCircles = player2Section.querySelectorAll(
      '.player2-color-holes div[title]'
    )

    allColorCircles.forEach((colorCircleDiv) => {
      colorCircleDiv.removeEventListener('click', self.clickHandler)
    })
  }

  // method to update UI DOM
  clearAllPlayer2Sections() {
    this.player2Sections.forEach((player2Section) => {
      this.clearAllTitleAttribute(player2Section, '')
      this.removeSelectedColors(player2Section)
      MastermindGame.myCodeBreaker.disableClickEventFor(player2Section)
      MastermindGame.myCodeBreaker.clearAllResutCircles()
    })
  }

  // method to update UI DOM
  clearAllResutCircles() {
    const player2SectionsResultHoles = document.querySelectorAll(
      'div.player-result-hole'
    )
    player2SectionsResultHoles.forEach((circle) => {
      circle.style.backgroundColor = '#fff'
      circle.setAttribute('colorValue', '')
    })
  }

  // method to update UI DOM
  clearAllTitleAttribute(player2SectionDiv, value) {
    const allColors = player2SectionDiv.querySelectorAll(
      'div.player2-color-holes div'
    )

    allColors.forEach((colorCircle) => {
      colorCircle.setAttribute('title', value)
    })
  }

  // method to update UI DOM
  removeSelectedColors(player2SectionDiv) {
    const allColors = player2SectionDiv.querySelectorAll(
      'div.player2-color-holes div'
    )
    //
    for (let i = 0; i < allColors.length; i++) {
      allColors[i].style.backgroundColor = '#fff'
    }
  }
}

// Starting the game by creating a new  Mastermind game class object
let game = new MastermindGame()
