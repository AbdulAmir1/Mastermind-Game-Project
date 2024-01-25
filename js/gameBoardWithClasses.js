// TODO: move allColors[] from script.js to MastermundGame class
class MastermindGame {
  test1() {
    // this.codeBreaker.clearAllPlayer2Sections()

    // this.codeMaker.createNewCode()
    // this.codeBreaker.setClickEventFor(this.codeBreaker.nextPlayerSection)
    // MastermindGame.codeCoveringBox.style.display = 'none'
    // MastermindGame.endGame()
    // MastermindGame.restartGame()
    MastermindGame.codeCoveringBox.style.display = 'none'
    console.log('Test Done!!')
  }

  test2() {
    // this.codeBreaker.clearAllPlayer2Sections()

    // this.codeMaker.createNewCode()
    // this.codeBreaker.setClickEventFor(this.codeBreaker.nextPlayerSection)
    // MastermindGame.codeCoveringBox.style.display = 'none'
    // MastermindGame.endGame()
    // MastermindGame.restartGame()
    MastermindGame.codeCoveringBox.style.display = 'block'
    console.log('Test Done!!')
  }

  static timeBoard = document.querySelector('.timeBoard')
  static currentColorHole = null
  static colorPickerDialog = document.querySelector('dialog.colors-dialog')
  static submitPlayerPatternGuessDialog = document.querySelector(
    'dialog.submit-player2-answer'
  )
  static codeCoveringBox = document.querySelector('.codeSectionCovering')

  static submitPlayerPatternGuessDialogOkButton =
    MastermindGame.submitPlayerPatternGuessDialog.querySelector('div .ok')

  static displayMessageDialog = document.querySelector(
    'dialog.display-message-dialog'
  )

  static NUMBER_OF_HOLES = 4
  static codeMakerPattern = null
  static player2Section = null
  static player2Sections = null
  static player2SectionResultHoles = null
  static roundNumber = 0
  static myCodeBreaker = null
  static myCodeMaker = null
  static playerName = 'Unknown'
  static timer = 5000
  static endTime = 0
  static mainTimeOut = null

  constructor() {
    this.gameLevel = 1
    this.playerName = 'Unknown'
    this.codeBreaker = null
    this.codeMaker = null
    this.player1CodePattern = []
    this.nextTurn = 0
    this.roundNumber = 0
    // MastermindGame.timeBoard.innerText = `Time: ${MastermindGame.timer}`
    this.startGame()
  }

  startGame() {
    this.initializeVariables()
    this.codeMaker.createNewCode()
    MastermindGame.hideCodeSection(true)
    this.codeBreaker.setClickEventFor(this.codeBreaker.nextPlayerSection)
    /* MastermindGame.mainTimeOut = setTimeout(
      MastermindGame.endGameAfter,
      MastermindGame.timer
    ) */
  }

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

  static endGameAfter() {
    //console.log('this[value] :'.this)
    MastermindGame.timeBoard.innerText = 'Time Up'
    MastermindGame.endTime = 0
  }

  static hideCodeSection(hide) {
    if (hide) {
      console.log('hiding..')
      MastermindGame.codeCoveringBox.style.display = 'block'
    } else {
      MastermindGame.codeCoveringBox.style.display = 'none'
    }
  }

  initializeVariables() {
    this.codeMaker = new CodeMaker(this)
    this.codeBreaker = new CodeBreaker(this)
    MastermindGame.myCodeBreaker = this.codeBreaker
    MastermindGame.myCodeMaker = this.codeMaker
    MastermindGame.createColorPickerDialogCircles()
    MastermindGame.prepareColorsPickerDialog()
    MastermindGame.prepareSubmitDialogFunctions()
    console.log('self in MastermindGame class is ::::', self)
    this.playerName = this.setPlayerName()
    MastermindGame.playerName = document.querySelector('h2.player2')
    MastermindGame.playerName.innerText = this.playerName
  }

  setPlayerName = () => {
    return localStorage.getItem('playerName')
  }

  static endGame = () => {
    MastermindGame.myCodeBreaker.disableClickEventFor(
      MastermindGame.player2Section
    )

    MastermindGame.displayMessage('GAME OVER')
    setTimeout(() => {
      MastermindGame.displayMessageDialog.open = false
    }, 1100)

    MastermindGame.hideCodeSection(false)
  }

  static startNextTurn() {
    //console.log('Starting next turn...')
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

  static setNextPlayerSectionResultHoles() {
    MastermindGame.player2SectionResultHoles =
      MastermindGame.player2Section.querySelectorAll('div.player-result-hole')
  }

  static createColorPickerDialogCircles() {
    const colorsBox =
      MastermindGame.colorPickerDialog.querySelector('div.colors-box')
    allColors.forEach((color) => {
      const colorCircle = document.createElement('div')
      colorCircle.className = 'color-selection-circle'
      colorCircle.style.backgroundColor = color
      colorCircle.setAttribute('color-name', color)
      colorsBox.appendChild(colorCircle)
    })
  }

  static colorHoleNotEmpty(colorHoleDiv) {
    return colorHoleDiv.getAttribute('title') !== ''
  }

  static displayMessage(message) {
    MastermindGame.displayMessageDialog.querySelector('.message').innerText =
      message
    MastermindGame.displayMessageDialog.open = true
  }

  static isAllPlayer2HolesFilled(divsList) {
    for (let i = 0; i < divsList.length; i++) {
      // 'hole #', i, ' color  =>', divsList[i].getAttribute('title')
      if (MastermindGame.colorHoleNotEmpty(divsList[i]) === false) {
        return false
      }
    }

    return true
  }

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

  static prepareColorsPickerDialog() {
    const allColorsDialiogColorCircles =
      MastermindGame.colorPickerDialog.querySelectorAll(
        'div.color-selection-circle'
      )

    allColorsDialiogColorCircles.forEach((circleDiv) => {
      circleDiv.addEventListener('click', (e) => {
        // alert('color selected ok.')

        // ;('ok u select color circle on color dialog')
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

  static compareP1CodeToP2Guess = (p2Guess) => {
    let j = 0
    let colorMatch = true
    let resultArray = []

    console.assert(
      p2Guess.length === MastermindGame.NUMBER_OF_HOLES,
      'p2Guess array length is correct'
    )

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

  static addColorToResultSectionCircle(isItMatchColor, matchingColor) {
    // TODO : add black or white circle
    // let nextColorDiv = player2ResultDivs[0]
    // 'player2ResultDivs is ====> ', player2ResultDivs
    // return

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

  static fillPlayer2GuessResultColorHoles(player2GuessResultArray) {
    // 'filling result holes...', player2GuessResultArray
    player2GuessResultArray.forEach((colorComparisionResult) => {
      if (colorComparisionResult.value === 2) {
        MastermindGame.addColorToResultSectionCircle(
          true,
          colorComparisionResult.color
        )
      } // else if (value === 1) {
      //   MastermindGame.addColorToResultSectionCircle(false)
      // }
    })
  }

  static updateGameboardUIDOM(player2GuessResultArray) {
    // displayResultInConsole()
    MastermindGame.fillPlayer2GuessResultColorHoles(player2GuessResultArray)
  }

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

  static prepareSubmitDialogFunctions() {
    MastermindGame.submitPlayerPatternGuessDialogOkButton.addEventListener(
      'click',
      () => {
        // TODO : build the player2 guess array and call evaluatePlayerGuessPattern() method

        const playerPatternGuess = []
        const player2ColorCircles =
          MastermindGame.player2Section.querySelectorAll(
            'div.player2-color-holes div[title]'
          )

        player2ColorCircles.forEach((colorHoleDiv) => {
          // ('player2 selected', playerPatternGuess)
          playerPatternGuess.push(colorHoleDiv.getAttribute('title'))
        })

        // ('player2 selected', playerPatternGuess)
        if (MastermindGame.evaluatePlayerGuessPattern(playerPatternGuess)) {
          //;('YOU WIN ----- ')
          MastermindGame.displayMessage('YOU WIN')
        } else {
          //;('YOU LOSE ----- ')
          MastermindGame.displayMessage('YOU LOSE')
          setTimeout(() => {
            MastermindGame.displayMessageDialog.open = false
            MastermindGame.startNextTurn()
          }, 1500)
        }

        //clearPlayer2SelectedPattern(player2ColorHoles)
        MastermindGame.submitPlayerPatternGuessDialog.open = false
      }
    )
  }
}

class CodeMaker {
  constructor(gameParent) {
    this.parent = gameParent
    this.player1Section = document.querySelector('div.player1-section')
  }

  setCodePattern() {
    this.parent.player1CodePattern = []
    for (let i = 0; i < 4; i++) {
      const randomColorIndex = Math.floor(Math.random() * allColors.length)
      this.parent.player1CodePattern.push(allColors[randomColorIndex])
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

  pickColor(e) {
    // alert('Color select dialog openning...')
    // 'e in pickColor() is : ', e
    MastermindGame.colorPickerDialog.open = true
    MastermindGame.currentColorHole = e
    e.target.style.borderWidth = '3px'
  }

  clickHandler(e) {
    self.pickColor(e)
    e = MastermindGame.currentColorHole
  }

  clickHandler2() {
    // console.log('pickColor2 is ', this.pickColor)
  }

  setClickEventFor(player2Section) {
    const allColorCircles = player2Section.querySelectorAll(
      '.player2-color-holes div[title]'
    )

    allColorCircles.forEach((colorCircleDiv) => {
      colorCircleDiv.addEventListener('click', self.clickHandler)
    })
  }

  disableClickEventFor(player2Section) {
    const allColorCircles = player2Section.querySelectorAll(
      '.player2-color-holes div[title]'
    )

    allColorCircles.forEach((colorCircleDiv) => {
      colorCircleDiv.removeEventListener('click', self.clickHandler)
    })
  }

  clearAllPlayer2Sections() {
    this.player2Sections.forEach((player2Section) => {
      this.clearAllTitleAttribute(player2Section, '')
      this.removeSelectedColors(player2Section)
      MastermindGame.myCodeBreaker.disableClickEventFor(player2Section)
      MastermindGame.myCodeBreaker.clearAllResutCircles()
    })
  }

  clearAllResutCircles() {
    const player2SectionsResultHoles = document.querySelectorAll(
      'div.player-result-hole'
    )
    player2SectionsResultHoles.forEach((circle) => {
      circle.style.backgroundColor = '#fff'
      circle.setAttribute('colorValue', '')
    })
  }

  clearAllTitleAttribute(player2SectionDiv, value) {
    const allColors = player2SectionDiv.querySelectorAll(
      'div.player2-color-holes div'
    )

    allColors.forEach((colorCircle) => {
      colorCircle.setAttribute('title', value)
    })
  }

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
