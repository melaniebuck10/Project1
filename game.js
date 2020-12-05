const hitSound = new Audio('sounds/Jingle.wav');
const introSound = new Audio ('sounds/Intro.mp3');
introSound.volume = 0.2;
const gameOver = new Audio ('sounds/GameOver.wav');
const gameMusic = new Audio ('sounds/GameMusic.mp3');
gameMusic.volume = 0.2;

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.reset();
    this.setKeyBindings();
  }

  reset() {
    this.player = new Player(
      this,
      100,
      this.canvas.height / 1.5 - 50 / 5,
      150,
      73
    );
    this.lastEnemyTimestamp = 0;
    this.lastCandyTimestamp = 0;
    this.intervalBetweenEnemies = 3000;
    this.intervalBetweenCandies = 3000;
    this.enemyStartingSpeed = 1;
    this.candyStartingSpeed = 1;
    this.enemies = [];
    this.candies = [];
    this.score = 0;
    this.active = true;
    this.keys = [];
  }

  setKeyBindings() {
    window.addEventListener('keydown', (event) => {
      switch (event.code) {
        case 'ArrowUp':
          this.player.y -= 10;
          break;
        case 'ArrowDown':
          this.player.y += 10;
          break;
      }
    });
  }

/*audioPlayer () {
  const triggerMuteButtonElement = document.getElementById('mutebtn');
  triggerMuteButtonElement.addEventListener('click', mute);

  function mute () {
    if (gameMusic.muted) {
      gameMusic.muted = false;
      triggerMuteButtonElement.style.background = "url(images/PlayButton.png) no repeat";  
    } else {
      gameMusic.muted=true;
      triggerMuteButtonElement.style.background = "'url(images/MuteButton.png) no repeat";
    }
  }
}*/

  addEnemy() {
    const currentTimeStamp = Date.now();
    if (
      currentTimeStamp >
      this.lastEnemyTimestamp + this.intervalBetweenEnemies
    ) {
      const enemy = new Enemy(
        this,
        this.canvas.width,
        Math.random() * (this.canvas.height - 50),
        60,
        60,
        this.enemyStartingSpeed
      );
      this.enemies.push(enemy);
      this.lastEnemyTimestamp = currentTimeStamp;
      
    }
  }

  addCandy() {
    const currentTimeStamp2 = Date.now();
    if (
      currentTimeStamp2 >
      this.lastCandyTimestamp + this.intervalBetweenCandies
    ) {
      const candy = new Candy(
        this,
        this.canvas.width,
        Math.random() * (this.canvas.height - 50),
        73,
        73,
        this.candyStartingSpeed
      );
      this.candies.push(candy);
      this.lastCandyTimestamp = currentTimeStamp2;
    }
  }

   collectGarbage() {
    for (let enemy of this.enemies) {
      if (enemy.x >= this.canvas.width) {
        const indexOfEnemy = this.enemies.indexOf(enemy);
        this.enemies.splice(indexOfEnemy, 1);
      }
    }
    for (let candy of this.candies) {
      if (candy.x >= this.canvas.width) {
        const indexOfCandy = this.candies.indexOf(candy);
        this.candies.splice(indexOfCandy, 1);
      }
    }
  }

  loop() {

    this.runLogic();
    this.draw();
    
    if (this.active) {
      window.requestAnimationFrame(() => {
        this.loop();
      });
    } else {
      gameMusic.pause();
      screenPlayElement.style.display = 'none';
      screenGameOverElement.style.display = 'initial';
      
    }
  }

  EarnPoints() {
    for (let candy of this.candies) {
      if (
        this.player.x + this.player.width >= candy.x -30 &&
        this.player.x <= candy.x + candy.width &&
        this.player.y + this.player.height >= candy.y &&
        this.player.y <= candy.y + candy.height
      ) {
        this.score += 10;
        const indexOfCandy = this.candies.indexOf(candy);
        this.candies.splice(indexOfCandy, 1);
        hitSound.play();
      }
    }
  }

   playerHitsEnemyThenGameOver() {
        for (let enemy of this.enemies) {
        if (
        this.player.x + this.player.width >= enemy.x -30 &&
        this.player.x <= enemy.x + enemy.width -50  &&
        this.player.y + this.player.height >= enemy.y +20 &&
        this.player.y <= enemy.y + enemy.height
        ) {
          this.active = false;
          gameOver.play();
        }
    }
  }

  runLogic() {
    this.intervalBetweenEnemies *= 0.9999;
    this.intervalBetweenCandies *= 0.9999;
    this.enemyStartingSpeed *= 1.00005;
    this.candyStartingSpeed *= 1.00005;

    this.addEnemy();
    this.addCandy();
    // Call runLogic method for every "element" in game that has it
    for (let enemy of this.enemies) {
      enemy.runLogic();
      
    }
    for (let candy of this.candies) {
      candy.runLogic();
    }
    this.EarnPoints();
    this.playerHitsEnemyThenGameOver ();
  }

  drawScore() {
    this.context.fillStyle = 'black';
    this.context.font = '32px sans-serif';
    this.context.fillText(this.score, 650, 50);
  }

  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // Call draw method for every "element" in game
    for (let enemy of this.enemies) {
      enemy.draw();
    }
    for (let candy of this.candies) {
      candy.draw();
    }
    this.player.draw();
    this.drawScore();
  }
}
