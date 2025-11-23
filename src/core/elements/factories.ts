import type { PointElement, SegmentElement } from './types';

let elementCounter = 0;

function nextId(prefix: string): string {
  elementCounter += 1;
  return `${prefix}-${elementCounter}`;
}

export function createPoint(x: number, y: number, color = '#ff6b6b'): PointElement {
  return {
    id: nextId('pt'),
    kind: 'point',
    position: { x, y },
    color,
    radius: 6,
  };
}

export function createSegment(
  start: { x: number; y: number },
  end: { x: number; y: number },
  color = '#4dabf7',
): SegmentElement {
  return {
    id: nextId('seg'),
    kind: 'segment',
    start,
    end,
    color,
    strokeWidth: 2,
  };
}
