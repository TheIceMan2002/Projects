const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "black";
const paddle1Color = "white";
const paddle2Color = "white";
const paddleBorder = "black";
const ballColor = "white";
const ballBorderColor = "black";
const ballRadius = 12.5;
const paddleSpeed = 50;
let intervalID;
let ballSpeed = 1;
let ballX = gameWidth / 2;
let ballY = gameHeight / 2;
let ballXDirection = 0;
let ballYDirection = 0;
let player1Score = 0;
let player2Score = 0;
let colorWell;
const defaultColor = "#0000ff";
let countdown=5




let paddle1 = {
  width: 25,
  height: 100,
  x: 0,
  y: gameHeight / 3,
};

let paddle2 = {
  width: 25,
  height: 100,
  x: gameWidth - 25,
  y: gameHeight / 3,
};



window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);


function gameStart() {
  createBall();
  nextTick();

  }

function nextTick() {
  intervalID = setTimeout(() => {
    clearBoard();
    drawPaddles();
    moveBall();
    drawBall(ballX, ballY);
    checkCollison();
    nextTick(); 
  }, 10);

}
function clearBoard() {
  ctx.fillStyle = boardBackground;
  ctx.fillRect(0, 0, gameWidth, gameHeight);
}
function drawPaddles() {
  ctx.strokeStyle = paddleBorder;

  ctx.fillStyle = paddle1Color;
  ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
  ctx.strokeRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);

  ctx.fillStyle = paddle2Color;
  ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
  ctx.strokeRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
}
function createBall() {
  ballSpeed = 1;
  if (Math.round(Math.random()) == 1) {
    ballXDirection = 1;
  } 
  else 
  {
    ballXDirection = -1;
  }
  if (Math.round(Math.random()) == 1) {
    ballYDirection = 1;
  } 
  else 
  {
    ballYDirection = -1;
  }
  ballX = gameWidth / 2;
  ballY = gameHeight / 2;
  drawBall(ballX, ballY);
}


function moveBall() {
  ballX += (ballSpeed * ballXDirection);
  ballY += (ballSpeed * ballYDirection);
};
function drawBall(ballX, ballY) {
  ctx.fillStyle = ballColor;
  ctx.strokeStyle = ballBorderColor;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();
}

function checkCollison() {

  if(ballY <=0 + ballRadius){
    ballYDirection *= -1; 
    
  }
  if(ballY >= gameHeight - ballRadius){
    ballYDirection *= -1;
    
  }
  if (ballX <= 0){
    player2Score += 1;
    updateScore();
    createBall();
  
  
    
    
    
    return; 
  }
  if (ballX >= gameWidth){
    player1Score += 1;
    updateScore();
    createBall();
    
    return; 
  }
  if(ballX <= (paddle1.x + paddle1.width + ballRadius)){
    if(ballY > paddle1.y && ballY < paddle1.y + paddle1.height){
      ballX = (paddle1.x + paddle1.width) + ballRadius; 
      ballXDirection *= -1;
      ballSpeed += 1; 
      
      
    }
  }
  if(ballX >= (paddle2.x - ballRadius)){
    if(ballY > paddle2.y && ballY < paddle2.y + paddle2.height){
      ballXDirection *= -1;
      ballSpeed += 1; 
    
      
    
    }
  }
}




function changeDirection(event) {
  const keyPressed = event.keyCode;
  const paddle1Up = 87;
  const paddle1Down = 83;
  const paddle2Up = 79;
  const paddle2Down = 76;

  switch (keyPressed) {
    case paddle1Up:
      if (paddle1.y > 0) {
        paddle1.y -= paddleSpeed;
      }
      break;

    case paddle1Down:
      if (paddle1.y < gameHeight - paddle1.height) {
        paddle1.y += paddleSpeed;
      }
      break;

    case paddle2Up:
      if (paddle2.y > 0) {
        paddle2.y -= paddleSpeed;
      }
      break;

    case paddle2Down:
      if (paddle2.y < gameHeight - paddle2.height) {
        paddle2.y += paddleSpeed;
      }
      break;
  }
}
function updateScore() {
  scoreText.textContent = `${player1Score} : ${player2Score}`;
}
function resetGame() {
  player1Score = 0; 
  player2Score = 0;
  paddle1 = {
    width: 25,
    height: 100,
    x: 0,
    y: gameHeight / 3,
  };
  
  paddle2 = {
    width: 25,
    height: 100,
    x: gameWidth - 25,
    y: gameHeight / 3,
  };
  ballSpeed = 1; 
  ballX = 0;
  ballY = 0; 
  ballXDirection = 0; 
  ballYDirection = 0; 
  updateScore();
  clearInterval(intervalID);
  gameStart();
};



function startGame() {
  let startDiv = document.getElementById("start");
  let gameCanvas = document.getElementById("canvas");
  let gameOver = document.getElementById("game-over");
  startDiv.style.display = "none";
  gameCanvas.style.display = "block";
  gameOver.style.display = "none";

  gameStart();
  load();

}
function gameOver() {
  let startDiv = document.getElementById("start");
  let gameCavnas = document.getElementById("canvas");
  let gameOver = document.getElementById("game-over");
  startDiv.style.display = "none";
  gameCavnas.style.display = "none";
  gameOver.style.display = "block"

  player1.reset();
  player2.reset();
  clearInterval(loop);
}



let time =0;
function count() {
  let countdown = setInterval(function () {
    if (time <= 0) {
      clearInterval(countdown);
      document.getElementById("bye").innerHTML = "Play Ball"
    }
    else if(time ==-2){
      document.getElementById("bye").style.display="none";
    }
    else {
      document.getElementById("bye").innerHTML = time
    }
    time -= 1; 
    console.log(time)
  }, 1000)


}





function start() {
  document.getElementById("first").style = "color: orange;"
  startTimer();
};
window.addEventListener("click", sound);
function sound() {
  let noise = document.getElementById("sound")
   noise.play() 
}

function load() {
  setTimeout(load,5000);
  let t= document.getElementById("gameBoard");
  t.style.display="block"
  
let y =document.getElementById("scoreText");
y.style.display="block"

let z=document.getElementById("resetBtn");
z.style.display="block"


}