import { type JSX } from 'react';
import { BookOpen, Download, X } from 'lucide-react';

interface DownloadModalProps {
  open: boolean;
  onClose: () => void;
}

export function DownloadModal({ open, onClose }: DownloadModalProps): JSX.Element | null {
  if (!open) {
    return null;
  }
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <header className="modal-header">
          <div className="modal-title">
            <BookOpen size={18} />
            <span>Resources</span>
          </div>
          <button onClick={onClose} className="icon-button" aria-label="Close modal">
            <X size={18} />
          </button>
        </header>
        <div className="modal-body">
          <p className="muted">Useful links for JSXGraph, performance tuning, and hybrid demos:</p>
          <ul className="resource-list">
            <li>
              <a href="https://jsxgraph.org" target="_blank" rel="noreferrer">
                Official JSXGraph site
              </a>
            </li>
            <li>
              <a href="https://github.com/jsxgraph/jsxgraph" target="_blank" rel="noreferrer">
                JSXGraph GitHub repository
              </a>
            </li>
            <li>
              <a href="https://github.com/geometryzen/tsxgraph/tree/main" target="_blank" rel="noreferrer">
                MIT JSX in ts REPO
              </a>
            </li>
            <li>
              <a href="https://ibldynamics.com/" target="_blank" rel="noreferrer">
                Dynamical systems chapter (ibldynamics) for modeling context
              </a>
            </li>
            <li>
              <a href="https://github.com/paperjs/paper.js" target="_blank" rel="noreferrer">
                Paper.js for hybrid rendering overlays
              </a>
            </li>
          </ul>
          <p className="caption">Tip: click “Export PDF” in the top bar to grab the full course as a PDF.</p>
        </div>
        <footer className="modal-footer">
          <div className="resource-actions">
            <a className="primary-btn" href="https://github.com/jsxgraph/jsxgraph/releases" target="_blank" rel="noreferrer">
              <Download size={14} />
              Download JSXGraph
            </a>
            <button onClick={onClose} className="secondary-btn">
              Close
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
