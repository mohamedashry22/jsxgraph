import { type JSX } from 'react';
import { GraduationCap, Menu, X } from 'lucide-react';
import type { CourseModule } from '../data/types';

interface SidebarProps {
  modules: CourseModule[];
  activeModuleIndex: number;
  activeLessonIndex: number;
  onNavigate: (moduleIndex: number, lessonIndex: number) => void;
  open: boolean;
  onToggle: (next: boolean) => void;
  onDownload: () => void;
}

export function Sidebar({
  modules,
  activeLessonIndex,
  activeModuleIndex,
  onNavigate,
  open,
  onToggle,
  onDownload,
}: SidebarProps): JSX.Element {
  return (
    <aside className={`landing-sidebar ${open ? 'is-open' : ''}`}>
      <div className="sidebar-header">
        <div>
          <p className="eyebrow">Interactive course</p>
          <h1 className="sidebar-title">
            <GraduationCap size={18} />
            JSXGraph Mastery
          </h1>
        </div>
        <button className="icon-button md-hidden" onClick={() => onToggle(false)} aria-label="Hide sidebar">
          <X size={18} />
        </button>
      </div>
      <div className="sidebar-scroll">
        {modules.map((module, moduleIndex) => (
          <div key={module.id} className="sidebar-module">
            <p className="module-label">{module.title}</p>
            <div className="sidebar-lessons">
              {module.lessons.map((lesson, lessonIndex) => {
                const active = moduleIndex === activeModuleIndex && lessonIndex === activeLessonIndex;
                return (
                  <button
                    key={lesson.id}
                    onClick={() => onNavigate(moduleIndex, lessonIndex)}
                    className={`lesson-button ${active ? 'is-active' : ''}`}
                  >
                    <span className="lesson-bullet" />
                    <span>{lesson.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="sidebar-footer">
        <button className="primary-btn" onClick={onDownload}>
          Resources
        </button>
        <button className="ghost-btn md-hidden" onClick={() => onToggle(false)}>
          <Menu size={16} />
          Collapse
        </button>
      </div>
    </aside>
  );
}
