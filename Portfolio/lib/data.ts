export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: ("web" | "mobile" | "devops")[];
  demoUrl?: string;
  githubUrl?: string;
};

export type Skill = {
  name: string;
  level: number;
  category: "web" | "mobile" | "devops";
};

export type Experience = {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | "Present";
  description: string[];
  tags: string[];
};

export const projects: Project[] = [
  {
    id: "project-1",
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce platform built with Next.js, featuring product catalog, shopping cart, user authentication, and payment processing.",
    image: "https://images.pexels.com/photos/34577/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["web"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    id: "project-2",
    title: "Fitness Tracking App",
    description:
      "A cross-platform mobile application built with React Native that allows users to track workouts, set goals, and monitor progress over time.",
    image: "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["mobile"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    id: "project-3",
    title: "Cloud Infrastructure Automation",
    description:
      "A DevOps project using Terraform and Kubernetes to automate infrastructure provisioning and deployment for scalable microservices.",
    image: "https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["devops"],
    githubUrl: "https://github.com",
  },
  {
    id: "project-4",
    title: "Real-time Chat Application",
    description:
      "A real-time chat application built with React, Node.js, and Socket.io featuring private messaging, group chats, and file sharing.",
    image: "https://images.pexels.com/photos/4126743/pexels-photo-4126743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["web"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    id: "project-5",
    title: "Inventory Management System",
    description:
      "A comprehensive inventory management system with barcode scanning capabilities, built with Flutter for cross-platform deployment.",
    image: "https://images.pexels.com/photos/6169659/pexels-photo-6169659.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["mobile"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    id: "project-6",
    title: "CI/CD Pipeline Framework",
    description:
      "A customizable CI/CD pipeline framework using GitHub Actions, Docker, and AWS to automate testing and deployment workflows.",
    image: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["devops"],
    githubUrl: "https://github.com",
  },
];

export const skills: Skill[] = [
  // Web Development Skills
  { name: "HTML/CSS", level: 95, category: "web" },
  { name: "JavaScript", level: 90, category: "web" },
  { name: "TypeScript", level: 65, category: "web" },
  { name: "React", level: 90, category: "web" },
  { name: "Next.js", level: 75, category: "web" },
  { name: "Node.js", level: 80, category: "web" },
  { name: "Tailwind CSS", level: 90, category: "web" },
  
  // Mobile Development Skills
  { name: "React Native", level: 80, category: "mobile" },
  { name: "Flutter", level: 70, category: "mobile" },
  // { name: "iOS Development", level: 65, category: "mobile" },
  // { name: "Android Development", level: 65, category: "mobile" },
  // { name: "Mobile UI/UX", level: 80, category: "mobile" },
  // { name: "App Store Optimization", level: 75, category: "mobile" },
  
  // DevOps Skills
  { name: "Docker", level: 85, category: "devops" },
  { name: "Kubernetes", level: 80, category: "devops" },
  { name: "AWS", level: 80, category: "devops" },
  { name: "CI/CD", level: 85, category: "devops" },
  { name: "Terraform", level: 75, category: "devops" },
  { name: "Linux", level: 85, category: "devops" },
  { name: "Monitoring & Logging", level: 80, category: "devops" },

];

export const experiences: Experience[] = [
  {
    id: "exp-1",
    title: "Senior Full Stack Developer",
    company: "Tech Innovations Inc.",
    location: "San Francisco, CA",
    startDate: "Jan 2022",
    endDate: "Present",
    description: [
      "Lead developer for the company's flagship SaaS product, resulting in a 35% increase in user engagement",
      "Architected and implemented microservices infrastructure using Node.js and Docker",
      "Mentored junior developers and conducted code reviews to ensure code quality and best practices",
      "Implemented CI/CD pipelines that reduced deployment time by 60%"
    ],
    tags: ["React", "Node.js", "AWS", "Docker", "TypeScript"]
  },
  {
    id: "exp-2",
    title: "Mobile Application Developer",
    company: "AppWorks Studio",
    location: "Austin, TX",
    startDate: "Mar 2020",
    endDate: "Dec 2021",
    description: [
      "Developed and published 5 cross-platform mobile applications using React Native",
      "Integrated RESTful APIs and implemented offline-first data synchronization",
      "Optimized application performance, reducing load time by 40%",
      "Collaborated with UI/UX designers to implement pixel-perfect interfaces"
    ],
    tags: ["React Native", "JavaScript", "iOS", "Android", "Redux"]
  },
  {
    id: "exp-3",
    title: "Mobile Application Developer",
    company: "AppWorks Studio",
    location: "Austin, TX",
    startDate: "Mar 2020",
    endDate: "Dec 2021",
    description: [
      "Developed and published 5 cross-platform mobile applications using React Native",
      "Integrated RESTful APIs and implemented offline-first data synchronization",
      "Optimized application performance, reducing load time by 40%",
      "Collaborated with UI/UX designers to implement pixel-perfect interfaces"
    ],
    tags: ["React Native", "JavaScript", "iOS", "Android", "Redux"]
  },
 
];