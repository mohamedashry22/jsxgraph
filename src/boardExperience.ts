import './style.css';
import './styles/jsxgraph.css';
import JXG from 'jsxgraph';
import { Board } from './core/board/Board';
import { CanvasRenderer, PaperRenderer, SvgRenderer, type BoardRenderer, type RendererKind } from './core/renderers/Renderer';
import { createPoint, createSegment } from './core/elements/factories';
import { createRandomPoint, createRandomSegment } from './demos/randomElements';
import { StatsTracker } from './core/telemetry/StatsTracker';
import { runBenchmark } from './demos/benchmarkRunner';

interface ExperienceDeps {
  boardHost: HTMLDivElement;
  statsContainer: HTMLDivElement;
  logContainer: HTMLPreElement;
  rendererSelect: HTMLSelectElement;
  benchmarkSummary: HTMLDivElement;
  addPointBtn: HTMLButtonElement | null;
  addSegmentBtn: HTMLButtonElement | null;
  resetBtn: HTMLButtonElement | null;
  benchmarkBtn: HTMLButtonElement | null;
  jsxGraphContainer: HTMLDivElement | null;
}

export function initBoardExperience(app: HTMLDivElement): void {
  app.innerHTML = boardTemplate();

  const deps = hydrateDom(app);
  const boardWidth = 720;
  const boardHeight = 480;
  const statsTracker = new StatsTracker();
  const rendererFactories: Record<RendererKind, () => BoardRenderer> = {
    canvas: () => new CanvasRenderer(),
    svg: () => new SvgRenderer(),
    paper: () => new PaperRenderer(),
  };

  let board: Board | null = null;
  let subscriptions: Array<() => void> = [];
  let logBuffer: string[] = [];
  let currentRenderer: RendererKind = 'canvas';

  attachBoard(currentRenderer);
  setupJsxGraphBoard();
  wireUiEvents();

  function createRenderer(kind: RendererKind): BoardRenderer {
    return rendererFactories[kind]();
  }

  function appendLog(entry: string): void {
    const timestamp = new Date().toLocaleTimeString();
    logBuffer = [`[${timestamp}] ${entry}`, ...logBuffer].slice(0, 14);
    deps.logContainer.textContent = logBuffer.join('\n');
  }

  function attachBoard(kind: RendererKind): void {
    deps.boardHost.innerHTML = '';
    board?.destroy();
    subscriptions.forEach((off) => off());
    subscriptions = [];
    statsTracker.reset();
    logBuffer = [];
    deps.logContainer.textContent = '';
    deps.benchmarkSummary.textContent = '';

    const renderer = createRenderer(kind);
    board = new Board({
      container: deps.boardHost,
      renderer,
      size: { width: boardWidth, height: boardHeight },
      name: `${kind.toUpperCase()} Board`,
    });

    currentRenderer = kind;
    deps.rendererSelect.value = kind;
    wireBoardEvents(board);
    seedBoard(board);
  }

  function wireBoardEvents(activeBoard: Board): void {
    subscriptions.forEach((off) => off());
    subscriptions = [];

    subscriptions.push(
      activeBoard.on('element:add', (element) => {
        appendLog(`Element added: ${element.kind} (${element.id}) on ${activeBoard.getName()}`);
      }),
      activeBoard.on('render:complete', (payload) => {
        const stats = statsTracker.record(payload);
        deps.statsContainer.innerHTML = `
          <div class="stat-line"><span>Board</span><strong>${payload.boardName}</strong></div>
          <div class="stat-line"><span>Last render</span><strong>${stats.lastDuration.toFixed(2)} ms</strong></div>
          <div class="stat-line"><span>Avg render</span><strong>${stats.averageDuration.toFixed(2)} ms</strong></div>
          <div class="stat-line"><span>Min / Max</span><strong>${stats.minDuration.toFixed(2)} / ${stats.maxDuration.toFixed(2)} ms</strong></div>
          <div class="stat-line"><span>Approx. FPS</span><strong>${stats.approximateFps.toFixed(1)}</strong></div>
          <div class="stat-line"><span>Elements</span><strong>${payload.elementCount}</strong></div>
          <div class="stat-line"><span>Sample window</span><strong>${stats.sampleCount}</strong></div>
        `;
      })
    );
  }

  function seedBoard(activeBoard: Board): void {
    activeBoard.addElement(createSegment({ x: 40, y: boardHeight - 40 }, { x: boardWidth - 40, y: boardHeight - 40 }, '#495057'));
    activeBoard.addElement(createSegment({ x: 60, y: boardHeight - 60 }, { x: boardWidth - 60, y: 80 }, '#228be6'));
    activeBoard.addElement(createPoint(boardWidth / 2, boardHeight / 2, '#fab005'));
  }

  function wireUiEvents(): void {
    deps.addPointBtn?.addEventListener('click', () => {
      board?.addElement(createRandomPoint(boardWidth, boardHeight));
    });

    deps.addSegmentBtn?.addEventListener('click', () => {
      board?.addElement(createRandomSegment(boardWidth, boardHeight));
    });

    deps.resetBtn?.addEventListener('click', () => {
      if (!board) {
        return;
      }
      board.clear();
      seedBoard(board);
      appendLog('Board reset');
    });

    deps.rendererSelect.addEventListener('change', (event) => {
      const next = (event.target as HTMLSelectElement).value as RendererKind;
      attachBoard(next);
      appendLog(`Switched renderer to ${next.toUpperCase()}`);
    });

    deps.benchmarkBtn?.addEventListener('click', () => {
      if (!board) {
        return;
      }
      const result = runBenchmark(board, {
        boardSize: { width: boardWidth, height: boardHeight },
        iterations: 40,
      });
      deps.benchmarkSummary.innerHTML = `
        <div class="stat-line"><span>Renderer</span><strong>${currentRenderer.toUpperCase()}</strong></div>
        <div class="stat-line"><span>Samples</span><strong>${result.summary.sampleCount}</strong></div>
        <div class="stat-line"><span>Average</span><strong>${result.summary.average.toFixed(2)} ms</strong></div>
        <div class="stat-line"><span>Min / Max</span><strong>${result.summary.min.toFixed(2)} / ${result.summary.max.toFixed(2)} ms</strong></div>
      `;
      appendLog(`Benchmark completed – avg ${result.summary.average.toFixed(2)}ms over ${result.summary.sampleCount} samples`);
      seedBoard(board);
    });
  }

  function setupJsxGraphBoard(): void {
    if (!deps.jsxGraphContainer) {
      return;
    }
    deps.jsxGraphContainer.classList.add('jxgbox');
    deps.jsxGraphContainer.style.width = '480px';
    deps.jsxGraphContainer.style.height = '360px';

    const jsxBoard = JXG.JSXGraph.initBoard(deps.jsxGraphContainer.id, {
      boundingbox: [-5, 5, 5, -5],
      axis: true,
      showNavigation: false,
      showCopyright: false,
    });

    jsxBoard.create('point', [0, 0], { name: 'A', size: 4, color: '#f03e3e' });
    jsxBoard.create('point', [2, 3], { name: 'B', size: 4, color: '#15aabf' });
    jsxBoard.create('line', ['A', 'B'], { strokeWidth: 2, color: '#4dabf7' });
  }
}

function hydrateDom(app: HTMLDivElement): ExperienceDeps {
  return {
    boardHost: getRequiredElement(app, '#board-host'),
    statsContainer: getRequiredElement(app, '#stats'),
    logContainer: getRequiredElement(app, '#event-log'),
    rendererSelect: getRequiredElement(app, '#renderer-select'),
    benchmarkSummary: getRequiredElement(app, '#benchmark-summary'),
    addPointBtn: app.querySelector('#add-point'),
    addSegmentBtn: app.querySelector('#add-segment'),
    resetBtn: app.querySelector('#reset-board'),
    benchmarkBtn: app.querySelector('#benchmark'),
    jsxGraphContainer: app.querySelector('#jsxgraph-board'),
  };
}

function getRequiredElement<ElementType extends Element>(root: ParentNode, selector: string): ElementType {
  const element = root.querySelector<ElementType>(selector);
  if (!element) {
    throw new Error(`Element not found: ${selector}`);
  }
  return element;
}

function boardTemplate(): string {
  return `
    <main class="layout">
      <section class="board-panel">
        <header>
          <h1>TSXGraph R&D Board</h1>
          <p class="subtitle">Switch renderers, add elements, and benchmark performance.</p>
        </header>
        <div class="renderer-controls">
          <label for="renderer-select">Renderer</label>
          <select id="renderer-select">
            <option value="canvas">Canvas</option>
            <option value="svg">SVG</option>
            <option value="paper">Paper.js</option>
          </select>
          <button id="benchmark" type="button">Run Benchmark</button>
        </div>
        <div id="board-host" class="board-host" aria-label="graph board"></div>
        <div class="controls">
          <button id="add-point" type="button">Add Random Point</button>
          <button id="add-segment" type="button">Add Random Segment</button>
          <button id="reset-board" type="button">Reset Board</button>
        </div>
        <div id="benchmark-summary" class="stats"></div>
      </section>
      <aside class="telemetry">
        <h2>Render Telemetry</h2>
        <div id="stats" class="stats"></div>
        <h3>Event Log</h3>
        <pre id="event-log" class="event-log"></pre>
      </aside>
    </main>
    <section class="comparison">
      <div>
        <h2>Official JSXGraph Reference</h2>
        <p class="subtitle">Live board powered by the upstream library for side-by-side comparison.</p>
        <div id="jsxgraph-board" class="jsxgraph-board"></div>
      </div>
    </section>
  `;
}
