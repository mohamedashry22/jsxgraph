import type { CourseModule } from '../types';
import { Prose } from '../fragments';

export const module6: CourseModule = {
  id: 'module-6',
  title: 'Module 6: R&D Answers & Insights',
  lessons: [
    {
      id: '6-1',
      title: 'Key R&D Questions (Answered)',
      type: 'text',
      demoId: 'demo-hybrid-mix',
      content: (
        <Prose>
          <h3>R&D Task Answers</h3>
          <h4>Pros & Cons</h4>
          <ul>
            <li>Pros: Deep math engine, dual renderers, offline-friendly, MIT/LGPL licensing.</li>
            <li>Cons: Steep learning curve, dated default styling, imperative lifecycle conflicts with React, SVG performance ceilings.</li>
          </ul>
          <h4>Technical Issues</h4>
          <ul>
            <li>SVG DOM weight beyond ~800 elements.</li>
            <li>Event flooding on high-Hz devices if not throttled.</li>
            <li>Memory leaks if boards aren’t freed in SPAs.</li>
          </ul>
          <h4>Free Alternatives</h4>
          <ul>
            <li>Mafs (React), GeoGebra (GPL), Desmos API (restricted), Paper.js/Konva/two.js, Chart.js/D3 for data viz.</li>
          </ul>
          <h4>Performance Optimization</h4>
          <ul>
            <li>Prefer Canvas for dense scenes; batch updates with suspendUpdate.</li>
            <li>Throttle pointer events to rAF; decimate datasets.</li>
            <li>Lazy-load JSXGraph; free boards on unmount.</li>
          </ul>
        </Prose>
      ),
    },
    {
      id: '6-2',
      title: 'Takeaways from ibldynamics Chapter 1',
      type: 'text',
      demoId: 'demo-intro',
      content: (
        <Prose>
          <h3>Dynamical Systems Context</h3>
          <p>
            Chapter 1 (ibldynamics.com) frames interactive modeling as a way to explore dynamical systems—iterative rules
            leading to complex behavior. JSXGraph fits as a visualization layer for these experiments.
          </p>
          <ul>
            <li>Interactive geometry helps learners see how small rule changes alter system behavior.</li>
            <li>MathJax/LaTeX labels are important for communicating system equations clearly.</li>
            <li>Side-by-side controls + plots make inquiry-driven learning possible (aligns with our playground UI).</li>
          </ul>
        </Prose>
      ),
    },
  ],
};
