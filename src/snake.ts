export class Snake {
  x = 50;
  y = 10;
  length = 0;
  speed = 2;
  direction: SnakeDirection;
  width: number;
  height: number;
  bodyPosition: any[];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.direction = SnakeDirection.RIGHT;
    this.initKeyEventListener();
    this.bodyPosition = [];
  }

  updateLogic() {
    this.сalculateNextHeadPosition();
    this.calculateBodyNextPosition();
  }

  сalculateNextHeadPosition() {
    switch (this.direction) {
      case SnakeDirection.UP:
        if (this.y <= 0) {
          this.y = this.height / 10 - 1;
        } else {
          this.y -= 1;
        }
        break;
      case SnakeDirection.RIGHT:
        if (this.width / 10 - 1 <= this.x) {
          this.x = 0;
        } else {
          this.x += 1;
        }
        break;
      case SnakeDirection.DOWN:
        if (this.height / 10 - 1 <= this.y) {
          this.y = 0;
        } else {
          this.y += 1;
        }
        break;
      case SnakeDirection.LEFT:
        if (this.x <= 0) {
          this.x = this.width / 10 - 1;
        } else {
          this.x -= 1;
        }
        break;
      default:
        break;
    }
    log([this.x, this.y, this.width / 10, this.height / 10]);
  }

  calculateBodyNextPosition() {
    const currentX = this.x;
    const currentY = this.y;
    const tempBody = [...this.bodyPosition];
    if (tempBody.length) {
      this.bodyPosition = [
        [currentX, currentY],
        ...tempBody.slice(0, tempBody.length - 1),
      ];
    }
  }

  addBody() {
    let lastX = this.x;
    let lastY = this.y;
    const lastBodyPosition = this.bodyPosition[this.bodyPosition.length - 1];
    if (lastBodyPosition) {
      lastX = lastBodyPosition[0];
      lastY = lastBodyPosition[1];
    }
    this.bodyPosition.push([lastX, lastY]);
  }

  draw(ctx: CanvasRenderingContext2D, tileSize: number) {
    ctx.fillRect(this.x * tileSize, this.y * tileSize, 10, 10);
    this.bodyPosition.forEach((position: number[]) => {
      const [x, y] = position;
      ctx.fillRect(x * tileSize, y * tileSize, 10, 10);
    })
  }

  initKeyEventListener() {
    document.addEventListener('keydown', e => {
      const code = e.which;
      if (SnakeDirection[code] && Math.abs(this.direction - code) !== 2) {
        this.direction = code;
      }
    });
  }
}

const log = (info: any) => {
  const logger = document.getElementById('logger');
  logger.textContent = info.toString();
}

enum SnakeDirection {
  UP = 38,
  DOWN = 40,
  RIGHT = 39,
  LEFT = 37
}