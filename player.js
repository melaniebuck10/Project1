const playerImage = new Image();
playerImage.src = 'images/SantaFinal.png';

class Player {
  constructor(game, x, y, width, height) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.positionChangeTimestamp = 0;
    this.position = 0;
  }

  draw() {
    if (Date.now() > this.positionChangeTimestamp + 100) {
      this.positionChangeTimestamp = Date.now();
    }
    this.game.context.drawImage(
      playerImage,
      24 * this.position,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
