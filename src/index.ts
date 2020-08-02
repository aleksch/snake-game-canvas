import { GameController } from './gameController';

const gameOptions = {
  width: 600,
  height: 400,
  tileSize: 10,
};

const gameController = new GameController('canvas', gameOptions);

gameController.startGame();