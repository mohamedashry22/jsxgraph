import type { ReactNode } from 'react';

export const Code = ({ children }: { children: string }): ReactNode => (
  <pre className="lesson-code-block">{children.trim()}</pre>
);

export const Prose = ({ children }: { children: ReactNode }): ReactNode => <div className="lesson-stack">{children}</div>;
