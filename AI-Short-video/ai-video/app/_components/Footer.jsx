// components/Footer.js
import Link from 'next/link';

export default function Footer() {
  return (
    <div className="mt-16 w-full">
      <footer className=" text-white py-6 w-full">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 w-full">
          
          {/* Left Side: Text */}
          <p className="text-sm text-gray-400  text-center md:text-left">
            &copy; {new Date().getFullYear()} AI Video Generator. All rights reserved.
          </p>

          {/* Right Side: Social Icons */}
          <div className="flex space-x-6 justify-center md:justify-end">
            {/* X.com (Twitter) */}
            <a href="https://x.com/Saurabh79114" target="_blank" rel="noopener noreferrer" aria-label="X.com">
              <svg className="w-5 h-5 text-gray-400 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.5 2.5L13.8 12l8.7 9.5h-3.3l-6.6-7.3L6 21.5H1.5l9.3-10-8.1-9h3.3l6 6.7L18 2.5h4.5z"/>
              </svg>
            </a>

            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/saurabh-phadtare-373a21296/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg className="w-5 h-5 text-gray-400 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.2c-.97 0-1.75-.78-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm13.5 11.2h-3v-5.5c0-1.32-.03-3.03-1.85-3.03-1.86 0-2.15 1.45-2.15 2.93v5.6h-3v-10h2.89v1.36h.04c.4-.76 1.39-1.56 2.86-1.56 3.06 0 3.63 2.01 3.63 4.63v5.57z"/>
              </svg>
            </a>

            {/* GitHub */}
            <a href="https://github.com/saurabh106" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <svg className="w-5 h-5 text-gray-400 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.26.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.385-1.333-1.754-1.333-1.754-1.089-.745.082-.729.082-.729 1.205.085 1.84 1.236 1.84 1.236 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.604-2.665-.3-5.466-1.332-5.466-5.932 0-1.31.467-2.382 1.235-3.222-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.45 11.45 0 0 1 3-.404c1.02.005 2.045.137 3 .404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.12 3.176.77.84 1.233 1.912 1.233 3.222 0 4.61-2.805 5.63-5.475 5.922.43.37.823 1.102.823 2.222v3.293c0 .32.218.694.825.576C20.565 21.796 24 17.297 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
