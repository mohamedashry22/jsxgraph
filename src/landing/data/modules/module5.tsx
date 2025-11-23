import type { CourseModule } from '../types';
import { Code, Prose } from '../fragments';

export const module5: CourseModule = {
  id: 'module-5',
  title: 'Module 5: React, JS, and TS Usage',
  lessons: [
    {
      id: '5-1',
      title: 'Using JSXGraph with React',
      type: 'text',
      demoId: 'demo-grid',
      content: (
        <Prose>
          <h3>React Integration</h3>
          <p>Mount boards via refs, clean up with freeBoard, and avoid state thrash.</p>
          <Code>{`import { useEffect, useRef } from 'react';
import JXG from 'jsxgraph';

export function MyBoard() {
  const ref = useRef(null);
  useEffect(() => {
    const board = JXG.JSXGraph.initBoard(ref.current, { boundingbox: [-5,5,5,-5], axis: true });
    return () => JXG.JSXGraph.freeBoard(board);
  }, []);
  return <div ref={ref} className="jxgbox" style={{ width: 400, height: 300 }} />;
}`}</Code>
        </Prose>
      ),
    },
    {
      id: '5-2',
      title: 'Using JSXGraph with plain JS',
      type: 'text',
      demoId: 'demo-install',
      content: (
        <Prose>
          <h3>Vanilla JavaScript</h3>
          <Code>{`const board = JXG.JSXGraph.initBoard('board', {
  boundingbox: [-5,5,5,-5],
  axis: true,
});
const A = board.create('point', [0,0]);
const B = board.create('point', [2,3]);
board.create('line', [A,B]);`}</Code>
        </Prose>
      ),
    },
    {
      id: '5-3',
      title: 'Using JSXGraph with TypeScript',
      type: 'text',
      demoId: 'demo-competitors',
      content: (
        <Prose>
          <h3>TypeScript Tips</h3>
          <ul>
            <li>Install types: `npm i -D @types/jsxgraph` if needed, or rely on bundled types.</li>
            <li>Define board container as HTMLDivElement and assert on init.</li>
            <li>Wrap imperative calls in utilities to keep types localized.</li>
          </ul>
          <Code>{`const container = document.getElementById('board') as HTMLDivElement;
const board = JXG.JSXGraph.initBoard(container, { boundingbox: [-5,5,5,-5], axis: true });`}</Code>
        </Prose>
      ),
    },
  ],
};
