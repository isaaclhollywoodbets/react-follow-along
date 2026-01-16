// src/data/projects.ts

export type Project = {
  id: number;
  name: string;
  summary: string;
  tech: string[];
  featured: boolean;
};

export const projects: Project[] = [
  {
    id: 1,
    name: 'Payments API',
    summary: 'REST API for processing card and EFT payments.',
    tech: ['C#', 'SQL'],
    featured: true,
  },
  {
    id: 2,
    name: 'Admin Dashboard',
    summary: 'Internal dashboard for admin users to view reports.',
    tech: ['Blazor'],
    featured: false,
  },
  {
    id: 3,
    name: 'Portfolio',
    summary: 'Personal portfolio built with React.',
    tech: ['React', 'TypeScript', 'Vite'],
    featured: true,
  },
];