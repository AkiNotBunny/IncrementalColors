/*---Storage of Game Data---*/
const originalGameData = {
  red: 0,
  redPerClick: 1000,
  redPerClickCost: 25,
  redPerSecond: 0,
  redPerSecondCost: 100, // unit: orange

  orangeRevealed: false,
  orange: 0,
  orangePerClick: 100,
  orangePerClickCost: 25,
  orangePerSecond: 0,
  orangePerSecondCost: 100,
}

var gameData = structuredClone(originalGameData);

/*---Button Functions---*/

// Red
function gainRed() {
  gameData.red += gameData.redPerClick
  restoreVisual()
}

function buyRedPerClick () {
  if (gameData.red >= gameData.redPerClickCost) {
    gameData.red -= gameData.redPerClickCost
    gameData.redPerClick ++
    gameData.redPerClickCost *=2
    restoreVisual()
  }
}

function autoRed() {
  gameData.red += gameData.redPerSecond
  restoreVisual()

}

function buyRedPerSecond () {
  if (gameData.orange >= gameData.redPerSecondCost) {
    gameData.orange -= gameData.orangePerSecondCost
    gameData.redPerSecond ++
    gameData.redPerSecondCost *=1.5
  }
}

// Orange
function revealOrange() {
  if (gameData.red >= 500) {
    gameData.orangeRevealed = true
  }

  const orangeButtons = document.getElementsByClassName("orange-button")
  if (gameData.orangeRevealed) {

    for (let i = 0; i < orangeButtons.length; i++){
      orangeButtons[i].style.visibility = "visible"
    }
  }

  if (!gameData.orangeRevealed) {

    for (let i = 0; i < orangeButtons.length; i++){
      orangeButtons[i].style.visibility = "hidden"
    }

  }

}

function gainOrange() {
  if (gameData.red >= 10) {
    gameData.red -= 10
    gameData.orange += gameData.orangePerClick
    restoreVisual()
  }
}

function buyOrangePerClick () {
  if (gameData.orange >= gameData.orangePerClickCost) {
    gameData.orange -= gameData.orangePerClickCost
    gameData.orangePerClick ++
    gameData.orangePerClickCost *=2
    restoreVisual()
  }
}


/*---Main Game Loop---*/
var mainGameLoop = window.setInterval(
  function () {
    restoreVisual()
    autoRed()
  }, 1000
)


/*---Visual Effects---*/

function restoreVisual() {
  document.getElementById("red-counter").innerHTML = gameData.red
  document.getElementById("red-upgrade").innerHTML = `[${gameData.redPerClick}] -- ${gameData.redPerClickCost} Red`
  document.getElementById("red-auto").innerHTML = `[${gameData.redPerSecond}] -- ${gameData.redPerSecondCost} Orange`
  revealOrange()
  document.getElementById("orange-counter").innerHTML = gameData.orange
  document.getElementById("orange-upgrade").innerHTML = `[${gameData.orangePerClick}] -- ${gameData.orangePerClickCost} Orange`
}



/*---Auto Save & Load---*/
var saveGameLoop = window.setInterval(
  function() {
    localStorage.setItem("icSave", JSON.stringify(gameData))
  }, 1500
)

window.addEventListener('load', function () {
  var savegame = JSON.parse(localStorage.getItem("icSave"))
  if (savegame !== null) {
    gameData = savegame
    restoreVisual()
  }
});

/*---Restart the Game---*/
document.getElementById("restart-button").addEventListener('click', function () {
  const userConfirmed = confirm('Are you sure you want to restart? All progress will be lost!')
  if (userConfirmed) {
    restartGame()
  }
})

function restartGame() {
  // Restore Data Storage
  gameData = originalGameData
  // Clear Save
  localStorage.setItem("icSave", JSON.stringify(originalGameData))
  // Restore Visual
  restoreVisual()
}
