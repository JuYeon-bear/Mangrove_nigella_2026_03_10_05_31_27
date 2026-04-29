function preload(){
  map = loadImage('Map.png');
}

function setup() {
  //크기가 커서 줄임
  createCanvas(1408, 768);
  image(map, 0, 0, 1408, 768);
}

function draw() {
  //중심점
  stroke(255, 0, 0);
  strokeWeight(1);

  //맵



}

function mousePressed(){
  let c = get(mouseX, mouseY);

  let r = red(c);
  let g = green(c);
  let b = blue(c);

  console.log("("+mouseX+", "+mouseY+"), ("+r+", "+g+", "+b+")");
}
