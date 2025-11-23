export interface RenderSample {
  durationMs: number;
  timestamp: number;
  elementCount: number;
}

export interface RenderStats {
  lastDuration: number;
  averageDuration: number;
  minDuration: number;
  maxDuration: number;
  sampleCount: number;
  approximateFps: number;
}

const DEFAULT_WINDOW = 40;

export class StatsTracker {
  private samples: RenderSample[] = [];
  private readonly windowSize: number;

  constructor(windowSize = DEFAULT_WINDOW) {
    this.windowSize = windowSize;
  }

  record(sample: RenderSample): RenderStats {
    this.samples = [sample, ...this.samples].slice(0, this.windowSize);
    return this.compute();
  }

  reset(): void {
    this.samples = [];
  }

  private compute(): RenderStats {
    if (this.samples.length === 0) {
      return {
        lastDuration: 0,
        averageDuration: 0,
        minDuration: 0,
        maxDuration: 0,
        sampleCount: 0,
        approximateFps: 0,
      };
    }

    const durations = this.samples.map((sample) => sample.durationMs);
    const total = durations.reduce((sum, value) => sum + value, 0);
    const averageDuration = total / durations.length;
    const lastDuration = durations[0];
    const minDuration = Math.min(...durations);
    const maxDuration = Math.max(...durations);
    const approximateFps = averageDuration > 0 ? 1000 / averageDuration : 0;

    return {
      lastDuration,
      averageDuration,
      minDuration,
      maxDuration,
      sampleCount: this.samples.length,
      approximateFps,
    };
  }
}
