import type { CourseModule } from '../types';
import { Prose } from '../fragments';

export const module4: CourseModule = {
  id: 'module-4',
  title: 'Module 4: FAQ & Troubleshooting',
  lessons: [
    {
      id: '4-1',
      title: 'Frequently Asked Questions',
      type: 'text',
      demoId: 'demo-intro',
      content: (
        <Prose>
          <h3>FAQ</h3>
          <dl className="faq-list">
            <dt>Can I use JSXGraph in React Native?</dt>
            <dd>Not directly; it needs DOM. Use a WebView or consider Mafs/Skia for native.</dd>
            <dt>How do I save board state?</dt>
            <dd>Iterate board.objects, serialize usrCoords, and recreate manually.</dd>
            <dt>Why is Canvas blurry on Retina?</dt>
            <dd>Scale the canvas via window.devicePixelRatio before drawing.</dd>
            <dt>Is JSXGraph free for commercial use?</dt>
            <dd>Yes. LGPL/MIT; keep copyright notices in source.</dd>
            <dt>How do I export an image?</dt>
            <dd>Canvas: toDataURL; SVG: serialize or use JXG.dumpToDataURI.</dd>
          </dl>
        </Prose>
      ),
    },
  ],
};
