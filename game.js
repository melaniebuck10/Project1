class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.reset();
    this.setKeyBindings();
  }

  reset() {
    this.player = new Player(this, 180, this.canvas.height / 1.5 - 50 / 5, 50, 50);
    this.lastEnemyTimestamp = 0;
    this.lastCandyTimestamp = 0;
    this.intervalBetweenEnemies = 5000;
    this.intervalBetweenCandies = 5000;
    this.enemyStartingSpeed = 1;
    this.candyStartingSpeed = 1;
    this.enemies = [];
    this.candies = [];
    this.score = 100;
    this.active = true;
  }

  setKeyBindings() {
    window.addEventListener('keydown', (event) => {
      switch (event.code) {
        case 'ArrowUp':
          this.player.y -= 10;
          break;
        case 'ArrowDown':
           if (keys ['ArrowDwn']) {
           this.player.height = this.player.height / 2;}
           else {
               this.player.height = this.player.height
           }
          break;
      }
      /*
      if (this.player.y < 0) {
        this.player.y = 0;
      } else if (this.player.y + this.player.height > this.canvas.height) {
        this.player.y = this.canvas.height - this.player.height; 
      }
      */
      this.player.y = Math.max(
        Math.min(this.player.y, this.canvas.height - this.player.height),
        0
      );
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
        this.canvas.height - 150,
        50,
        50,
        this.enemyStartingSpeed
      );
      this.enemies.push(enemy);
      this.lastEnemyTimestamp = currentTimeStamp;
    }
  }

  addCandy() {
    const currentTimeStamp = Date.now();
    if (
      currentTimeStamp >
      this.lastCandyTimeStamp + this.intervalBetweenCandies
    ) {
      const candy = new Candy(
        this,
        this.canvas.width,
        this.canvas.height - 150,
        50,
        50,
        this.candyStartingSpeed
      );
      this.candies.push(candy);
      this.lastCandyTimeStamp = currentTimeStamp;
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

  checkGameEndingIntersection() {
    for (let enemy of this.enemies) {
      if (
        (this.player.x + this.player.width >= enemy.x &&
          this.player.x <= enemy.x + enemy.width &&
          this.player.y + this.player.height >= enemy.y &&
          this.player.y <= enemy.y + enemy.height) ||
        enemy.x + enemy.width < 0
      ) {
        this.score -= 10;
        const indexOfEnemy = this.enemies.indexOf(enemy);
        this.enemies.splice(indexOfEnemy, 1);
        // hitSound.play();
      }
    }
  }

  checkIntersectionBetweenBulletsAndEnemies() {
    for (let bullet of this.bullets) {
      for (let enemy of this.enemies) {
        if (
          bullet.x >= enemy.x - bullet.width &&
          bullet.y >= enemy.y &&
          bullet.y <= enemy.y + enemy.height
        ) {
          const indexOfBullet = this.bullets.indexOf(bullet);
          const indexOfEnemy = this.enemies.indexOf(enemy);
          this.bullets.splice(indexOfBullet, 1);
          this.enemies.splice(indexOfEnemy, 1);
          this.score += 10;
        }
      }
    }
  }

  runLogic() {
    this.intervalBetweenEnemies *= 0.9999;
    this.intervalBetweenCandies *= 0.9999;
    this.enemyStartingSpeed *= 1.0001;
    this.candyStartingSpeed *= 1.0001;
    /*this.collectGarbage();*/
    this.addEnemy();
    this.addCandy();
    // Call runLogic method for every "element" in game that has it
    for (let enemy of this.enemies) {
      enemy.runLogic();

      for (let candy of this.candies) {
        candy.runLogic();
    }
    for (let bullet of this.bullets) {
      bullet.runLogic();
    }
    this.checkIntersectionBetweenBulletsAndEnemies();
    this.checkGameEndingIntersection();
    if (this.score <= 0) {
      this.active = false;
    }
  }
  }
  drawScore() {
    this.context.fillStyle = 'black';
    this.context.font = '64px sans-serif';
    this.context.fillText(this.score, 600, 350);
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
