export type Project = {
    id: number;
    name: string;
    summary: string;
    tech: string[];
    featured: boolean;
    finished: boolean;
    details?: string;
};