
var level = location.href.split("lvl")[1];
console.log(level);
var stage = 1; //store stage value
var score = 000; //store  score value
var randomPuzzle; //change puzzles
var count; //store countdown time

class MathGame{

  constructor (image, answer){
    this.image = image;
    this.answer = answer;
  }

  //Setup the puzzle image
  showImage(){
    
    document.getElementById("gameimg").src = `../Images/Puzzles/${this.image}`;

  }

  //Get the Score on userinput
  calculateScore (btnId){ 

    //get the value of clicked button
    var btnValue = document.getElementById(btnId).innerHTML; 
    //Add score if the answer is correct
    if(btnValue == this.answer){
      score = score + 100;
      showPopupImage('../Images/Tup.png', '../Media/correct.mp3');  
    }
    else{  
      showPopupImage('../Images/Tdown.png', '../Media/wrong.mp3');
    } 

  }

  //Show the puzzle stage
  changeStage(){

    stage++;
    // navigate to score page with score parameter
    if (stage > 10){
      window.location.href = 'Score.html?score'+ score;
    }
    if (stage <= 10) {
      //show the current stage in page
      document.getElementById("stageId").innerHTML = (`Stage ${stage} - 10`);
      //show the current score in page
      document.getElementById("scoreId").innerHTML = (score);
    }

  }

  // changePuzzle(btnId){

  //   this.showImage();
  //   this.calculateScore(btnId);
  //   this.changeStage();

  // }


}

class Puzzle extends MathGame {

  constructor(image, answer){
    super(image, answer);
  }

  changePuzzle(btnId){
    
    this.showImage();
    this.calculateScore(btnId);
    this.changeStage();
    getRandomPuzzle();
    clearInterval(count);  
    setCountDown();
     
  }
}

//Global Functions
function getRandomPuzzle(){

  //get random index from puzzleArray
  randomIndex = Math.floor(Math.random() * splitPuzzleArray.length);
  //get value of the index
  randomPuzzle = splitPuzzleArray[randomIndex];
  //remove the object from Array to avoid puzzle repitition
  splitPuzzleArray.splice(randomIndex, 1);

  //set puzzle image according to object
  randomPuzzle.showImage();

  //set random numbers to the answer buttons
  for(var i = 1; i < 5; i++){
    //implement values between 1 - 60 range
    var ranNums = [];
    for(var num = 2; num <= 60; num ++){
      ranNums.push(num);
    }
    //get random index from ranNums
    ranIndex = Math.floor(Math.random() * ranNums.length);
    //get value of the index
    randomValue = ranNums[ranIndex];
    //bind value to buttons
    document.getElementById(`b${i}`).innerHTML = randomValue;
    //remove the object from Array to avoid button value repitition
    ranNums.splice(ranIndex, 1);
  }
  //get random button id and replace it's value with correct answer
  let randomBtnId = document.getElementById(`b${Math.floor(Math.random() * 4 + 1)}`);
  randomBtnId.innerHTML = randomPuzzle.answer;  
}

function setCountDown(){
  //set countdown time
  let time = 60;
  //countdown function
  count = setInterval(function(){
    if(time <= 0){

      //call popupImage when countdown is 0 
      showPopupImage('../Images/Timeup.png', '../Media/timesUp.mp3');
      //reset time
      time = 60;
      //change the stage and puzzle
      randomPuzzle.changeStage();
      getRandomPuzzle();   
    }
    //show countdown in page
    document.getElementById("timer").innerHTML = time;
    time--;
  
  }, 1000);
}

//WEB Animation API
function showPopupImage(popupImg, soundEffect){
  // Get the modal
  var modal = document.getElementById("myModal");
  // Get the image and insert it inside the modal
  var modalImg = document.getElementById("popupImg");

  modal.style.display = "block";
  modalImg.src = popupImg;
  //set zooming effect
  const scaleKeyframes = [
    {transform: 'scale(.2)'},
    {transform: 'scale(1.2)'}
  ]
  const scaleTiming = {
    duration: 1600,
    iterations: 2,
    direction: 'alternate',
    easing: 'ease-in-out'
  }
  //set rotating effect
  const rotateKeyframes = [
    {transform: 'rotate(0deg)'},
    {transform: 'rotate(7200deg)'}
  ]
  const rotateTiming = {
    duration: 750,
    iterations: 2,
    direction: 'alternate',
    easing: 'ease-in'
  }
  //bind animation effect to popupImage and show both effects same time
  modalImg.animate(scaleKeyframes, scaleTiming);
  modalImg.animate(rotateKeyframes, rotateTiming);
  modalImg.animate(scaleKeyframes, Object.assign({composite: 'add'}, scaleTiming));

  var sound = new Audio(soundEffect);
  sound.play();

  setTimeout(function(){modal.style.display = "none";}, 3000); 
}

function useFullScreenAPI(){
  //get supporting fullscreen to all browsers
  function getFullScreenElement(){
    return document.fullscreenElement
      || document.webkitFullscreenElement
      || document.mozFullscreenElement
      || document.msFullscreenElement;
  }
  //use fullscreen on doublieclick
  document.addEventListener("dblclick", () => {
    toggleFullScreen();
  });

  function toggleFullScreen(){
    if(getFullScreenElement()){
      document.exitFullscreen();
      document.getElementById("Game").style.backgroundImage = 'url()';
    }else{
      document.getElementById("Game").requestFullscreen().catch(console.log);
      document.getElementById("Game").style.backgroundImage = 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(../Images/GameBG.jpg)';
      document.getElementById("Game").style.backgroundSize = "cover";
    }
  }

}


let puzzle1 = new Puzzle("p1.jpg", 23);
let puzzle2 = new Puzzle("p2.jpg", 23);
let puzzle3 = new Puzzle("p3.jpg", 50);
let puzzle4 = new Puzzle("p4.jpg", 35);
let puzzle5 = new Puzzle("p5.jpg", 63);
let puzzle6 = new Puzzle("p6.jpg", 1);
let puzzle7 = new Puzzle("p7.jpg", 40);
let puzzle8 = new Puzzle("p8.jpg", 34);
let puzzle9 = new Puzzle("p9.jpg", 26);
let puzzle10 = new Puzzle("p10.jpg", 15);
let puzzle11 = new Puzzle("p11.jpg", 16);
let puzzle12 = new Puzzle("p12.jpg", 19);
let puzzle13 = new Puzzle("p13.jpg", 18);
let puzzle14 = new Puzzle("p14.jpg", 40);
let puzzle15 = new Puzzle("p15.jpg", 27);
let puzzle16 = new Puzzle("p16.jpg", 7);
let puzzle17 = new Puzzle("p17.jpg", 27);
let puzzle18 = new Puzzle("p18.jpg", 34);
let puzzle19 = new Puzzle("p19.jpg", 5);
let puzzle20 = new Puzzle("p20.jpg", 17);
let puzzle21 = new Puzzle("p21.jpg", 18);
let puzzle22 = new Puzzle("p22.jpg", 72);
let puzzle23 = new Puzzle("p23.jpg", 36);
let puzzle24 = new Puzzle("p24.jpg", 32);
let puzzle25 = new Puzzle("p25.jpg", 40);
let puzzle26 = new Puzzle("p26.jpg", 16);
let puzzle27 = new Puzzle("p27.jpg", 18);
let puzzle28 = new Puzzle("p28.jpg", 32);
let puzzle29 = new Puzzle("p29.jpg", 4);
let puzzle30 = new Puzzle("p30.jpg", 40);
let puzzle31 = new Puzzle("p31.jpg", 14);
let puzzle32 = new Puzzle("p32.jpg", 24);
let puzzle33 = new Puzzle("p33.jpg", 20);
let puzzle34 = new Puzzle("p34.jpg", 20);
let puzzle35 = new Puzzle("p35.jpg", 36);
let puzzle36 = new Puzzle("p36.jpg", 14);
let puzzle37 = new Puzzle("p37.jpg", 36);
let puzzle38 = new Puzzle("p38.jpg", 91);
let puzzle39 = new Puzzle("p39.jpg", 26);
let puzzle40 = new Puzzle("p40.jpg", 19);
let puzzle41 = new Puzzle("p41.jpg", 18);
let puzzle42 = new Puzzle("p42.jpg", 33);
let puzzle43 = new Puzzle("p43.jpg", 17);
let puzzle44 = new Puzzle("p44.jpg", 38);
let puzzle45 = new Puzzle("p45.jpg", 41);
let puzzle46 = new Puzzle("p46.jpg", 14);
let puzzle47 = new Puzzle("p47.jpg", 14);
let puzzle48 = new Puzzle("p48.jpg", 3);
let puzzle49 = new Puzzle("p49.jpg", 21);
let puzzle50 = new Puzzle("p50.jpg", 93);


var puzzleArray = [ puzzle1, puzzle2, puzzle3, puzzle4, puzzle5, puzzle6, puzzle7, puzzle8, puzzle9, puzzle10,
                    puzzle11, puzzle12, puzzle13, puzzle14, puzzle15, puzzle16, puzzle17, puzzle18, puzzle19, puzzle20,
                    puzzle21, puzzle22, puzzle23, puzzle24, puzzle25, puzzle26, puzzle27, puzzle28, puzzle29, puzzle30,
                    puzzle31, puzzle32, puzzle33, puzzle34, puzzle35, puzzle36, puzzle37, puzzle38, puzzle39, puzzle40,
                    puzzle41, puzzle42, puzzle43, puzzle44, puzzle45, puzzle46, puzzle47, puzzle48, puzzle49, puzzle50 ];

//Split Array according to difficulty
if(level == 'Easy'){
  var splitPuzzleArray = puzzleArray.splice(0, 20);
  console.log(splitPuzzleArray);
}else if (level == 'Medium'){
  var splitPuzzleArray = puzzleArray.splice(20, 15);
  console.log(splitPuzzleArray);
}else {
  var splitPuzzleArray = puzzleArray.splice(35, 15);
  console.log(splitPuzzleArray);
}
  
document.getElementById("b1").onclick = function(){randomPuzzle.changePuzzle("b1")};
document.getElementById("b2").onclick = function(){randomPuzzle.changePuzzle("b2")};
document.getElementById("b3").onclick = function(){randomPuzzle.changePuzzle("b3")};
document.getElementById("b4").onclick = function(){randomPuzzle.changePuzzle("b4")};
getRandomPuzzle();
setCountDown();
useFullScreenAPI();





