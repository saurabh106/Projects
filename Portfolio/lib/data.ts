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
    title: "Futureflow",
    description:
      "An AI-powered career development platform that helps professionals advance their careers using intelligent tools, automation, and industry-specific insights. Includes features like AI resume builder, cover letter generator, mock interviews, real-time industry insights, and performance tracking.",
    image:
      "https://res.cloudinary.com/dvokkd6iy/image/upload/v1751203467/futureflow_v4rkgm.png",
    tags: [ "web"],
    demoUrl: "https://futureflow-six.vercel.app/", 
    githubUrl: "https://github.com/saurabh106/Projects/tree/main/futureflow",
  },
   {
    id: "project-2",
    title: "Real-time Chat Application",
    description:
      "A real-time chat application developed using the MERN stack (MongoDB, Express.js, React, Node.js), supporting user authentication, private messaging, and socket-based communication.",
    image:
      "https://res.cloudinary.com/dvokkd6iy/image/upload/v1751203691/chat_sulbiw.png",
    tags: ["web"],
    demoUrl: "https://chat-app-xs8y.onrender.com", 
    githubUrl: "https://github.com/saurabh106/Projects/tree/main/Chat-App", 
  },
 {
    id: "project-3",
    title: "Imaginify",
    description:
      "A web application for image manipulation including resizing and background removal, powered by Cloudinary API integration. Users can upload images, adjust dimensions, and remove backgrounds with a simple UI.",
    image:
      "https://res.cloudinary.com/dvokkd6iy/image/upload/v1751204087/imaginify_geri4v.png",
    tags: ["web"],
    demoUrl: "https://imaginify-rho-ruddy.vercel.app/", 
    githubUrl: "https://github.com/saurabh106/Projects/tree/main/imaginify", 
  },
    {
    id: "project-4",
    title: "AI Video Generator",
    description:
      "An AI-powered tool that generates a video based on user input. It uses AI to create a sequence of images from a prompt and compiles them into a smooth video, perfect for content creators and storytelling.",
    image:
      "https://res.cloudinary.com/dvokkd6iy/image/upload/v1751205671/ai_o3lf2s.png",
    tags: [ "web"],
    demoUrl: "https://aigenerateshortvideos.vercel.app/", 
    githubUrl: "https://github.com/saurabh106/Projects/tree/main/AI-Short-video/ai-video", 
  },
  {
    id: "project-5",
    title: "Bharat Socials (Team Project)",
    description:
      "Bharat Socials is a mobile application built to solve real-world . A platform for Universities ,NSS and NGOs",
    image:
      "https://res.cloudinary.com/dvokkd6iy/image/upload/v1751204912/bs_kwhd5t.png",
    tags: ["mobile"],
    // demoUrl: "https://example.com", // Replace with actual URL
    githubUrl: "https://play.google.com/store/apps/details?id=com.bharatsocials.app", 
  },
{
  id: "project-6",
  title: "CI/CD Pipeline Framework",
  description:
    "A customizable CI/CD pipeline framework using GitHub Actions, Docker, and AWS to automate testing and deployment workflows. Supports monorepo deployment to virtual machines using Docker for streamlined production delivery.",
  image:
    "https://res.cloudinary.com/dvokkd6iy/image/upload/v1751205448/devops_image_ccokti.png",
  tags: ["devops"],
  githubUrl: "https://github.com/saurabh106/Monorepo-deploy-docker-VM", 
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
  { name: "React Native", level: 70, category: "mobile" },
  { name: "Flutter", level: 60, category: "mobile" },
  // { name: "iOS Development", level: 65, category: "mobile" },
  // { name: "Android Development", level: 65, category: "mobile" },
  // { name: "Mobile UI/UX", level: 80, category: "mobile" },
  // { name: "App Store Optimization", level: 75, category: "mobile" },
  
  // DevOps Skills
  { name: "Docker", level: 85, category: "devops" },
  { name: "Kubernetes", level: 80, category: "devops" },
  { name: "AWS", level: 80, category: "devops" },
  { name: "CI/CD", level: 85, category: "devops" },
  // { name: "Terraform", level: 75, category: "devops" },
  { name: "Linux", level: 85, category: "devops" },
  { name: "Monitoring & Logging", level: 80, category: "devops" },

];

export const experiences: Experience[] = [
{
  id: "exp-1",
  title: "Web Development Intern",
  company: "Zoblik International",
  location: "", // You can add a location if desired
  startDate: "Dec 2024",
  endDate: "June 2025",
  description: [
    "Created responsive web pages using HTML5, CSS3, JavaScript, and React.js",
    "Integrated RESTful APIs; handled async data with Axios and Fetch API",
    "Oversaw full SDLC from requirement gathering to deployment"
  ],
  tags: ["HTML5", "CSS3", "JavaScript", "React.js", "REST API"]
}
,
{
  id: "exp-3",
  title: "Freelance Full Stack Developer",
  company: "Self-employed",
  location: "", // Optional: add location if relevant
  startDate: "Jun 2025",
  endDate: "Present",
  description: [
    "Building a full-stack project independently to deepen practical development skills",
    "Learning and applying DevOps practices including CI/CD, containerization, and infrastructure as code",
    "Working with cloud services and deployment pipelines to enhance system scalability and reliability"
  ],
  tags: ["Full Stack", "DevOps", "CI/CD", "Docker", "AWS", "React", "Node.js"]
}
,
  // {
  //   id: "exp-3",
  //   title: "Mobile Application Developer",
  //   company: "AppWorks Studio",
  //   location: "Austin, TX",
  //   startDate: "Mar 2020",
  //   endDate: "Dec 2021",
  //   description: [
  //     "Developed and published 5 cross-platform mobile applications using React Native",
  //     "Integrated RESTful APIs and implemented offline-first data synchronization",
  //     "Optimized application performance, reducing load time by 40%",
  //     "Collaborated with UI/UX designers to implement pixel-perfect interfaces"
  //   ],
  //   tags: ["React Native", "JavaScript", "iOS", "Android", "Redux"]
  // },
 
];