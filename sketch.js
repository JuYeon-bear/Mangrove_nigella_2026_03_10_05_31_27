let mapImg;
let px, py;
let pd = 20;

let wallR = 20;
let wallG = 140;
let wallB = 175;

function preload(){
  mapImg = loadImage('Map.png');
}

function setup() {
  //크기가 커서 줄임
  createCanvas(1408, 768);
  mapImg.resize(1408, 768);
  px = 704;
  py = 384;
}

function draw() {
  //맵 그리기
  image(mapimg, 0, 0);

  //팩맨 움직임
  if (keyIsDown(LEFT_ARROW)) px -= 3;
  if (keyIsDown(RIGHT_ARROW)) px += 3;
  if (keyIsDown(UP_ARROW)) py -= 3;
  if (keyIsDown(DOWN_ARROW)) py += 3;

  if (px <= 5){
    px = 1395;
  } else if (px >= 1400){
    px = 10;
  }

  fill(255, 255, 0);
  ellipse(px, py, pd);




}

function mousePressed(){
  let c = get(mouseX, mouseY);

  let r = red(c);
  let g = green(c);
  let b = blue(c);

  console.log("("+mouseX+", "+mouseY+"), ("+r+", "+g+", "+b+")");
}
