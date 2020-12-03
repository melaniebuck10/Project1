const canvasElement = document.querySelector('canvas');

const game = new Game(canvasElement);

const triggerPlayElement = document.getElementById('trigger-play');
const triggerPlayAgainElement = document.getElementById('trigger-play-again');

const screenStartElement = document.getElementById('screen-start');
const screenGameOverElement = document.getElementById('screen-game-over');
const screenPlayElement = document.getElementById('screen-play');

window.addEventListener('load', () =>{
  introSound.play ();
})

triggerPlayElement.addEventListener('click', () => {
  introSound.pause ();
  screenStartElement.style.display = 'none';
  screenPlayElement.style.display = 'initial';
  gameMusic.play();

  game.loop();
});

triggerPlayAgainElement.addEventListener('click', () => {
  screenGameOverElement.style.display = 'none';
  screenPlayElement.style.display = 'initial';
 

  game.reset();
  game.loop();
});
