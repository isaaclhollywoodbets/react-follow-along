export type ApiProject = {
  id: number;
  name: string;
  summary?: string | null;
  featured: boolean;
  finished: boolean;
  details?: string | null;
  tech: string[];

}