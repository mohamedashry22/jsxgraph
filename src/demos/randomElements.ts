import { createPoint, createSegment } from '../core/elements/factories';
import type { BoardElement } from '../core/elements/types';

export function createRandomPoint(width: number, height: number): BoardElement {
  const x = Math.random() * width;
  const y = Math.random() * height;
  return createPoint(x, y);
}

export function createRandomSegment(width: number, height: number): BoardElement {
  const start = { x: Math.random() * width, y: Math.random() * height };
  const end = { x: Math.random() * width, y: Math.random() * height };
  return createSegment(start, end);
}
