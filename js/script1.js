// methods to update UI DOM (index.html)

const getPlayerNameDialog = document.querySelector('#userNameDialog')
const userNameDialog = document.querySelector('#userNameDialog')
const userNameInput = document.querySelector('#player')

document.querySelector('#startGameButton').addEventListener('click', () => {
  userNameDialog.open = true
  userNameDialog.style.animationPlayState = 'running'
  userNameInput.focus()
})

const startGame = () => {
  setPlayerName(userNameInput.value)
  location.href = 'main.html'
  console.log('Your name ==', userNameInput.value)
  userNameDialog.style.animationName = 'slideUp'
  userNameDialog.style.animationPlayState = 'running'
  userNameDialog.open = false
}

document.querySelector('#okButton').addEventListener('click', startGame)

userNameInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    startGame()
  }
})

const setPlayerName = (playerName) => {
  console.log('Setting name ==', userNameInput.value)
  localStorage.setItem('playerName', playerName)
}
