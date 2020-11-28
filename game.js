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
      93,
      64
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
        50,
        50,
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
        50,
        50,
        this.candyStartingSpeed
      );
      this.candies.push(candy);
      this.lastCandyTimestamp = currentTimeStamp2;
    }
  }

  /* collectGarbage() {
    for (let bullet of this.bullets) {
      if (bullet.x >= this.canvas.width) {
        const indexOfBullet = this.bullets.indexOf(bullet);
        this.bullets.splice(indexOfBullet, 1);
      }
    }
  }
*/
  loop() {
    this.runLogic();
    this.draw();
    /*
    setTimeout(() => {
      this.loop();
    }, 1000 / 30);
    */
    if (this.active) {
      window.requestAnimationFrame(() => {
        this.loop();
      });
    } else {
      screenPlayElement.style.display = 'none';
      screenGameOverElement.style.display = 'initial';
    }
  }

  EarnPoints() {
    for (let candy of this.candies) {
      if (
        this.player.x + this.player.width >= candy.x &&
        this.player.x <= candy.x + candy.width &&
        this.player.y + this.player.height >= candy.y &&
        this.player.y <= candy.y + candy.height
      ) {
        this.score += 10;
        const indexOfCandy = this.candies.indexOf(candy);
        this.candies.splice(indexOfCandy, 1);
        // hitSound.play();
      }
    }
  }

  /* checkIntersectionBetweenPlayerAndEnemies() {
        for (let enemy of this.enemies) {
        if (
          player.x >= enemy.x - player.width &&
          player.y >= enemy.y &&
          player.y <= enemy.y + enemy.height
        ) 
    }
  }
*/
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
      /* this.checkIntersectionBetweenPlayerAndEnemies();
      this.checkGameEndingIntersection();
      if (this.score <= 0) {
        this.active = false;
      }*/
    }
    for (let candy of this.candies) {
      candy.runLogic();
    }
    this.EarnPoints();
  }

  drawScore() {
    this.context.fillStyle = 'black';
    this.context.font = '32px sans-serif';
    this.context.fillText(this.score, 700, 50);
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
