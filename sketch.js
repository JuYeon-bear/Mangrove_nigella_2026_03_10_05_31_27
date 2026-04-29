function preload(){
  map = loadImage('Map.png');
}

function setup() {
  createCanvas(2816, 1536);
  image(map, 0, 0);
}

function draw() {
  //중심점
  stroke(255, 0, 0);
  strokeWeight(1);
  line(0,768, 2816,768);
  line(1408,0, 1408,1536);
}
