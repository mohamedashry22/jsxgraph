import type { BoardElement } from '../elements/types';
import { isPoint, isSegment } from '../elements/types';
import paper from 'paper';

export type RendererKind = 'canvas' | 'svg' | 'paper';

export interface RendererSize {
  width: number;
  height: number;
}

export interface BoardRenderer {
  readonly type: RendererKind;
  mount(container: HTMLElement, size: RendererSize): void;
  resize(size: RendererSize): void;
  draw(elements: BoardElement[]): void;
  destroy(): void;
}

export class CanvasRenderer implements BoardRenderer {
  readonly type = 'canvas' as const;
  private canvas: HTMLCanvasElement | null = null;
  private context: CanvasRenderingContext2D | null = null;
  private size: RendererSize = { width: 0, height: 0 };
  private background = '#0b1620';

  mount(container: HTMLElement, size: RendererSize): void {
    if (this.canvas) {
      return;
    }

    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.size = size;
    this.applySize();
    container.appendChild(this.canvas);
  }

  resize(size: RendererSize): void {
    this.size = size;
    this.applySize();
  }

  draw(elements: BoardElement[]): void {
    if (!this.context || !this.canvas) {
      return;
    }

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = this.background;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    elements.forEach((element) => {
      if (isPoint(element)) {
        this.drawPoint(element);
      } else if (isSegment(element)) {
        this.drawSegment(element);
      }
    });
  }

  destroy(): void {
    if (this.canvas && this.canvas.parentElement) {
      this.canvas.parentElement.removeChild(this.canvas);
    }
    this.canvas = null;
    this.context = null;
  }

  private applySize(): void {
    if (!this.canvas) {
      return;
    }
    this.canvas.width = this.size.width;
    this.canvas.height = this.size.height;
    this.canvas.style.width = `${this.size.width}px`;
    this.canvas.style.height = `${this.size.height}px`;
  }

  private drawPoint(element: BoardElement): void {
    if (!this.context || !isPoint(element)) {
      return;
    }
    const radius = element.radius ?? 5;
    this.context.fillStyle = element.color ?? '#ffffff';
    this.context.beginPath();
    this.context.arc(element.position.x, element.position.y, radius, 0, Math.PI * 2);
    this.context.fill();
  }

  private drawSegment(element: BoardElement): void {
    if (!this.context || !isSegment(element)) {
      return;
    }
    this.context.strokeStyle = element.color ?? '#ffffff';
    this.context.lineWidth = element.strokeWidth ?? 1;
    this.context.beginPath();
    this.context.moveTo(element.start.x, element.start.y);
    this.context.lineTo(element.end.x, element.end.y);
    this.context.stroke();
  }
}

export class SvgRenderer implements BoardRenderer {
  readonly type = 'svg' as const;
  private svg: SVGSVGElement | null = null;
  private size: RendererSize = { width: 0, height: 0 };

  mount(container: HTMLElement, size: RendererSize): void {
    if (this.svg) {
      return;
    }

    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.size = size;
    this.applySize();
    this.svg.setAttribute('viewBox', `0 0 ${size.width} ${size.height}`);
    this.svg.style.display = 'block';
    this.svg.style.background = '#05121c';
    container.appendChild(this.svg);
  }

  resize(size: RendererSize): void {
    this.size = size;
    this.applySize();
    if (this.svg) {
      this.svg.setAttribute('viewBox', `0 0 ${size.width} ${size.height}`);
    }
  }

  draw(elements: BoardElement[]): void {
    if (!this.svg) {
      return;
    }
    while (this.svg.firstChild) {
      this.svg.removeChild(this.svg.firstChild);
    }

    elements.forEach((element) => {
      if (isPoint(element)) {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', element.position.x.toString());
        circle.setAttribute('cy', element.position.y.toString());
        circle.setAttribute('r', (element.radius ?? 5).toString());
        circle.setAttribute('fill', element.color ?? '#ffffff');
        circle.setAttribute('opacity', '0.9');
        this.svg!.appendChild(circle);
      } else if (isSegment(element)) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', element.start.x.toString());
        line.setAttribute('y1', element.start.y.toString());
        line.setAttribute('x2', element.end.x.toString());
        line.setAttribute('y2', element.end.y.toString());
        line.setAttribute('stroke', element.color ?? '#ffffff');
        line.setAttribute('stroke-width', (element.strokeWidth ?? 1).toString());
        line.setAttribute('stroke-linecap', 'round');
        this.svg!.appendChild(line);
      }
    });
  }

  destroy(): void {
    if (this.svg && this.svg.parentElement) {
      this.svg.parentElement.removeChild(this.svg);
    }
    this.svg = null;
  }

  private applySize(): void {
    if (!this.svg) {
      return;
    }
    this.svg.setAttribute('width', `${this.size.width}`);
    this.svg.setAttribute('height', `${this.size.height}`);
    this.svg.style.width = `${this.size.width}px`;
    this.svg.style.height = `${this.size.height}px`;
  }
}

export class PaperRenderer implements BoardRenderer {
  readonly type = 'paper' as const;
  private canvas: HTMLCanvasElement | null = null;
  private scope: paper.PaperScope | null = null;
  private size: RendererSize = { width: 0, height: 0 };

  mount(container: HTMLElement, size: RendererSize): void {
    if (this.canvas) {
      return;
    }

    this.canvas = document.createElement('canvas');
    container.appendChild(this.canvas);

    this.scope = new paper.PaperScope();
    this.scope.setup(this.canvas);
    this.size = size;
    this.applySize();
  }

  resize(size: RendererSize): void {
    this.size = size;
    this.applySize();
  }

  draw(elements: BoardElement[]): void {
    if (!this.scope || !this.canvas) {
      return;
    }

    const layer = this.scope.project.activeLayer;
    layer.removeChildren();

    elements.forEach((element) => {
      if (isPoint(element)) {
        new this.scope!.Path.Circle({
          center: new this.scope!.Point(element.position.x, element.position.y),
          radius: element.radius ?? 5,
          fillColor: element.color ?? '#ffffff',
          opacity: 0.9,
        });
      } else if (isSegment(element)) {
        new this.scope!.Path.Line({
          from: new this.scope!.Point(element.start.x, element.start.y),
          to: new this.scope!.Point(element.end.x, element.end.y),
          strokeColor: element.color ?? '#ffffff',
          strokeWidth: element.strokeWidth ?? 1,
        });
      }
    });

    this.scope.view.update();
  }

  destroy(): void {
    if (this.canvas && this.canvas.parentElement) {
      this.canvas.parentElement.removeChild(this.canvas);
    }
    if (this.scope) {
      this.scope.project.clear();
    }
    this.canvas = null;
    this.scope = null;
  }

  private applySize(): void {
    if (!this.canvas) {
      return;
    }
    this.canvas.width = this.size.width;
    this.canvas.height = this.size.height;
    this.canvas.style.width = `${this.size.width}px`;
    this.canvas.style.height = `${this.size.height}px`;

    if (this.scope) {
      this.scope.view.viewSize = new this.scope.Size(this.size.width, this.size.height);
      this.scope.view.update();
    }
  }
}
