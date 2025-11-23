import type { CourseModule } from '../types';
import { Code, Prose } from '../fragments';

export const module3: CourseModule = {
  id: 'module-3',
  title: 'Module 3: Hybrid Architecture',
  lessons: [
    {
      id: '3-1',
      title: 'The "Puppet Master" Pattern',
      type: 'text',
      demoId: 'demo-hybrid-interaction',
      content: (
        <Prose>
          <h3>Mixing React & JSXGraph</h3>
          <p>Keep React as source of truth and let JSXGraph render pixels.</p>
          <h4>Puppet Master Architecture</h4>
          <ol>
            <li>React owns state.</li>
            <li>JSXGraph renders via imperative API.</li>
            <li>Refs bridge the two worlds.</li>
          </ol>
          <p>Use controlled inputs (slider) in React to drive board updates via board bindings.</p>
        </Prose>
      ),
    },
    {
      id: '3-2',
      title: 'Hybrid Mix Demo (Canvas + JSXGraph)',
      type: 'text',
      demoId: 'demo-hybrid-mix',
      content: (
        <Prose>
          <h3>Hybrid Renderer Overlay</h3>
          <p>Combines JSXGraph geometry with a Canvas overlay to illustrate layered rendering.</p>
          <ul>
            <li>JSXGraph draws precise vectors and constraints.</li>
            <li>Canvas overlay renders particles/glow for visual flair.</li>
            <li>Pattern useful when mixing charting engines or game-like effects.</li>
          </ul>
          <Code>{`// Hybrid idea
const board = JXG.JSXGraph.initBoard(...);
const overlay = document.createElement('canvas');
// Draw particles on overlay while JSXGraph handles math primitives.`}</Code>
        </Prose>
      ),
    },
    {
      id: '3-3',
      title: 'Advanced Math: Calculus',
      type: 'text',
      demoId: 'demo-calculus',
      content: (
        <Prose>
          <h3>Advanced Module: Simulations</h3>
          <p>Riemann Sum visualizations showcase JSXGraph’s math primitives.</p>
          <ul>
            <li>FunctionGraph to plot f(x) = 0.5x².</li>
            <li>Riemannsum element to render rectangles.</li>
            <li>Dynamic text for area approximations.</li>
          </ul>
          <Code>{`board.create('riemannsum', [f, n, type, start, end]);`}</Code>
        </Prose>
      ),
    },
  ],
};
