import type { CourseModule } from '../types';
import { Code, Prose } from '../fragments';

export const module0: CourseModule = {
  id: 'module-0',
  title: 'Module 0: Setup & Installation',
  lessons: [
    {
      id: '0-1',
      title: 'Introduction & Installation',
      type: 'text',
      demoId: 'demo-install',
      content: (
        <Prose>
          <h3>Welcome to Mastering JSXGraph</h3>
          <p>
            JSXGraph is a cross-browser JavaScript library for interactive geometry, function plotting, charting, and data
            visualization. Unlike simple charting libraries, JSXGraph is a Dynamic Geometry System (DGS) that understands
            mathematical dependencies.
          </p>
          <h3>Installation</h3>
          <h4>1. Via NPM (Recommended)</h4>
          <Code>{`npm install jsxgraph`}</Code>
          <Code>{`import JXG from 'jsxgraph';`}</Code>
          <h4>2. Via CDN (Quick Start)</h4>
          <Code>{`<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/jsxgraph/distrib/jsxgraph.css" />
<script src="https://cdn.jsdelivr.net/npm/jsxgraph/distrib/jsxgraphcore.js"></script>`}</Code>
          <h3>The "Hello World" of Geometry</h3>
          <ol>
            <li>The Container: an HTML div with an id.</li>
            <li>The Board: initialized via JXG.JSXGraph.initBoard.</li>
            <li>The Elements: points, lines, and circles wired to the board.</li>
          </ol>
        </Prose>
      ),
    },
  ],
};
