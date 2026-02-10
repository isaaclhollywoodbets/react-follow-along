export type Project = {
    id: number;
    name: string;
    summary: string;
    tech: string[];
    featured: boolean;
    finished: boolean;
    details?: string;
};

export const projects: Project[] = [
    {
        id: 1,
        name: 'Payments API',
        summary: 'REST API for processing card and EFT payments.',
        tech: ['C#', 'SQL'],
        featured: false,
        finished: false,
        // details: 'Supports multiple payment providers and idempotent operations.',
    },
    {
        id: 2,
        name: 'Admin Dashboard',
        summary: 'Internal dashboard for admin users to view reports.',
        tech: ['Blazor'],
        featured: false,
        finished: true,
        details: 'Includes role-based access control and audit logging.',
    },
    {
        id: 3,
        name: 'Portfolio',
        summary: 'Personal portfolio built with React.',
        tech: ['React', 'TypeScript', 'Vite'],
        featured: true,
        finished: true,
        details: 'Responsive layout, project filtering, and contact form.',
    },
]