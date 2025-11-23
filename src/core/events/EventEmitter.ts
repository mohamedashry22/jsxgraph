export type EventMap = Record<string, unknown>;

type Handler<Payload> = (payload: Payload) => void;

type HandlerSet<Payload> = Set<Handler<Payload>>;

export class EventEmitter<Events extends EventMap> {
  private handlers: Map<keyof Events, HandlerSet<Events[keyof Events]>> = new Map();

  on<EventName extends keyof Events>(event: EventName, handler: Handler<Events[EventName]>): () => void {
    const existing = this.handlers.get(event) as HandlerSet<Events[EventName]> | undefined;
    if (existing) {
      existing.add(handler);
    } else {
      this.handlers.set(event, new Set([handler]) as HandlerSet<Events[keyof Events]>);
    }

    return () => this.off(event, handler);
  }

  off<EventName extends keyof Events>(event: EventName, handler: Handler<Events[EventName]>): void {
    const existing = this.handlers.get(event) as HandlerSet<Events[EventName]> | undefined;
    if (!existing) {
      return;
    }
    existing.delete(handler);
    if (existing.size === 0) {
      this.handlers.delete(event);
    }
  }

  emit<EventName extends keyof Events>(event: EventName, payload: Events[EventName]): void {
    const existing = this.handlers.get(event) as HandlerSet<Events[EventName]> | undefined;
    if (!existing) {
      return;
    }
    existing.forEach((handler) => handler(payload));
  }

  clear(): void {
    this.handlers.clear();
  }
}
