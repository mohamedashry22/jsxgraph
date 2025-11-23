import type { CourseModule } from '../types';
import { Code, Prose } from '../fragments';

export const module1: CourseModule = {
  id: 'module-1',
  title: 'Module 1: R&D Analysis',
  lessons: [
    {
      id: '1-1',
      title: 'Pros, Cons & Technical Issues',
      type: 'text',
      demoId: 'demo-intro',
      content: (
        <Prose>
          <h3>The R&D Report: Is JSXGraph right for you?</h3>
          <h4>✅ Pros (The Good)</h4>
          <ul>
            <li>True mathematical engine with automatic derivatives/intersections.</li>
            <li>Zero dependencies; standalone JS library.</li>
            <li>Dual rendering (SVG & Canvas) for accessibility vs. performance.</li>
            <li>Backward compatibility down to legacy browsers.</li>
          </ul>
          <h4>❌ Cons (The Bad)</h4>
          <ul>
            <li>Steep learning curve and unique GEONExT syntax.</li>
            <li>Legacy academic visuals require customization.</li>
            <li>React friction due to imperative board management.</li>
          </ul>
          <h4>⚠️ Technical Issues to Watch</h4>
          <ol>
            <li>DOM tax when using SVG with thousands of elements.</li>
            <li>Touch ghosting on some Android WebKit builds.</li>
            <li>Memory leaks if boards aren’t freed in SPA lifecycles.</li>
          </ol>
        </Prose>
      ),
    },
    {
      id: '1-2',
      title: 'Alternatives & Usage Comparisons',
      type: 'text',
      demoId: 'demo-competitors',
      content: (
        <Prose>
          <h3>Alternatives Landscape</h3>
          <section className="alt-card">
            <h4>1. Mafs (React)</h4>
            <p>
              <strong>Best For:</strong> Modern React apps needing simple, beautiful interactive math.
            </p>
            <p>
              <strong>Pros:</strong> Declarative, “React-way”, beautiful default styling.
            </p>
            <p>
              <strong>Cons:</strong> Fewer math features (no built-in derivatives engine).
            </p>
            <p>
              <strong>Usage Comparison</strong>
            </p>
            <Code>{`// Mafs (React)
<Mafs>
  <CartesianCoordinates />
  <Plot.OfX y={(x) => Math.sin(x)} />
</Mafs>

// JSXGraph (Imperative)
board.create('functiongraph', [x => Math.sin(x)]);`}</Code>
          </section>
          <section className="alt-card">
            <h4>2. Desmos API (Proprietary)</h4>
            <p>
              <strong>Best For:</strong> Commercial-grade polish with zero dev time.
            </p>
            <p>
              <strong>Pros:</strong> Best performance in the industry.</p>
            <p>
              <strong>Cons:</strong> Expensive license, closed source.</p>
            <Code>{`// Desmos
calculator.setExpression({ id: 'graph1', latex: 'y=sin(x)' });`}</Code>
          </section>
          <section className="alt-card">
            <h4>3. GeoGebra (Academic)</h4>
            <p>
              <strong>Best For:</strong> Heavy academic simulations needing a full CAS.
            </p>
            <p>
              <strong>Usage:</strong> Typically embedded via iframe rather than direct JS API.
            </p>
          </section>
          <h4>Paid / Enterprise Alternatives</h4>
          <ul>
            <li>Highcharts / amCharts / LightningChart JS – polished chart suites with support and licensing.</li>
            <li>ChartIQ – trading-grade interactions and drawing tools.</li>
            <li>Wolfram|Alpha Notebook Edition – symbolic power with embeddable components (license required).</li>
          </ul>
          <h4>Trade-off Summary</h4>
          <ul>
            <li>Deep math + open source → JSXGraph.</li>
            <li>Simple graphs + React → Mafs.</li>
            <li>Data viz → Chart.js / D3 (or Highcharts if paid support needed).</li>
          </ul>
        </Prose>
      ),
    },
  ],
};
