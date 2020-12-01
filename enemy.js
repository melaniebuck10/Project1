const enemyImage = new Image();
enemyImage.src = 'images/TheGrinch.png';

class Enemy {
  constructor(game, x, y, width, height, speed) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.enemyImage = new Image
    this.enemyImage.src = 'images/TheGrinch.png'

    this.positionChangeTimestamp = 0;
    this.position = 0;
  }

  runLogic() {
    this.x -= this.speed;
  }

  draw() {
    if (Date.now() > this.positionChangeTimestamp) {
      this.position = 0;
      this.positionChangeTimestamp = Date.now();
    }
    this.game.context.save();
    this.game.context.translate(this.x, this.y);
    this.game.context.scale(-1, 1);
    this.game.context.drawImage(
      this.enemyImage,
      this.position * 24,
      0,
      this.width,
      this.height,
      /*this.x,
      this.y,
      this.width,
      this.height*/
    );
    this.game.context.restore();
  }
}
