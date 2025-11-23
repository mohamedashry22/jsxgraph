import type { JXG as JSXGraphType } from 'jsxgraph';

declare global {
  interface Window {
    JXG?: typeof JSXGraphType;
  }
}

export {};
