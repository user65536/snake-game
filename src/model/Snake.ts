import { makeAutoObservable } from 'mobx';
import { Coordinate } from './Coordinate';
import { addCoordinate, isSameCoordinate, minusCoordinate } from './vectorHelper';

export interface SnakeOptions {
  body: Coordinate[];
}

export class Snake {
  static getBodyFromHead(head: Coordinate) {
    return [head, [head[0] + 1, head[1]]];
  }

  body: Coordinate[] = [];

  private lastTail: Coordinate;

  get directionVector() {
    const neck = this.body[1];
    return minusCoordinate(this.head, neck);
  }

  get head() {
    return this.body[0];
  }

  get tail() {
    return this.body[this.body.length - 1];
  }

  get direction() {
    if (isSameCoordinate(this.directionVector, [0, -1])) return 'top';
    if (isSameCoordinate(this.directionVector, [1, 0])) return 'right';
    if (isSameCoordinate(this.directionVector, [0, 1])) return 'bottom';
    return 'left';
  }

  constructor(readonly options: SnakeOptions) {
    this.body = options.body;
    this.lastTail = this.tail;
    makeAutoObservable(this);
  }

  private removeTail() {
    if (this.body.length <= 1) return;
    return this.body.pop();
  }

  private insertHead(head: Coordinate) {
    this.body.unshift(head);
  }

  private setLastTail(tail?: Coordinate) {
    if (!tail) return;
    this.lastTail = tail;
  }

  isBodyHave(coordinate: Coordinate) {
    return this.body.some((i) => isSameCoordinate(i, coordinate));
  }

  moveHeadTo(to: Coordinate) {
    const tail = this.removeTail();
    this.insertHead(to);
    this.setLastTail(tail);
  }

  getHeadForward() {
    return addCoordinate(this.head, this.directionVector);
  }

  getHeadDown() {
    if (this.direction === 'top' || this.direction === 'bottom') return;
    return addCoordinate(this.head, [0, 1]);
  }

  getHeadUp() {
    if (this.direction === 'top' || this.direction === 'bottom') return;
    return addCoordinate(this.head, [0, -1]);
  }

  getHeadLeft() {
    if (this.direction === 'left' || this.direction === 'right') return;
    return addCoordinate(this.head, [-1, 0]);
  }

  getHeadRight() {
    if (this.direction === 'left' || this.direction === 'right') return;
    return addCoordinate(this.head, [1, 0]);
  }

  grow() {
    this.body.push(this.lastTail);
  }

  clone() {
    return new Snake({ body: [...this.body.map((i) => [...i] as Coordinate)] });
  }
}
