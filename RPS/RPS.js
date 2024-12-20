let score = JSON.parse(localStorage.getItem('score')) ||
{
  win : 0,
  lose : 0,
  tie : 0
};

let computerAction;

function updateScore() {
  document.querySelector('.js-score-paragraph')
    .innerHTML = `Win: ${score.win} \nLost: ${score.lose} \nTie: ${score.tie} `;
}

function changePic(yourMove, computerMove) {
  if (yourMove === 'rock') document.querySelector('.outcome-img').src
}

function pickCompMove() {
  const compMove = Math.random();
  if (compMove <= 0.33) return 'rock';
  if (compMove <= 0.66) return 'paper';
  return 'scissors';
}
function pickPlayerMove() {
  const compMove = Math.random();
  if (compMove <= 0.33) return 'rock';
  if (compMove <= 0.66) return 'paper';
  return 'scissors';
}


function playGame(playerMove) {
  const compMove = pickCompMove();
  if (playerMove === 'rock') {
    if (compMove === 'scissors') {
      document.querySelector('.js-outcome-paragraph')
        .innerHTML = 'You win';
      ++score.win;
    }
    else if (compMove === 'rock') {
      document.querySelector('.js-outcome-paragraph')
        .innerHTML =`It's a tie`;
      ++score.tie;
    }
    else {
      document.querySelector('.js-outcome-paragraph')
        .innerHTML ='You lose';
      ++score.lose;
    }
  }
  else if (playerMove === 'paper') {
    if (compMove === 'rock') {
      document.querySelector('.js-outcome-paragraph')
        .innerHTML = 'You win';
      ++score.win;
    }
    else if (compMove === 'paper') {
      document.querySelector('.js-outcome-paragraph')
        .innerHTML =`It's a tie`;
      ++score.tie;
    }
    else {
      document.querySelector('.js-outcome-paragraph')
        .innerHTML ='You lose';
      ++score.lose;
    }
  }
  else {
    if (compMove === 'paper') {
      document.querySelector('.js-outcome-paragraph')
        .innerHTML = 'You win';
      ++score.win;
    }
    else if (compMove === 'scissors') {
      document.querySelector('.js-outcome-paragraph')
        .innerHTML =`It's a tie`;
      ++score.tie;
    }
    else {
      document.querySelector('.js-outcome-paragraph')
        .innerHTML ='You lose';
      ++score.lose;
    }
  }
  document.querySelector('.js-move-paragraph').innerHTML = 
    `you : <img src='pictureRPS/${playerMove}-emoji.png' class='outcome-img'> <img src='pictureRPS/${compMove}-emoji.png' class='outcome-img'>: computer`;
  updateScore();
  localStorage.setItem('score', JSON.stringify(score));
}


let autoplayEnabled = false;
let intervalID;
function autoPlay() {
  if (!autoplayEnabled) {
    intervalID = setInterval(() => {
      playGame(pickPlayerMove());
    },1000);
    autoplayEnabled = true;
    document.querySelector('.js-autoplay-button').classList.add('css-autoplayEnabled-button');
    document.querySelector('.js-autoplay-button').innerHTML = 'Stop';
  }
  else {
    clearInterval(intervalID);
    autoplayEnabled = false;
    document.querySelector('.js-autoplay-button').classList.remove('css-autoplayEnabled-button');
    document.querySelector('.js-autoplay-button').innerHTML = 'Auto Play';
  }
}


function resetGame() {
  score.win = 0;
  score.lose = 0;
  score.tie = 0;
  localStorage.removeItem('score');
  updateScore()
  alert('Game has been reset; feeling unlucky eyy?');
}

function askConfirmReset() {
  document.querySelector('.js-reset-confirm-div').innerHTML = `
    <button class="js-reset-yes-button css-reset-yes-button">Yes</button>
    <button class="js-reset-no-button css-reset-no-button">No</button>
  `

  document.querySelector('.js-reset-yes-button').addEventListener('click', () => {
    resetGame();
    document.querySelector('.js-reset-confirm-div').innerHTML = '';
  })
  document.querySelector('.js-reset-no-button').addEventListener('click', () => {
    document.querySelector('.js-reset-confirm-div').innerHTML = '';
  })
}



const moveRockButton = document.querySelector('.js-move-rock-button');
const movePaperButton = document.querySelector('.js-move-paper-button');
const moveScissorsButton = document.querySelector('.js-move-scissors-button'); 
const autoplayButton = document.querySelector('.js-autoplay-button');
const resetButton = document.querySelector('.js-reset-button');

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  }
  else if (event.key === 'p') {
    playGame('paper');
  }
  else if (event.key === 's') {
    playGame('scissors');
  }
  else if (event.key === 'a') {
    autoPlay();
  }
  else if (event.key === ' ') {
    askConfirmReset();
  }
});

/*
these are wrong, don't do
moveRockButton.addEventListener('click', playGame('rock'));
movePaperButton.addEventListener('click', playGame('paper'));
moveScissorsButton.addEventListener('click', playGame('scissors'));
*/

moveRockButton.addEventListener('click', () => {
  playGame('rock');
});
movePaperButton.addEventListener('click', () => {
  playGame('paper');
});
moveScissorsButton.addEventListener('click', () => {
  playGame('scissors');
});
autoplayButton.addEventListener('click', () => {
  autoPlay();
});
resetButton.addEventListener('click', () => {
  askConfirmReset();
});

updateScore();
localStorage.setItem('score', JSON.stringify(score));
