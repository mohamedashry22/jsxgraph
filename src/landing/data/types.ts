import type { ReactNode } from 'react';

export interface Lesson {
  id: string;
  title: string;
  type: 'text';
  content: ReactNode;
  demoId: string;
}

export interface CourseModule {
  id: string;
  title: string;
  lessons: Lesson[];
}
