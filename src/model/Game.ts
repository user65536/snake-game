import EventEmitter2 from 'eventemitter2';
import { makeAutoObservable } from 'mobx';
import { Coordinate } from './Coordinate';
import { Snake } from './Snake';
import { isSameCoordinate } from './vectorHelper';

export interface GameOptions {
  groundSize: [number, number];
}

export class Game {
  started = false;

  event = new EventEmitter2();

  get width() {
    return this.options.groundSize[0];
  }

  get height() {
    return this.options.groundSize[1];
  }

  private getInitialBody(): Coordinate[] {
    const centerX = Math.floor(this.width / 2);
    const centerY = Math.floor(this.height / 2);
    return [
      [centerX, centerY],
      [centerX + 1, centerY],
    ];
  }
  snake: Snake;

  food: Coordinate;

  private timer = -1;

  constructor(private readonly options: GameOptions) {
    this.snake = new Snake({ body: this.getInitialBody() });
    this.food = this.randomGetFood();
    makeAutoObservable(this);
  }

  private randomGetFood(): Coordinate {
    const x = Math.floor(Math.random() * this.width);
    const y = Math.floor(Math.random() * this.height);
    return [x, y];
  }

  private generateFood() {
    this.food = this.randomGetFood();
  }

  private normalizeCoordinate(coordinate?: Coordinate): Coordinate | undefined {
    if (!coordinate) return;
    const x = (coordinate[0] + this.width) % this.width;
    const y = (coordinate[1] + this.height) % this.height;
    return [x, y];
  }

  private moveTo(coordinate?: Coordinate) {
    if (!coordinate) return;
    if (!isSameCoordinate(this.snake.tail, coordinate) && this.snake.isBodyHave(coordinate)) {
      this.pause();
      this.event.emit('end');
      return;
    }
    this.snake.moveHeadTo(coordinate);
    if (isSameCoordinate(this.food, this.snake.head)) {
      this.snake.grow();
      this.generateFood();
    }
  }

  private moveForward() {
    const nextHead = this.snake.getHeadForward();
    this.moveTo(this.normalizeCoordinate(nextHead));
  }

  moveUp() {
    const nextHead = this.snake.getHeadUp();
    this.moveTo(this.normalizeCoordinate(nextHead));
  }

  moveDown() {
    const nextHead = this.snake.getHeadDown();
    this.moveTo(this.normalizeCoordinate(nextHead));
  }

  moveLeft() {
    const nextHead = this.snake.getHeadLeft();
    this.moveTo(this.normalizeCoordinate(nextHead));
  }

  moveRight() {
    const nextHead = this.snake.getHeadRight();
    this.moveTo(this.normalizeCoordinate(nextHead));
  }

  start() {
    this.started = true;
    this.timer = window.setInterval(() => this.moveForward(), 100);
  }

  pause() {
    this.started = false;
    window.clearInterval(this.timer);
  }

  toggle() {
    if (this.started) this.pause();
    else this.start();
  }
}
