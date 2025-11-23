import { useEffect, useState } from 'react';

type JXGModule = typeof import('jsxgraph');

export function useJSXGraph(): JXGModule | null {
  const [module, setModule] = useState<JXGModule | null>(() => (window.JXG as JXGModule | undefined) ?? null);

  useEffect(() => {
    if (module) {
      return;
    }
    let mounted = true;

    const setFromWindow = (): void => {
      const ready = (window.JXG as JXGModule | undefined) ?? null;
      if (ready && mounted) {
        setModule(ready);
      }
    };

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/jsxgraph@1.6.2/distrib/jsxgraphcore.js';
    script.async = true;
    script.addEventListener('load', setFromWindow);
    script.addEventListener('error', () => {
      void import('jsxgraph')
        .then((imported) => {
          if (!mounted) return;
          const jxg = (imported.default ?? imported) as JXGModule;
          window.JXG = jxg;
          setModule(jxg);
        })
        .catch((error) => console.error('Failed to load JSXGraph', error));
    });

    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = 'https://cdn.jsdelivr.net/npm/jsxgraph@1.6.2/distrib/jsxgraph.css';

    document.head.append(stylesheet, script);

    return () => {
      mounted = false;
      script.removeEventListener('load', setFromWindow);
    };
  }, [module]);

  return module;
}
