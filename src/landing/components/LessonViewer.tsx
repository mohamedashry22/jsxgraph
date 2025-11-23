import { type JSX } from 'react';
import { Code, Layers } from 'lucide-react';
import type { Lesson, CourseModule } from '../data/types';

interface LessonViewerProps {
  lesson: Lesson;
  module: CourseModule;
}

export function LessonViewer({ lesson, module }: LessonViewerProps): JSX.Element {
  return (
    <div className="lesson-viewer">
      <div className="lesson-meta">
        <span className="eyebrow">{module.title}</span>
        <h2>{lesson.title}</h2>
      </div>
      <article className="lesson-body">{lesson.content}</article>
      <div className="lesson-snippet">
        <header>
          <span>
            <Code size={14} /> Implementation code
          </span>
        </header>
        <pre>{`// Implementation for: ${lesson.title}
            const board = JXG.JSXGraph.initBoard('jxgbox', {
              boundingbox: [-5, 5, 5, -5],
              axis: true,
              renderer: '${lesson.demoId.includes('stress') ? 'canvas' : 'svg'}',
            });
            // Add primitives – see live preview for output.`}</pre>
      </div>
      <div className="lesson-info">
        <Layers size={14} />
        <span>Need the interactive playground? Launch the renderer panel to explore hands-on.</span>
      </div>
    </div>
  );
}
