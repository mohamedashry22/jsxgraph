import type { Board } from '../core/board/Board';
import type { RendererSize } from '../core/renderers/Renderer';
import { createRandomPoint, createRandomSegment } from './randomElements';

export interface BenchmarkOptions {
  iterations: number;
  includeSegments?: boolean;
  includePoints?: boolean;
  boardSize: RendererSize;
}

export interface BenchmarkSummary {
  average: number;
  min: number;
  max: number;
  sampleCount: number;
}

export interface BenchmarkResult {
  durations: number[];
  summary: BenchmarkSummary;
}

const defaultOptions: BenchmarkOptions = {
  iterations: 30,
  includePoints: true,
  includeSegments: true,
  boardSize: { width: 720, height: 480 },
};

export function runBenchmark(board: Board, options?: Partial<BenchmarkOptions>): BenchmarkResult {
  const resolved = { ...defaultOptions, ...options };
  const durations: number[] = [];
  let shouldCapture = false;

  const cleanup = board.on('render:complete', (payload) => {
    if (!shouldCapture) {
      return;
    }
    durations.push(payload.durationMs);
  });

  board.clear();

  for (let i = 0; i < resolved.iterations; i++) {
    if (resolved.includePoints) {
      shouldCapture = true;
      board.addElement(createRandomPoint(resolved.boardSize.width, resolved.boardSize.height));
      shouldCapture = false;
    }
    if (resolved.includeSegments) {
      shouldCapture = true;
      board.addElement(createRandomSegment(resolved.boardSize.width, resolved.boardSize.height));
      shouldCapture = false;
    }
  }

  cleanup();

  const summary = summarizeDurations(durations);

  return {
    durations,
    summary,
  };
}

function summarizeDurations(durations: number[]): BenchmarkSummary {
  if (durations.length === 0) {
    return {
      average: 0,
      min: 0,
      max: 0,
      sampleCount: 0,
    };
  }

  const total = durations.reduce((sum, value) => sum + value, 0);
  return {
    average: total / durations.length,
    min: Math.min(...durations),
    max: Math.max(...durations),
    sampleCount: durations.length,
  };
}
