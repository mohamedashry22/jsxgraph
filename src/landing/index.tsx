import { createRoot } from 'react-dom/client';
import { LandingApp } from './LandingApp';

export function mountLanding(root: HTMLDivElement): void {
  root.innerHTML = '';
  const reactRoot = createRoot(root);
  reactRoot.render(<LandingApp />);
}
