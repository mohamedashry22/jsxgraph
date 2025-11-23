import type { CourseModule } from '../types';
import { Code, Prose } from '../fragments';

export const module2: CourseModule = {
  id: 'module-2',
  title: 'Module 2: Advanced Optimization',
  lessons: [
    {
      id: '2-1',
      title: 'SVG vs Canvas Rendering',
      type: 'text',
      demoId: 'demo-stress-test',
      content: (
        <Prose>
          <h3>The Performance Bottleneck</h3>
          <p>Large datasets stress the SVG renderer because every primitive is a DOM node.</p>
          <h4>The Fix: Canvas Renderer</h4>
          <p>Canvas paints pixels without DOM overhead, ideal for 500+ elements.</p>
          <Code>{`const board = JXG.JSXGraph.initBoard('box', {
  renderer: 'canvas',
});`}</Code>
          <p>Compare SVG vs Canvas: init time, drag responsiveness, memory.</p>
        </Prose>
      ),
    },
    {
      id: '2-2',
      title: 'Batch Updates & Event Throttling',
      type: 'text',
      demoId: 'demo-suspend',
      content: (
        <Prose>
          <h3>Optimization Techniques</h3>
          <section>
            <h4>1. suspendUpdate()</h4>
            <p>Wrap mass element creation to avoid redundant renders.</p>
            <Code>{`board.suspendUpdate();
// ... create 1000 objects ...
board.unsuspendUpdate();`}</Code>
          </section>
          <section>
            <h4>2. Event Throttling</h4>
            <p>Drive board updates directly during pointer events; sync React state afterwards.</p>
          </section>
          <section>
            <h4>3. Precision Reduction</h4>
            <p>Disable hit detection for decorative points.</p>
            <Code>{`board.create('point', [0,0], {
  hasInnerPoints: false,
  fixed: true,
});`}</Code>
          </section>
        </Prose>
      ),
    },
  ],
};
