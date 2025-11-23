import { type JSX, useEffect } from 'react';
import { runDemo } from '../demos/runDemo';

interface JXGBoardProps {
  demoId: string;
  jxg: typeof import('jsxgraph') | null;
}

export function JXGBoard({ demoId, jxg }: JXGBoardProps): JSX.Element {
  const containerId = `jxg-board-${demoId}`;

  useEffect(() => {
    if (!jxg) {
      return;
    }
    let cancelled = false;
    const start = async (): Promise<void> => {
      if (cancelled) return;
      runDemo(containerId, demoId, jxg);
    };
    const timeout = window.setTimeout(start, 100);
    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, [demoId, jxg, containerId]);

  return (
    <div className="board-frame">
      <div id={containerId} className="board-surface jxgbox" />
      {!jxg && <div className="board-overlay">Loading JSXGraph Library…</div>}
    </div>
  );
}
