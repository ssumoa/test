let B, L, R, La, Lb, Lc, Ld, Le, Lf, M;
let mic;
let mode = 0;
let micLevel =0;
let audioContext;
let micStarted = false;

function preload() {
  B = loadImage('img/mount-B.png');
  L = loadImage('img/mount-L.png');
  R = loadImage('img/mount-R.png');
  La = loadImage('img/lar-1.png');
  Lb = loadImage('img/lar-2.png');
  Lc = loadImage('img/lar-3.png');
  Ld = loadImage('img/lar-4.png');
  Le = loadImage('img/lar-5.png');
  Lf = loadImage('img/lar-6.png');
  M = loadImage('img/moon.png');
}

function startMic() {
  if (!micStarted) {
    getAudioContext().resume();
    mic.start();
  } else {
    mic.stop();
  }

  micStarted = !micStarted;
}


function setup() {
  createCanvas(375, 812);
  mic = new p5.AudioIn();
  //mic.start();
//  getAudioContext().resume();

  angleMode(DEGREES);
  imageMode(CENTER);
  startMicButton = createButton("Start Mic").position(20, 10).mousePressed(startMic);

  audioContext = getAudioContext();
}


function draw(){

  micLevel = mic.getLevel();
  //mountain();

  if (frameCount % 180 == 0){
      mode++;
  }
  if (mode == 0){
      mountain();
  }
  else if (mode == 1){
      larva();
  }
  else {
      moon();
  if(frameCount % 540 == 0) 
      mode=0;
  }

  text(mouseX +' ' + mouseY, mouseX, mouseY);

  console.log(micLevel);
}



function mountain(){
  background('#C9E5FF');

  let value = map(micLevel, 0,1,0,100);
  text(value,50,100);
  push();
    image(B, 190, 400-value*6-100);
  pop();
  //image(L, 170, 600-value*4-80);
  
  push();
    imageMode(CORNER);
    translate(120,410);
    rotate(value*2);
    image(L, 0, 0-value*4);
  pop();
  push();
    rotate(0);
    image(R, 270, 570+value-80);
  pop();
}




function larva(){
  background('#76D4E0');
 
  let value = micLevel*30;
  text(value,50,100);
  
  push();
    image(La, 190+value*20, 170);
    image(Lb, 190-value*20, 300);
    image(Lc, 190+value*20, 410);
    image(Ld, 190-value*20, 500);
    image(Le, 190+value*20, 595);
    image(Lf, 190-value*20, 680);
  pop();
}




function moon(){
  background('#373640');
  let value = micLevel*30;
  text(value,50,100);
  
  push();
    let angle = frameCount * 0.1;
    rotate(angle);
    tint(255, 100+value*50);
    image(M, 190, 400);
  pop();
  push();
    let angle2 = frameCount* 0.1;
    rotate(angle2);
    tint(255, 100+value*50);
    image(M, 500, 50);
  pop();
}