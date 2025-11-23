import { type JSX } from 'react';
import { BarChart2, Monitor } from 'lucide-react';
import { JXGBoard } from './JXGBoard';

interface DemoPanelProps {
  demoId: string;
  jxg: typeof import('jsxgraph') | null;
  moduleTitle: string;
}

export function DemoPanel({ demoId, jxg }: DemoPanelProps): JSX.Element {
  const heavy = demoId.includes('stress');
  return (
    <section className="demo-panel">
      <header>
        <span>
          <Monitor size={14} /> Live Playground
        </span>
        <div className="tag-row">
          {heavy && (
            <span className="tag warning">
              <BarChart2 size={10} /> Stress test
            </span>
          )}
          <span className="tag success">Active</span>
        </div>
      </header>
      <div className="demo-canvas">
        <JXGBoard demoId={demoId} jxg={jxg} />
      </div>
    </section>
  );
}
