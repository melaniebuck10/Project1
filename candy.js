const candyImage = new Image();
candyImage.src = 'enemy.png';

class Candy {
  constructor(game, x, y, width, height, speed) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;

    this.positionChangeTimestamp = 0;
    this.position = 0;
  }

  runLogic() {
    this.x -= this.speed;
  }

  draw() {
    if (Date.now() > this.positionChangeTimestamp) {
      this.position = this.position;
      this.positionChangeTimestamp = Date.now();
    }
    this.game.context.save();
    this.game.context.translate(this.x + this.width, this.y);
    this.game.context.scale(-1, 1);
    this.game.context.drawImage(
      enemyImage,
      this.position,
      0,
      24,
      24,
      0,
      0,
      this.width,
      this.height
    );
    this.game.context.restore();
  }
}

