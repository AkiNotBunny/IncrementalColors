/*---Storage of Game Data---*/
var gameData = {
  red: 0,
  redPerClick: 1,
  redPerClickCost: 25
}



/*---Button Functions---*/

// Red
function gainRed() {
  gameData.red +=gameData.redPerClick
  document.getElementById("red-counter").innerHTML = gameData.red
}
function buyRedPerClick () {
  if (gameData.red >= gameData.redPerClickCost) {
    gameData.red -= gameData.redPerClickCost
    gameData.redPerClick ++
    gameData.redPerClickCost *=2
    document.getElementById("red-counter").innerHTML = gameData.red
    document.getElementById("red-upgrade").innerHTML = "[" + gameData.redPerClick + "] -- " + gameData.redPerClickCost
  }
}


/*---Auto Save & Load---*/
var saveGameLoop = window.setInterval(
  function() {
    localStorage.setItem("icSave", JSON.stringify(gameData))
  }, 15000
)

window.addEventListener('load', function () {
  var savegame = JSON.parse(localStorage.getItem("icSave"))
  if (savegame !== null) {
    gameData = savegame
    document.getElementById("red-counter").innerHTML = gameData.red
    document.getElementById("red-upgrade").innerHTML = "[" + gameData.redPerClick + "] -- " + gameData.redPerClickCost
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
  gameData.red = 0,
  gameData.redPerClick = 1,
  gameData.redPerClickCost = 25,
  // Clear Save
  localStorage.setItem("icSave", JSON.stringify(gameData))
  // Restore Visual
  document.getElementById("red-counter").innerHTML = gameData.red
  document.getElementById("red-upgrade").innerHTML = "[" + gameData.redPerClick + "] -- " + gameData.redPerClickCost
}
