export function runDemo(boardId: string, demoId: string, JXG: typeof import('jsxgraph')): void {
  const host = document.getElementById(boardId);
  if (!host) {
    return;
  }

  const jsxAny = JXG as any;
  if (jsxAny.boards?.[boardId]) {
    jsxAny.JSXGraph.freeBoard(jsxAny.boards[boardId]);
  }

  try {
    switch (demoId) {
      case 'demo-install': {
        const board = JXG.JSXGraph.initBoard(boardId, {
          boundingbox: [-5, 5, 5, -5],
          axis: true,
          showCopyright: false,
          pan: { enabled: true },
          zoom: { enabled: true },
        } as any);
        const p1 = board.create('point', [-2, 2], { name: 'A', size: 4, color: '#0074D9' });
        const p2 = board.create('point', [2, -1], { name: 'B', size: 4, color: '#0074D9' });
        board.create('line', [p1, p2], { strokeColor: '#2ECC40', strokeWidth: 3 });
        board.create('text', [-4, 4, 'Standard SVG Board'], { fontSize: 16 });
        break;
      }
      case 'demo-intro':
      case 'demo-competitors': {
        const board = JXG.JSXGraph.initBoard(boardId, {
          boundingbox: [-2, 10, 12, -2],
          axis: true,
          showCopyright: false,
        } as any);
        const line = board.create('line', [[0, 0], [8, 8]], { strokeColor: '#aaa' });
        const pIndependent = board.create('point', [2, 6], { name: 'Drag Me' });
        board.create('perpendicular', [line, pIndependent], { strokeColor: 'red', strokeWidth: 2, dash: 2 });
        board.create('text', [1, 9, 'Geometry Engine: Red line stays perpendicular'], { color: 'red' });
        break;
      }
      case 'demo-stress-test': {
        const board = JXG.JSXGraph.initBoard(boardId, {
          boundingbox: [-10, 10, 10, -10],
          axis: true,
          showCopyright: false,
          renderer: 'canvas',
        } as any);
        board.suspendUpdate();
        const center = board.create('point', [0, 0], { fixed: true, name: 'Origin', size: 1 });
        for (let i = 0; i < 500; i += 1) {
          const x = Math.random() * 18 - 9;
          const y = Math.random() * 18 - 9;
          const point = board.create('point', [x, y], {
            size: 2,
            withLabel: false,
            color: 'rgba(0,0,255,0.3)',
          });
          if (i % 5 === 0) {
            board.create('line', [center, point], { strokeWidth: 0.5, strokeColor: '#ccc' });
          }
        }
        board.unsuspendUpdate();
        board.create('text', [-8, 8, 'Canvas Renderer: 500 Points'], { fontSize: 15 });
        break;
      }
      case 'demo-suspend': {
        const board = JXG.JSXGraph.initBoard(boardId, {
          boundingbox: [-10, 10, 10, -10],
          axis: true,
          showCopyright: false,
        } as any);
        board.suspendUpdate();
        for (let i = 0; i < 50; i += 1) {
          board.create('circle', [[Math.random() * 10 - 5, Math.random() * 10 - 5], Math.random()], {
            fillColor: 'yellow',
            fillOpacity: 0.1,
            strokeColor: 'orange',
          });
        }
        board.unsuspendUpdate();
        board.create('text', [-5, 8, 'Used suspendUpdate() for instant load'], { fontSize: 14 });
        break;
      }
      case 'demo-hybrid-interaction': {
        const board = JXG.JSXGraph.initBoard(boardId, {
          boundingbox: [-2, 2, 8, -2],
          axis: true,
          showCopyright: false,
        } as any);
    const slider = board.create('slider', [[0, 1.5], [5, 1.5], [0, 5, 10]], { name: 'Freq' }) as any;
        board.create(
          'functiongraph',
          [
            (x: number) => Math.sin(x * slider.Value()),
          ],
          { strokeColor: 'purple', strokeWidth: 3 }
        );
        board.create('text', [0, -1.5, 'Move slider to update Math.sin(x * freq)'], { fixed: true });
        break;
      }
      case 'demo-calculus': {
        const board = JXG.JSXGraph.initBoard(boardId, {
          boundingbox: [-4, 10, 8, -2],
          axis: true,
          showCopyright: false,
        } as any);
        const func = board.create('functiongraph', [(x: number) => 0.2 * x * x + 1], { strokeColor: 'black' });
        const sEnd = board.create('slider', [[-3, 9], [2, 9], [0, 4, 6]], { name: 'End' }) as any;
        const sRects = board.create('slider', [[-3, 8], [2, 8], [1, 10, 50]], { name: 'Rects', precision: 0 }) as any;
        const riemann = board.create(
          'riemannsum',
          [
            func,
            () => sRects.Value(),
            'middle',
            0,
            () => sEnd.Value(),
          ],
          {
            fillColor: '#ffff00',
            fillOpacity: 0.3,
          }
        );
        board.create('text', [-3, 6, () => `Area ≈ ${riemann.Value().toFixed(4)}`], { fontSize: 18 });
        break;
      }
      case 'demo-hybrid-mix': {
        const board = JXG.JSXGraph.initBoard(boardId, {
          boundingbox: [-5, 5, 5, -5],
          axis: true,
          showCopyright: false,
        });
        const a = board.create('point', [-2, -1], { name: 'A', size: 3, color: '#4dabf7' });
        const b = board.create('point', [3, 2], { name: 'B', size: 3, color: '#f59f00' });
        board.create('line', [a, b], { strokeColor: '#748ffc', strokeWidth: 2 });
        board.create('circle', [a, 2], { strokeColor: '#51cf66', strokeWidth: 2 });

        host.querySelectorAll('canvas.hybrid-overlay').forEach((el) => el.remove());
        const overlay = document.createElement('canvas');
        overlay.className = 'hybrid-overlay';
        overlay.width = (host as HTMLDivElement).clientWidth;
        overlay.height = (host as HTMLDivElement).clientHeight;
        overlay.style.position = 'absolute';
        overlay.style.inset = '0';
        overlay.style.pointerEvents = 'none';
        overlay.style.mixBlendMode = 'screen';
        (host as HTMLDivElement).appendChild(overlay);

        const ctx = overlay.getContext('2d');
        if (ctx) {
          const particles = Array.from({ length: 80 }).map(() => ({
            x: Math.random() * overlay.width,
            y: Math.random() * overlay.height,
            r: Math.random() * 2 + 1,
            dx: (Math.random() - 0.5) * 0.8,
            dy: (Math.random() - 0.5) * 0.8,
          }));

          const renderParticles = (): void => {
            ctx.clearRect(0, 0, overlay.width, overlay.height);
            ctx.fillStyle = 'rgba(80, 180, 255, 0.35)';
            particles.forEach((p) => {
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
              ctx.fill();
              p.x += p.dx;
              p.y += p.dy;
              if (p.x < 0 || p.x > overlay.width) p.dx *= -1;
              if (p.y < 0 || p.y > overlay.height) p.dy *= -1;
            });
            requestAnimationFrame(renderParticles);
          };
          renderParticles();
        }
        break;
      }
      case 'demo-grid': {
        const board = JXG.JSXGraph.initBoard(boardId, {
          boundingbox: [-6, 6, 6, -6],
          axis: true,
          showCopyright: false,
        });
        board.suspendUpdate();
        for (let x = -5; x <= 5; x += 1) {
          for (let y = -5; y <= 5; y += 1) {
            board.create('point', [x, y], { withLabel: false, size: 2, color: '#748ffc' });
          }
        }
        board.unsuspendUpdate();
        board.create('text', [-5.5, 5.5, 'Grid of 121 points (SVG)'], { fontSize: 14 });
        break;
      }
      default:
        break;
    }
  } catch (error) {
    console.error('Error creating board', error);
  }
}
