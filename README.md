# **The Mastermind Game**

## Description

Mastermind game on [wikipedia](<https://en.wikipedia.org/wiki/Mastermind_(board_game)>).

## Wireframes

[Project WF](https://drive.google.com/file/d/1yfIKqCnkdzodZbOoAWQlaVri5tLzqK2P/view)

#### Sreenshuts

---

![My Image](screenshuts/Mastermind-browse.gif)
![My Image](screenshuts/MastermindTypeYourName.gif)
![My Image](screenshuts/YouLose.gif)
![My Image](screenshuts/PlayerWins.gif)
![My Image](screenshuts/GameOver.gif)

### _How to Play_

- Select Start
- Follow the instructions to play against the computer

Online project [link](http://amir-mayyad.surge.sh).

## How Does the javascript Code Work

- The code starts by creating a Mastermind class object in 'gameBoardWithClasses.js'
- This will create a CodeMaker and a CodeBreaker classes.
- The CodeMaker can be used to generate a new color code, and the secret code is hidden from the players eyes to make him start
  guessing the right answer.

  ```
    startGame() {
      this.initializeVariables()
      this.codeMaker.createNewCode()
      MastermindGame.hideCodeSection(true)
      this.codeBreaker.setClickEventFor(this.codeBreaker.nextPlayerSection)
    }
  ```

- To check if a player guessed the color pattern correctly, compare the hidden secret code (an array) with player guess (another array).

```
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
```

## Acknowledgments

- [Payne Fulcher](mailto:pfulcher26@gmail.com)
- [Mastermind Game Explained](https://www.youtube.com/watch?v=Dn0iqlY5tMU&ab_channel=GatherTogetherGames)
