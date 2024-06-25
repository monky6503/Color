let gridSize = 2;
let score = 0;
let timeleft = 60;
let isPaused = false;
let opacity = 0.6;
const maxGridSize = 10;
const Interval = 1000;

const gridElement = document.querySelector(".grid-box");
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time-left");
const startButton = document.querySelector(".start-btn");
const pauseButton = document.querySelector(".pause-btn");


//隨機選擇顏色
function getRandomColor(){
  const letters = "0123456789ABCDEF";
  let color = "#";
  for(let i=0;i<6;i++){
    color += letters[Math.floor(Math.random()*16)];
  }
  return color
}

//建立nxn矩陣
function createGrid(size){
  gridElement.innerHTML = "";
  gridElement.style.gridTemplateColumns = `repeat(${size},1fr)`;
  gridElement.style.gridTemplateRows = `repeat(${size},1fr)`;
  for(let i = 0;i<size*size;i++){
    const cell = document.createElement("span");
    cell.className = "cell";
    gridElement.appendChild(cell);
  }
}

//重置矩陣
function resetGrid(){
  const cells = document.querySelectorAll(".cell")
  cells.forEach(cell =>{
    cell.remove();
  })
}

//分配顏色
function distributeColor(){
  const color = getRandomColor();
  const cells = document.querySelectorAll(".cell")
  const unique = Math.floor(Math.random() * cells.length);

  cells.forEach((cell,index)=>{
    cell.style.backgroundColor = color;
    if(index === unique){
      cell.classList.add("neighbor");
      cell.style.opacity = `${opacity}` ;
      if(opacity <0.9){
        opacity+=0.025;
      }
    }
  });
}

//檢查顏色
function checkColor(event) {
  if (event.target.classList.contains("neighbor")) {
    score++;
      if (gridSize < maxGridSize) {
        gridSize++;
      } 
      // resetGrid(); //每次換矩陣前先清除
      createGrid(gridSize);
      distributeColor();
      attachClickListeners();
  } else{
    score--;
    if(score <= 0)score = 0;
  }
  scoreElement.textContent = score;
}

//建立對每個cells進行事件監聽的函數
function attachClickListeners() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach(cell => {
      cell.addEventListener("click", checkColor);
  });
}


//倒數計時
function startTime(){
  const timeInterval = setInterval(() =>{
      if(!isPaused){
        timeleft--;
        timeElement.textContent = `${timeleft}`;
        if(timeleft <=0){
          clearInterval(timeInterval);
          gameOver();
          resetGrid();
        }
      }
    },Interval);
}


//遊戲開始
function start(){
  gridElement.style.display = "grid";
  document.querySelector(".start").style.display = "none";
  document.querySelector(".pause").style.display = "block";
  startTime();
}

//遊戲結束
function gameOver(){
  gridElement.style.display = "none";
  document.querySelector(".game-over").style.display = "block";
  document.querySelector(".pause").style.display = "none";
}



startButton.addEventListener("click",start)
pauseButton.addEventListener("click",()=>{
  isPaused = !isPaused ;
  gridElement.style.filter = isPaused?"blur(50px)":"blur(0px)";
})

//創建表格
createGrid(gridSize);
//先分配顏色給2x2矩陣
distributeColor();
//執行函數
attachClickListeners();


