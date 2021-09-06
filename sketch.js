var bird, birdImg;
var background, backgroundImg;
var background2,background2Img;
var pipe1,pipe1Img;
var pipe2,pipe2Img;
var pipe1Group, pipe2Group;
var score;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var restart, restartImg;
var text1;

function preload(){
birdImg=loadImage("bird1.png");
backgroundImg =loadImage("background.png");
background2Img=loadImage("background2.png");
pipe1Img=loadImage("pipe1.png");
pipe2Img=loadImage("pipe2.png");
restartImg=loadImage("resetbutton.png");
}

function setup() {
  createCanvas(290,550);


background = createSprite(150,250,10,10);
background.addImage(backgroundImg);

background2=createSprite(150,500,300,110);
background2.addImage(background2Img);

bird = createSprite(20,300,10,10)
bird.addImage(birdImg);


pipe1Group = new Group();
pipe2Group = new Group();


score = 0;


restart = createSprite(150,245,10,10);
restart.addImage(restartImg);
restart.visible=false;
restart.scale = 0.2;
}

function draw() {
  
  if(gameState === PLAY){

pipeRandomPosition();


if (keyDown("space")){
  bird.y = bird.y - 20;
  }
  else{
  bird.velocityY = 5;
  }
 

  background2.velocityX = -1;


if(background2.x < 150){
  background2.x = background2.width/2;
  }


  if (bird.isTouching(pipe1Group) || bird.isTouching(pipe2Group)){
    gameState = END;
  }
  if(bird.isTouching(background2)){
    gameState = END;
  }
  
if(frameCount % 75 === 0){
score++;
}
}
else if(gameState === END)  {
background2.velocityX = 0;
bird.visible = false;
bird.x=25;
bird.y=260;
pipe1Group.setVelocityXEach(0);
pipe2Group.setVelocityXEach(0);
pipe1Group.setLifetimeEach(-1);
pipe2Group.setLifetimeEach(-1);
restart.visible=true;
}
  
if(mousePressedOver(restart)){
  reset();
}

drawSprites();

textSize(20);
textFont("Courier New");
text("Score:" + score,170,50);
}

function pipeRandomPosition(){
if (frameCount % 75 === 0 ){
  pipe1 = createSprite(150,0,10,100);
  pipe1.addImage(pipe1Img);
  pipe1.y = random(0,20);
  pipe1.velocityX = -2;
  pipe1Group.add(pipe1);
  pipe1Group.setLifetimeEach(150);
 
  pipe2 = createSprite(150,520,10,100);
  pipe2.addImage(pipe2Img);
  pipe2.y = random(450,500);
  pipe2.velocityX = -2;
  pipe2Group.add(pipe2);
  pipe2Group.setLifetimeEach(150);

}

}

function reset(){
  gameState = PLAY;
  pipe1Group.destroyEach();
  pipe2Group.destroyEach();
  score = 0;
  bird.visible=true;
  restart.visible=false
}
