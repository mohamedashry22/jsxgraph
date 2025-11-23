import { EventEmitter, type EventMap } from '../events/EventEmitter';
import type { BoardElement } from '../elements/types';
import type { BoardRenderer, RendererSize } from '../renderers/Renderer';

export interface BoardConfig {
  container: HTMLElement;
  renderer: BoardRenderer;
  size?: RendererSize;
  name?: string;
}

interface BoardEvents extends EventMap {
  'element:add': BoardElement;
  'render:complete': { durationMs: number; timestamp: number; elementCount: number; boardName: string };
}

export class Board {
  private elements: BoardElement[] = [];
  private readonly events = new EventEmitter<BoardEvents>();
  private readonly renderer: BoardRenderer;
  private readonly container: HTMLElement;
  private readonly name: string;
  private size: RendererSize;

  constructor(config: BoardConfig) {
    const defaultSize = { width: 600, height: 400 };
    this.size = config.size ?? defaultSize;
    this.container = config.container;
    this.renderer = config.renderer;
    this.name = config.name ?? 'Unnamed Board';

    this.renderer.mount(this.container, this.size);
  }

  addElement(element: BoardElement): void {
    this.elements.push(element);
    this.events.emit('element:add', element);
    this.render();
  }

  getElements(): BoardElement[] {
    return [...this.elements];
  }

  clear(): void {
    this.elements = [];
    this.render();
  }

  resize(size: RendererSize): void {
    this.size = size;
    this.renderer.resize(size);
    this.render();
  }

  getSize(): RendererSize {
    return { ...this.size };
  }

  getName(): string {
    return this.name;
  }

  on<EventName extends keyof BoardEvents>(event: EventName, handler: (payload: BoardEvents[EventName]) => void): () => void {
    return this.events.on(event, handler);
  }

  destroy(): void {
    this.elements = [];
    this.events.clear();
    this.renderer.destroy();
  }

  private render(): void {
    const start = performance.now();
    this.renderer.draw(this.elements);
    const durationMs = performance.now() - start;
    this.events.emit('render:complete', {
      durationMs,
      timestamp: Date.now(),
      elementCount: this.elements.length,
      boardName: this.name,
    });
  }
}
