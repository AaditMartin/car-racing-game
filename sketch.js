var canvas, backgroundImage;

var gameState = 0;

var playerCount;

var allPlayers;

var distance = 0;

var database;

var form, player, game;

var cars, car1, car2, car3, car4;

var track, car1_img, car2_img, car3_img, car4_img;

var passedFinish;

var obstaclegrp;

var xVelocity,yVeolcity;

var i;

var bronzeimg,silverimg,goldimg;

var obstacleimg;

var finishedPlayers;

var obstacle;

function preload(){

  track = loadImage("../images/track.jpg");

  car1_img = loadImage("../images/car1.png");

  car2_img = loadImage("../images/car2.png");

  car3_img = loadImage("../images/car3.png");

  car4_img = loadImage("../images/car4.png");

  ground = loadImage("../images/ground.png");

  bronzeimg = loadImage("../images/3rdmedal.png");

  silverimg = loadImage("../images/2ndmedal.png");

  goldimg = loadImage("../images/1stmedal.png");

  obstacleimg = loadImage("../images/obstacle.png");

}

function setup(){

  canvas = createCanvas(displayWidth,displayHeight);

  database = firebase.database();

  gameState = 0;

  distance = 0;

  finisedPlayers = 0;

  xVelocity = 0;

  yVelocity = 0;

  xSet = false;

  obstaclegrp = createGroup();

  game = new Game();

  game.getState();

  game.start();

  for(i=0;i<5;i++){

    w = random(200,950);

    h = random(-height*4,height-300);
    
    obstacle = createSprite(w,h);
     
    obstacle.addImage("obstacle" ,obstacleimg);

    obstaclegrp.add(obstacle);

  }

}

function draw(){

  background(0);

  if(playerCount === 4 && finishedPlayers === 0){

    game.update(1);

  }

  if(gameState === 1){
    
    game.play();
    
  }

  if(finishedPlayers === 4){

    game.update(2);

  }

  if(gameState === 2 && finishedPlayers === 4){

    game.displayRanks();

  }

}

function keyPressed(){

  if(keyCode === 13 && gameState !== 1 && passedFinish === false){

    form.enter();

    passedFinish = true;

  }

}
