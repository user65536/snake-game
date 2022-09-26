import { Coordinate } from './Coordinate';

export function isSameCoordinate(a: Coordinate, b: Coordinate): boolean {
  if (!a || !b) return false;
  return a.every((value, index) => value === b[index]);
}

export function minusCoordinate(source: Coordinate, target: Coordinate) {
  return source.map((value, index) => value - target[index]) as Coordinate;
}

export function addCoordinate(source: Coordinate, target: Coordinate) {
  return source.map((value, index) => value + target[index]) as Coordinate;
}
