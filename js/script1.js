// methods to update UI DOM
document.querySelector('#startGameButton').addEventListener('click', () => {
  userNameDialog.open = true
  userNameDialog.style.animationPlayState = 'running'
})

const getPlayerNameDialog = document.querySelector('#userNameDialog')
const userNameDialog = document.querySelector('#userNameDialog')
const userNameInput = document.querySelector('#player')

document.querySelector('#okButton').addEventListener('click', () => {
  setPlayerName(userNameInput.value)
  location.href = 'main.html'
  console.log('Your name ==', userNameInput.value)
  userNameDialog.style.animationName = 'slideUp'
  userNameDialog.style.animationPlayState = 'running'
  userNameDialog.open = false
})

const setPlayerName = (playerName) => {
  console.log('Setting name ==', userNameInput.value)
  localStorage.setItem('playerName', playerName)
}
