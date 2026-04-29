let mapImg;
let px, py;
let pd = 20;

let wallR = 20;
let wallG = 140;
let wallB = 175;

let dx = [207, 660, 745, 1195, 510, 900, 510, 900, 235, 704, 1165, 106, 330, 1080, 1280];
let dy = [60, 60, 60, 60, 310, 310, 455, 455, 700, 700, 700, 380, 380, 380, 380];
let dSize = 15;
let dActive = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true];

let stage = 1;
let score;
let life = 3;

let enemies = [];
let enemiesCount = 5;

function preload(){
  mapImg = loadImage('Map.png');
}

function setup() {
  //크기가 커서 줄임
  createCanvas(1408, 768);
  mapImg.resize(1408, 768);
  px = 704;
  py = 455;

  //적 배치 위치 찾기
  enemyXY(enemiesCount);
}

function draw() {
  // if (life <= 0){
  //   fill(255, 0, 0);
  //   textSize(100);
  //   textAlign(CENTER, CENTER);
  //   text("YOU LOSE", 704, 384);
  //   noLoop();
  //   return;
  // } else if(score == dActive.length * stage) {
  //   stage += 1;
  //   fill(255, 0, 0);
  //   textSize(100);
  //   textAlign(CENTER, CENTER);
  //   text("YOU WIN", 704, 384);
  // }

  //맵 그리기
  image(mapImg, 0, 0);
  fill(255, 255, 255);
  textSize(20);
  totalScore();
  text("SCORE: "+score, 20, 40);
  text("LIFE: "+life, 20, 80);
  text("STAGE: "+stage, 20, 120);

  //팩맨 움직임
  if (keyIsDown(LEFT_ARROW)&&isWall(px - 3, py)) px -= 3;
  if (keyIsDown(RIGHT_ARROW)&&isWall(px + 3, py)) px += 3;
  if (keyIsDown(UP_ARROW)&&isWall(px, py - 3)) py -= 3;
  if (keyIsDown(DOWN_ARROW)&&isWall(px, py + 3)) py += 3;

  //반대쪽 통로로 나오기
  if (px <= 5){
    px = 1395;
  } else if (px >= 1400){
    px = 10;
  }

  //팩맨 그리기
  fill(255, 255, 0);
  noStroke();
  ellipse(px, py, pd);

  //콩 그리기
  for (let i = 0; i < dActive.length; i++){
    if (dActive[i] === true){
      fill(255, 100, 100);
      ellipse(dx[i], dy[i], dSize);
    }

    let distance = dist(px, py, dx[i], dy[i]);

    if (distance < (pd/2) + (dSize / 2)){
      dActive[i] = false;
    }
  }

  //적 그리기
  if (score%50 === 0 && enemies.length < enemiesCount) {
    enemyXY(2);
    enemiesCount += 2;
  }

  for (let i = 0; i < enemies.length; i++){
    let enemy = enemies[i];

    fill(255, 0, 0);
    noStroke();
    ellipse(enemy.x, enemy.y, pd);

    let distanceEnemy = dist(px, py, enemy.x, enemy.y);

    if (distanceEnemy < pd){
      life -= 1;
      //연속 충돌 방지 리스폰
      px = 704;
      py = 455;
    }
  }


}

function totalScore(){
  score = 0;
  for (let i = 0; i < dActive.length; i++){
    if (dActive[i] === false){
      score += 10;
    }
  }

  return score;
}

function isWall(nextX, nextY){
  let r = pd / 2;

  let corners = [
    mapImg.get(nextX - r, nextY),
    mapImg.get(nextX + r, nextY),
    mapImg.get(nextX, nextY - r),
    mapImg.get(nextX, nextY + r),
  ];

  for (let i = 0; i <corners.length; i++){
    let c = corners[i];

    if (abs(c[0] - wallR) <= 15 &&
        abs(c[1] - wallG) <= 15 &&
        abs(c[2] - wallB) <= 15){
      return false;
    }

    if (abs(c[0] - 10) <= 15 &&
        abs(c[1] - 10) <= 15 &&
        abs(c[2] - 10) <= 15){
      return false;
    }
  }

  return true;
}

function enemyXY(count){
  for (let i = 0; i < count; i++){
    let spawnFound = false;
    let spawnX, spawnY;

    while (!spawnFound){
      let randomIndex = floor(random(dActive.length));
      let targetX = dx[randomIndex];
      let targetY = dy[randomIndex];

      let possibleSpots = [
        {x: targetX + 50, y: targetY},
        {x: targetX - 50, y: targetY},
        {x: targetX, y: targetY + 50},
        {x: targetX, y: targetY - 50}
      ]

      let validSpots = [];

      for (let j = 0; j < possibleSpots.length; j++){
        let spot = possibleSpots[j];
        if (isWall(spot.x, spot.y)){
          validSpots.push(spot);
        }
      }

      if (validSpots.length > 0){
        let finalSpot = random(validSpots);
        spawnX = finalSpot.x;
        spawnY = finalSpot.y;
        spawnFound = true;
      }
    }

    enemies.push({x: spawnX, y: spawnY})
  }
}

function mousePressed(){
  let c = get(mouseX, mouseY);

  let r = red(c);
  let g = green(c);
  let b = blue(c);

  console.log("("+mouseX+", "+mouseY+"), ("+r+", "+g+", "+b+")");
}
