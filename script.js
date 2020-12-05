const canvasElement = document.querySelector('canvas');

const game = new Game(canvasElement);

const triggerPlayElement = document.getElementById('trigger-play');
const triggerPlayAgainElement = document.getElementById('trigger-play-again');


//const triggerMuteButtonElement = document.getElementById('mutebtn');

const screenStartElement = document.getElementById('screen-start');
const screenGameOverElement = document.getElementById('screen-game-over');
const screenPlayElement = document.getElementById('screen-play');
//const screenMuteButtonElement = document.getElementById('MuteButton');

window.addEventListener('load', () =>{
  introSound.play();
})

triggerPlayElement.addEventListener('click', () => {
  introSound.pause ();
  screenStartElement.style.display = 'none';
  screenPlayElement.style.display = 'initial';

  game.loop();
  gameMusic.play();
});


triggerPlayAgainElement.addEventListener('click', () => {
  screenGameOverElement.style.display = 'none';
  screenPlayElement.style.display = 'initial';
 
  gameMusic.pause();
  game.reset();
  game.loop();

  gameMusic.play();
});
