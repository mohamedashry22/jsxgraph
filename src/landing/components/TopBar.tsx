import { type JSX } from 'react';
import { Menu, Play, FileDown } from 'lucide-react';
import { exportAppToPdf } from '../utils/pdf';

interface TopBarProps {
  sidebarOpen: boolean;
  onToggleSidebar: (next: boolean) => void;
  onLaunchPlayground: () => void;
}

export function TopBar({ sidebarOpen, onToggleSidebar, onLaunchPlayground }: TopBarProps): JSX.Element {
  return (
    <header className="landing-topbar">
      {!sidebarOpen && (
        <button className="icon-button" onClick={() => onToggleSidebar(true)} aria-label="Show sidebar">
          <Menu size={20} />
        </button>
      )}
      <div className="topbar-info">
        <span>TSXGraph Knowledge Base</span>
        <strong>Mastering JSXGraph</strong>
      </div>
      <div className="topbar-actions">
        <button className="ghost-btn" onClick={onLaunchPlayground}>
          <Play size={14} />
          Open Playground
        </button>
        <button className="ghost-btn" onClick={() => void exportAppToPdf()}>
          <FileDown size={14} />
          Export PDF
        </button>
      </div>
    </header>
  );
}
