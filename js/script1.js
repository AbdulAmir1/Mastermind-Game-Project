document.querySelector('#startGameButton').addEventListener('click', () => {
  console.log('starButton clicked.')
  userNameDialog.open = true
})

const userNameDialog = document.querySelector('#userNameDialog')
const userNameInput = document.querySelector('#player')

document.querySelector('#okButton').addEventListener('click', () => {
  setPlayerName(userNameInput.value)
  location.href = 'main.html'
  console.log('Your name ==', userNameInput.value)
  userNameDialog.open = false
})

const setPlayerName = (playerName) => {
  console.log('Setting name ==', userNameInput.value)
  localStorage.setItem('playerName', playerName)
}
