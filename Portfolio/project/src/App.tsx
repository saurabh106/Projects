import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Code, User, Mail, Menu, X, Github, Linkedin, ExternalLink, FileText, GraduationCap, BriefcaseIcon } from 'lucide-react';
import axios from 'axios';
import React, { useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';

const globalStyles = `
  html {
    scroll-behavior: smooth;
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #1f2937;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: #4c1d95;
    border-radius: 10px;
    transition: all 0.3s ease;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #6d28d9;
  }

  * {
    scrollbar-width: thin;
    scrollbar-color: #4c1d95 #1f2937;
  }

  /* Add smooth scrolling to all elements */
  * {
    scroll-behavior: smooth;
    scroll-margin-top: 100px;
  }

  /* Add smooth transition for all scrollable elements */
  .scrollable {
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    transition: all 0.3s ease;
  }
`;

const Navigation = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isWorkDropdownOpen, setIsWorkDropdownOpen] = React.useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Adjust this value based on your header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Close any open menu or actions after scrolling
      setIsOpen(false);
      setIsWorkDropdownOpen(false);
    }
  };
  

  const workItems = [
    { 
      label: 'Experience', 
      id: 'experience',
      link: 'https://drive.google.com/file/d/your-experience-file-id/view?usp=sharing',
      icon: BriefcaseIcon
    },
    { 
      label: 'Education', 
      id: 'education',
      link: 'https://docs.google.com/document/d/1U3gdAYBHtB-lRYts9TCBdADRxoCUhXP_x9_ZLLOinzE/edit?tab=t.0',
      icon: GraduationCap
    }
  ];

  const navItems = [
    { icon: User, label: 'About', id: 'about' },
    { icon: Briefcase, label: 'Projects', id: 'projects' },
    { icon: Code, label: 'Skills', id: 'skills' },
    { icon: Mail, label: 'Contact', id: 'contact' },
  ];

  const handleResumeClick = () => {
    // Replace with your actual Google Drive shared link
    const driveLink = 'https://docs.google.com/document/d/1EvcmYm70W-m412ZM1Scl6feryzX-Pi3PJw4kKMVx8bY/edit?tab=t.0';
    window.open(driveLink, '_blank');
  };
  

  return (
    <header className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50">
      
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.a
            href="/"
            className="text-2xl font-bold text-gray-800 dark:text-white"
            whileHover={{ scale: 1.05 }}
          >
            Portfolio
          </motion.a>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(({ icon: Icon, label, id }) => (
              <motion.button
                key={id}
                onClick={() => scrollToSection(id)}
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                whileHover={{ scale: 1.05 }}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </motion.button>
            ))}

            {/* Work Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsWorkDropdownOpen(true)}
              onMouseLeave={() => setIsWorkDropdownOpen(false)}
            >
              <motion.button
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                whileHover={{ scale: 1.05 }}
              >
                <Briefcase className="w-4 h-4" />
                <span>Work</span>
              </motion.button>
              
              <AnimatePresence>
                {isWorkDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-2 border border-gray-100 dark:border-gray-700"
                  >
                    {workItems.map((item, index) => (
                      <React.Fragment key={item.id}>
                        <motion.a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors duration-150"
                          whileHover={{ x: 5 }}
                        >
                          <item.icon className="w-4 h-4 mr-3 text-purple-500 dark:text-purple-400" />
                          <div className="flex flex-col">
                            <span className="font-medium">{item.label}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">View details →</span>
                          </div>
                        </motion.a>
                        {index < workItems.length - 1 && (
                          <div className="h-px bg-gray-100 dark:bg-gray-700 my-1" />
                        )}
                      </React.Fragment>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              onClick={handleResumeClick}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <FileText className="w-4 h-4" />
              <span>Resume</span>
            </motion.button>
            {/* <ThemeToggle /> */}
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4"
            >
              {navItems.map(({ icon: Icon, label, id }) => (
                <motion.button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className="flex items-center space-x-2 py-2 w-full text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  whileHover={{ scale: 1.05 }}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </motion.button>
              ))}

              {/* Mobile Work Dropdown */}
              <div className="py-2">
                <motion.button
                  onClick={() => setIsWorkDropdownOpen(!isWorkDropdownOpen)}
                  className="flex items-center space-x-2 py-2 w-full text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  whileHover={{ scale: 1.05 }}
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Work</span>
                </motion.button>
                
                <AnimatePresence>
                  {isWorkDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 mt-2 space-y-1"
                    >
                      {workItems.map((item, index) => (
                        <React.Fragment key={item.id}>
                          <motion.a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center py-2 text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-150"
                            whileHover={{ x: 5 }}
                          >
                            <item.icon className="w-4 h-4 mr-3 text-purple-500 dark:text-purple-400" />
                            <div className="flex flex-col">
                              <span className="font-medium">{item.label}</span>
                              <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">View details →</span>
                            </div>
                          </motion.a>
                          {index < workItems.length - 1 && (
                            <div className="h-px bg-gray-100 dark:bg-gray-700 my-1" />
                          )}
                        </React.Fragment>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <motion.button
                onClick={handleResumeClick}
                className="flex items-center space-x-2 py-2 w-full text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
                whileHover={{ scale: 1.05 }}
              >
                <FileText className="w-4 h-4" />
                <span>Resume</span>
              </motion.button>
              {/* <div className="py-2">
                <ThemeToggle />
              </div> */}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

const HeroSection = () => {
  const headingText = "Web/App Developer";
  const subheadingText = "The work to reaching delightful experiences.";

  return (
    <section 
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 to-gray-900/80 dark:from-gray-900/90 dark:to-gray-800/90" />
      
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-24 text-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6"
        >
          {headingText.split("").map((letter, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.1,
                duration: 0.5,
              }}
              className={letter === ' ' ? 'inline-block px-1 sm:px-2' : 'inline-block'}
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-gray-200 mb-8 sm:mb-12 max-w-2xl mx-auto"
        >
          {subheadingText.split("").map((letter, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: (index + headingText.length) * 0.1,
                duration: 0.5,
              }}
              className={letter === ' ' ? 'inline-block px-0.5 sm:px-1' : 'inline-block'}
            >
              {letter}
            </motion.span>
          ))}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <a
            href="#contact"
            className="inline-block bg-purple-600 text-white px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg font-medium rounded-full hover:bg-purple-700 transition-colors shadow-lg hover:shadow-purple-500/25"
          >
            Let's work together
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img
                src="/src/assets/Saurabh.jpg"
                alt="Profile"
                className="rounded-lg shadow-lg"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
               As a Computer Science student, I am passionate about building dynamic, scalable web applications. Currently, I am honing my skills in full-stack web development with a focus on the MERN stack (MongoDB, Express.js, React.js, and Node.js). My journey involves mastering both frontend and backend technologies, leveraging libraries and frameworks to create seamless user experiences. I am excited to contribute to innovative projects and grow as a developer.
              </p>
              <div className="flex space-x-4">
                <motion.a
                  href="https://github.com/saurabh106"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  <Github className="w-6 h-6" />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/saurabh-phadtare-373a21296/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  <Linkedin className="w-6 h-6" />
                </motion.a>
                {/* <motion.a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  <Twitter className="w-6 h-6" />
                </motion.a> */}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ProjectsSection = () => {
  // const [images, setImages] = useState([]);

  // useEffect(() => {
  //   // Fetch images from the backend API
  //   const fetchImages = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:5000/images'); // Backend endpoint
  //       setImages(response.data); // Set the list of image URLs in state
  //     } catch (error) {
  //       console.error('Error fetching images:', error);
  //     }
  //   };

  //   fetchImages();
  // }, []); // Empty dependency array means it will run once on component mount

  const projects = [
    {
      title: "Weather web app",
      description: "Weather web app using free Api that show real time weather data",
      image: "https://res.cloudinary.com/dvokkd6iy/image/upload/v1740588478/Search_dkg1ac.png",
      tags: ["Html", "Css", "Js", "Xampp"],
      link: "#"
    },
    {
      title: "Wanderlust (Airbnb clone)",
      description: "Wanderlust is Airbnb clone in that yo can create listings, Give rating etc.",
      image: "https://res.cloudinary.com/dvokkd6iy/image/upload/v1740587889/A0103884-2ECA-43E2-9232-995658A24E7F_k9gsf5.png",
      tags: ["Node.js", "Express", "MongoDB", "Ejs"],
      link: "https://airbnb-clone-ynzj.onrender.com/listings"
    },
    {
      title: "Chat-App",
      description: "Real-time chat application using Socket.io in that you can Update your profile having settings also you can see the online/offline status of Person",
      image: "https://res.cloudinary.com/dvokkd6iy/image/upload/v1740587050/1_kbfizp.png",
      tags: ["MERN", "Socket.io", "React.js", "TailwindCSS"],
      link: "https://chat-app-xs8y.onrender.com"
    },
    {
      title: "Code-Reviewer",
      description: "This is the code reviewer created using Gemini Api as per given instruction they give us an output",
      image: "https://res.cloudinary.com/dvokkd6iy/image/upload/v1740588499/1_swceo7.png",
      tags: ["MERN", "Gemini Api", "OpenAI", "TailwindCSS"],
      link: "#"
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12">Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <motion.a
                    href={project.link}
                    whileHover={{ scale: 1.05 }}
                    className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
                  >
                    View Project
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}; 

const SkillsSection = () => {
  const skills = [
    {
      category: "Frontend",
      items: ["React", "Vue.js", "TypeScript", "TailwindCSS", "Next.js","Flutter(.dart)"]
    },
    {
      category: "Backend",
      items: ["Node.js", "Express", "Python", "Mysql", "MongoDB"]
    },
    {
      category: "Tools",
      items: ["Git", "Docker", "Firebase","Postman"]
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12">Skills</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((skillGroup, index) => (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {skillGroup.category}
                </h3>
                <ul className="space-y-2">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <motion.li
                      key={skill}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + skillIndex * 0.1 }}
                      className="flex items-center text-gray-600 dark:text-gray-300"
                    >
                      <Code className="w-4 h-4 mr-2 text-purple-600 dark:text-purple-400" />
                      {skill}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const loadingToast = toast.loading('Sending message...');

      // Use environment variable for API URL
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/submit-form`, formData);
      console.log('Response:', response.data);
      console.log(import.meta.env.VITE_API_URL); // This will print the value to the console. Ensure it’s correct.


      toast.dismiss(loadingToast);
      toast.success('Message sent successfully!', {
        duration: 5000,
        icon: '🎉',
      });

      setFormData({
        name: '',
        email: '',
        message: ''
      });

    } catch (error) {
      toast.error('Failed to send message. Please try again.', {
        duration: 5000,
      });
      console.error('Error submitting form:', error);
    }
  };



  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <Toaster 
        position="bottom-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 4000,
          style: {
            background: '#333',
            color: '#fff',
            padding: '16px',
            borderRadius: '8px',
          },
          success: {
            style: {
              background: '#065f46',
              color: '#fff'
            }
          },
          error: {
            style: {
              background: '#991b1b',
              color: '#fff'
            }
          }
        }}
      />
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12">Get in Touch</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Let's Connect
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Have a project in mind? Want to collaborate? Feel free to reach out!
              </p>
              <div className="space-y-4">
                <a
                  href="mailto:contact@example.com"
                  className="flex items-center text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  saurabhphadtare901@gmail.com
                </a>
                <div className="flex space-x-4">
                  <motion.a
                    href="https://github.com/saurabh106"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  >
                    <Github className="w-6 h-6" />
                  </motion.a>
                  <motion.a
                    href="https://www.linkedin.com/in/saurabh-phadtare-373a21296/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  >
                    <Linkedin className="w-6 h-6" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                    required
                  ></textarea>
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

function App() {
  useEffect(() => {
    // Set dark mode by default
    document.documentElement.classList.add('dark');
    
    // Add scrollbar styles
    const styleSheet = document.createElement("style");
    styleSheet.innerText = globalStyles;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <HeroSection />
                <section id="about"><AboutSection /></section>
                <section id="projects"><ProjectsSection /></section>
                <section id="skills"><SkillsSection /></section>
                <section id="contact"><ContactSection /></section>
              </>
            } />
            <Route path="/about" element={<AboutSection />} />
            <Route path="/projects" element={<ProjectsSection />} />
            <Route path="/skills" element={<SkillsSection />} />
            <Route path="/contact" element={<ContactSection />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;