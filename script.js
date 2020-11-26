
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

//Variables

let score;
let highscore;
let player;
let gravity;
let enemies =[];
let candies = [];
let gameSpeed;
let keys = {};

// Event Listeners
document.addEventListener('keydown', function (evt) {
  keys[evt.code] = true;
});
document.addEventListener('keyup', function (evt){
  keys[evt.code] = false;
});

class Player {
  constructor (x,y,w,h,c) {  // x postion, y position, width position, height position, color
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;

    //Jump Velocity
    this.dy = 0;
    this.jumpForce = 15;
    this.originalHeight = h;
    this.grounded = false;
    this.jumpTimer = 0;
  }

  Animate () {
    // Keysetting for jumping

    if (keys['ArrowUp']) {
      this.Jump();
    } else {
      this.jumpTimer = 0;
    }

    if (keys['ArrowDown']) {
      this.h =this.originalHeight/2;
    } else {
      this.h = this.originalHeight;
    }

    this.y += this.dy;

    //Gravity
    if (this.y + this.h < canvas.height) {
      this.dy += gravity;
      this.grounded = false;
    } else {
      this.dy = 0;
      this.grounded = true;
      this.y = canvas.height - this.h;
    }

    this.Draw();
  }

  Jump () {
    console.log(this.grounded, this.jumpTimer);
    if (this.grounded && this.jumpTimer == 0) {
      this.jumpTimer = 1;
      this.dy = -this.jumpForce;
    } else if (this.jumpTimer > 0 && this.jumpTimer < 15) {
      this.jumpTimer++;
      this.dy = -this.jumpForce - (this.jumpTimer/50);
    }

  }

  Draw () {
    ctx.beginPath();
    ctx.fillStyle = this.c;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.closePath();
  }
}

class Enemy {
  constructor (x,y,w,h,c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;

    this.dx = -gameSpeed;
  }
  Update () {
    this.x += this.dx;
    this.Draw();
    this.dx = -gameSpeed;
  }

  Draw () {
    ctx.beginPath();
    ctx.fillStyle = this.c;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.closePath();
  }
}

class Candies {
  constructor (x,y,w,h,c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;

    this.dx = -gameSpeed;
  }
  Update () {
    this.x += this.dx;
    this.Draw();
    this.dx = -gameSpeed;
  }

  Draw () {
    ctx.beginPath();
    ctx.fillStyle = this.c;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.closePath();

  }
}

//Run Logic Enemy and Candies:

function moveEnemy () {
  let size = randomPositioning (20,70);
  let type = randomPositioning (0,1);
  let enemy = new Enemy (canvas.width + size, canvas.height - size, size, size, '#2484E4');

  if (type == 1) {
    enemy.y -= player.originalHeight -10;
  }
  enemies.push(enemy);
}

function randomPositioning (min, max) {
  return Math.round(Math.random() * (max-min)+ min);
}

function moveCandy() {
  let size = randomPositioning (10,80);
  let type = randomPositioning (0,1);
  let candy = new Candy (canvas.width + size, canvas.height - size, size, size, 'pink');

  if (type == 1) {
    candy.y -= player.originalHeight -10;
  }
  candies.push(enemy);
}

function randomPositioning (min, max) {
  return Math.round(Math.random() * (max-min)+ min);
}


function Start () {

  gameSpeed = 3;
  gravity = 1;

  player = new Player(25, 400, 50, 50, '#FF5858');
  

  requestAnimationFrame(Update);
}

let initialMoveTimer = 200
let moveTimer = initialMoveTimer

function Update () {
  requestAnimationFrame(Update);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  moveTimer--;
  if (moveTimer <= 0) {
    moveEnemy ();
    console.log (enemies);
    moveTimer = initialMoveTimer - gameSpeed * 8;

    if (moveTimer <60) {
      moveTimer = 60;
    }
  }

  let initialMoveTimer = 200
let moveTimer = initialMoveTimer

function Update () {
  requestAnimationFrame(Update);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  moveTimer--;
  if (moveTimer <= 0) {
    moveCandy();
    console.log (candies);
    moveTimer = initialMoveTimer - gameSpeed * 8;

    if (moveTimer <60) {
      moveTimer = 60;
    }
  }


  //Release Enemies

  for (let i=0; i<enemies.length; i++) {
    let e = enemies [i];

    e.Update();
  }

  //Release Candies


  for (let i=0; i<candies.length; i++) {
    let ca = candies [i];

    ca.Update();
  }

  player.Animate();
}
Start();
