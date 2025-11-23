const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('Root container #app was not found.');
}

const params = new URLSearchParams(window.location.search);
const view = params.get('view');

void bootstrap(app, view);

async function bootstrap(root: HTMLDivElement, selectedView: string | null): Promise<void> {
  if (selectedView === 'playground') {
    const { initBoardExperience } = await import('./boardExperience');
    initBoardExperience(root);
    return;
  }

  const { mountLanding } = await import('./landing');
  mountLanding(root);
}
