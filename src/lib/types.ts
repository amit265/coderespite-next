export interface Note {
  slug: string;
  title: string;
  date: string;
  [key: string]: any;
}

export interface Project {
  id: string;
  title: string;
  path: string;
  live: string;
  github: string;
  image: string;
  description: string;
  appleStore?: string | null;
}

export interface ProjectsData {
  mobile?: Project[];
  react?: Project[];
  javascript?: Project[];
  responsive?: Project[];
  next?: Project[];
}
