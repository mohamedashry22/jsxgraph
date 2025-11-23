import { type JSX } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProgressFooterProps {
  disablePrev: boolean;
  disableNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  totalModules: number;
  activeModuleIndex: number;
}

export function ProgressFooter({
  disableNext,
  disablePrev,
  onNext,
  onPrev,
  totalModules,
  activeModuleIndex,
}: ProgressFooterProps): JSX.Element {
  return (
    <footer className="progress-footer">
      <button onClick={onPrev} disabled={disablePrev} className="secondary-btn">
        <ChevronLeft size={16} />
        Previous
      </button>
      <div className="progress-meter">
        <span>Progress</span>
        <div className="progress-bars">
          {Array.from({ length: totalModules }).map((_, index) => (
            <span key={index} className={`progress-dot ${index === activeModuleIndex ? 'is-active' : ''}`} />
          ))}
        </div>
      </div>
      <button onClick={onNext} disabled={disableNext} className="primary-btn">
        Next Lesson
        <ChevronRight size={16} />
      </button>
    </footer>
  );
}
