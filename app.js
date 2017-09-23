const sound0 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
const sound1 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
const sound2 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
const sound3 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
const squares = document.querySelectorAll(".square");
const strictLight = document.querySelector(".strict-light");
const startButton = document.getElementById("start-button");
const strictButton = document.getElementById("strict-button");
const powerSwitch = document.getElementById("power-switch");
let counter = document.getElementById("count");
let gameArray = createGameArray(20);
let currentRoundArray = [];
let guessArray = [];
let count = 1;
let strictMode = false;

powerSwitch.addEventListener("change", switchOn, false);

console.log(gameArray);


function switchOn() {
  if (this.checked) {
    counter.style.color = "rgba(231, 5, 5, 0.66)";
    startButton.addEventListener("click", startGame, false);
    strictButton.addEventListener("click", strictModeButton, false);
  } else  {
    resetGame();
    // counter.style.color = "rgba(87, 3, 3, 0.66)";
    // startButton.removeEventListener("click", startGame, false);
    // counter.innerText = "--";
    // gameArray = createGameArray(20);
    // currentRoundArray = [];
    // guessArray = [];
    // count = 1;
    // strictLight.classList.remove("strict-light-on");
    // strictMode = false;
  }
}

function strictModeButton() {
  if (!strictMode) {
    strictLight.className += " strict-light-on";
    strictMode = true;
  } else {
    strictLight.classList.remove("strict-light-on");
    strictMode = false;
  }
}

function startGame() {
  gameOn(gameArray, count);  
  counter.innerText = count < 10 ? "0" + (count) : count;
}

// function createGameArray(number) {
//   const gameArray = []
//   for (let i = 1; i <= number; i++) {
//     let arr = [];
//     for (let j = 0; j < i; j++) {
//       let randomNum = Math.floor(Math.random() * 4);
//       arr.push(randomNum);
//     }
//     gameArray.push(arr);
//   }
//   return gameArray;
// }

function createGameArray(number) {
  const gameArray = []
  for (let i = 1; i <= number; i++) {
    let randomNum = Math.floor(Math.random() * 4);
    gameArray.push(randomNum);
  }
  return gameArray;
}

function gameOn(arr, count) {
  performRound(arr.slice(0, count), humanInput);
}

function performRound(arr) {
  let offset = 0;
  currentRoundArray = arr;
  arr.forEach(i => {
    let el = document.getElementById(i);
    setTimeout(() => {
      el.className += " pressed";
      eval("sound" + i).play();
      setTimeout(() =>{
        el.classList.remove("pressed");
      }, 500);
    }, 1000 + offset);
    offset += 1000;
  });
  addEventListenersToSquares();
}

function humanInput(id) {
  guessArray.push(id);
  console.log(guessArray);
  
  // if (checkGameWon()) {
  //   gameOver();
  //   return;
  // }
  if (compareArrays()) {
    count++;
    console.log(count);
    guessArray = [];
    if (checkGameWon()) {
      gameOver();
      return;
    }
    startGame();
  }
}

function compareArrays() {
  if (guessArray.length === currentRoundArray.length) {
    if (guessArray.toString() == currentRoundArray.toString()) {
      console.log("same");
      return true;
    } else {
      console.log("not the same");
      incorrectGuess();
      return false;
    }
  } else {
    return false;
  }
}

function incorrectGuess() {
  counter.innerText = "!!";
  setTimeout(() => {
    counter.innerText = count < 10 ? "0" + (count) : count;
  }, 1000);
  guessArray = [];
  if (strictMode) {
    count = 1;
    gameArray = createGameArray(20);
    counter.innerText = "!!";
    setTimeout(() => {
      counter.innerText = count < 10 ? "0" + (count) : count;
      startGame();
    }, 1000);
  } else {
    performRound(gameArray.slice(0, count));
  }
}

function checkGameWon() {
  if (count === gameArray.length + 1) {
    console.log("YOU WON");
    return true;
  } else {
    return false;
  }
}

function gameOver() {
  counter.innerText = ":)";
  document.getElementById("0").className += " winner";
  document.getElementById("1").className += " winner";
  document.getElementById("2").className += " winner";
  document.getElementById("3").className += " winner";
  setTimeout(() => {
    document.getElementById("0").classList.remove("winner");
    document.getElementById("1").classList.remove("winner");
    document.getElementById("2").classList.remove("winner");
    document.getElementById("3").classList.remove("winner");
    resetGame();
  }, 4000);
}

function resetGame() {
  counter.innerText = count < 10 ? "0" + (count) : count;
  counter.style.color = "rgba(87, 3, 3, 0.66)";
  startButton.removeEventListener("click", startGame, false);
  counter.innerText = "--";
  gameArray = createGameArray(20);
  currentRoundArray = [];
  guessArray = [];
  count = 1;
  strictLight.classList.remove("strict-light-on");
  strictMode = false;
  powerSwitch.checked = false;
  removeEventListeners();
}


// animation related events and functions
function addEventListenersToSquares() {
  squares.forEach(el => {
    el.addEventListener("mousedown", clickSquare, false);
  });
}

function removeEventListeners() {
  squares.forEach(el => {
    el.removeEventListener("mousedown", clickSquare, false);
  });
}


function clickSquare(e) {
  const el = document.getElementById(e.target.id);
  el.className += " pressed";
  eval("sound" + el.id).play();
  setTimeout(() => {
    el.classList.remove("pressed");
  }, 200);
  humanInput(el.id)
}