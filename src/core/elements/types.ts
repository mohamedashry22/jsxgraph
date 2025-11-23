export type ElementKind = 'point' | 'segment';

interface BaseElement {
  id: string;
  kind: ElementKind;
  metadata?: Record<string, unknown>;
}

export interface PointElement extends BaseElement {
  kind: 'point';
  position: { x: number; y: number };
  radius?: number;
  color?: string;
}

export interface SegmentElement extends BaseElement {
  kind: 'segment';
  start: { x: number; y: number };
  end: { x: number; y: number };
  strokeWidth?: number;
  color?: string;
}

export type BoardElement = PointElement | SegmentElement;

export function isPoint(element: BoardElement): element is PointElement {
  return element.kind === 'point';
}

export function isSegment(element: BoardElement): element is SegmentElement {
  return element.kind === 'segment';
}
