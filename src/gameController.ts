import { GameOptions } from './interfaces/index';
import { Snake } from './snake';

export class GameController {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  fps = 60;
  snakeSpeed = .5;
  tileSize: number;
  snake: Snake;
  gameTick = 0;

  constructor(canvasSelector: string, gameOptions: GameOptions) {
    this.canvas = document.getElementById(canvasSelector) as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.width = gameOptions.width;
    this.height = gameOptions.height;
    this.tileSize = gameOptions.tileSize;
    this.canvas.width = gameOptions.width;
    this.canvas.height = gameOptions.height;

    this.snake = new Snake(this.width, this.height);
  }

  init(time?: number) {
    const newGameTick = Math.round((time * this.snakeSpeed) / 100);
    if (newGameTick > this.gameTick) {
      this.updateGameLogic();
      if (newGameTick % 5 === 0) {
        this.snake.addBody();
      }
      this.updateDraw(newGameTick);
      this.gameTick = newGameTick;
    }
    requestAnimationFrame(this.init.bind(this));
  }

  updateGameLogic() {
    this.snake.updateLogic();
  }

  startGame() {
    this.init();
  }

  private updateDraw(time: number) {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.drawTable();
    this.drawSnake();
  }

  private drawSnake() {
    this.snake.draw(this.ctx, this.tileSize);
  }

  private drawTable() {
    const xFields = 60;
    const yFields = 40;
    for (let w = 0; w < yFields; w ++) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, w * 10);
      this.ctx.lineTo(this.width, w * 10);
      this.ctx.strokeStyle = 'rgba(0, 0, 0, .1)';
      this.ctx.stroke();
    }
    for (let h = 0; h < xFields; h ++) {
      this.ctx.beginPath();
      this.ctx.moveTo(h * 10, 0);
      this.ctx.lineTo(h * 10, this.height);
      this.ctx.strokeStyle = 'rgba(0, 0, 0, .1)';
      this.ctx.stroke();
    }
  }
}
