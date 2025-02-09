export interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  read: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  tags: string[];
  link: string;
  created_at: string;
  updated_at: string;
}

export interface Skill {
  id: string;
  category: string;
  name: string;
  proficiency: number;
  created_at: string;
}