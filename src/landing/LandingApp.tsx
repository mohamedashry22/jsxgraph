import { type JSX, useState } from 'react';
import '../styles/landing.css';
import '../styles/jsxgraph.css';
import { DownloadModal } from './components/DownloadModal';
import { Sidebar } from './components/Sidebar';
import { LessonViewer } from './components/LessonViewer';
import { DemoPanel } from './components/DemoPanel';
import { ProgressFooter } from './components/ProgressFooter';
import { TopBar } from './components/TopBar';
import { courseData } from './data/courseContent';
import { useJSXGraph } from './hooks/useJSXGraph';

export function LandingApp(): JSX.Element {
  const jxg = useJSXGraph();
  const [moduleIndex, setModuleIndex] = useState(0);
  const [lessonIndex, setLessonIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const module = courseData[moduleIndex];
  const lesson = module.lessons[lessonIndex];

  const goNext = (): void => {
    if (lessonIndex < module.lessons.length - 1) {
      setLessonIndex((prev) => prev + 1);
      return;
    }
    if (moduleIndex < courseData.length - 1) {
      setModuleIndex((prev) => prev + 1);
      setLessonIndex(0);
    }
  };

  const goPrev = (): void => {
    if (lessonIndex > 0) {
      setLessonIndex((prev) => prev - 1);
      return;
    }
    if (moduleIndex > 0) {
      const previousModule = moduleIndex - 1;
      setModuleIndex(previousModule);
      setLessonIndex(courseData[previousModule].lessons.length - 1);
    }
  };

  const launchPlayground = (): void => {
    window.location.href = '/?view=playground';
  };

  return (
    <div className="landing-app">
      <DownloadModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <Sidebar
        modules={courseData}
        activeLessonIndex={lessonIndex}
        activeModuleIndex={moduleIndex}
        onNavigate={(moduleIdx, lessonIdx) => {
          setModuleIndex(moduleIdx);
          setLessonIndex(lessonIdx);
        }}
        open={sidebarOpen}
        onToggle={setSidebarOpen}
        onDownload={() => setModalOpen(true)}
      />
      <div className="landing-main">
        <TopBar sidebarOpen={sidebarOpen} onToggleSidebar={setSidebarOpen} onLaunchPlayground={launchPlayground} />
        <div className="landing-body">
          <section className="lesson-column">
            <LessonViewer module={module} lesson={lesson} />
            <DemoPanel demoId={lesson.demoId} jxg={jxg} moduleTitle={module.title} />
          </section>
        </div>
        <ProgressFooter
          disablePrev={moduleIndex === 0 && lessonIndex === 0}
          disableNext={moduleIndex === courseData.length - 1 && lessonIndex === module.lessons.length - 1}
          onPrev={goPrev}
          onNext={goNext}
          totalModules={courseData.length}
          activeModuleIndex={moduleIndex}
        />
        <div id="printable-content" className="print-area" aria-hidden="true">
          <section className="print-cover">
            <h1>JSXGRAPH</h1>
          </section>
          {courseData.map((mod) => (
            <section key={mod.id} className="print-module">
              <h2>{mod.title}</h2>
              {mod.lessons.map((les) => (
                <div key={`${mod.id}-${les.id}`} className="print-lesson">
                  <LessonViewer module={mod} lesson={les} />
                </div>
              ))}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
