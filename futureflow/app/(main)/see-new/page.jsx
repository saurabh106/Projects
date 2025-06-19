"use client"
import React from 'react';
import Link from 'next/link';

const benefits = [
  "Futureflow combines AI-powered career tools with industry-specific insights to help you advance your career. Our platform offers three main features: an intelligent resume builder, a cover letter generator, and an adaptive interview preparation system. Each tool is tailored to your industry and skills, providing personalized guidance for your professional journey.",
  "Futureflow learns about your industry, experience, and skills during onboarding. It then uses this information to generate customized resumes, cover letters, and interview questions. The content is specifically aligned with your professional background and industry standards, making it highly relevant and effective.",
  "We update our industry insights weekly using advanced AI analysis of current market trends. This includes salary data, in-demand skills, and industry growth patterns. Our system constantly evolves to ensure you have the most relevant information for your career decisions.",
  "Absolutely. We prioritize the security of your professional information. All data is encrypted and securely stored using industry-standard practices. We use Clerk for authentication and never share your personal information with third parties.",
  "Futureflow tracks your performance across multiple practice interviews, providing detailed analytics and improvement suggestions. You can view your progress over time, identify areas for improvement, and receive AI-generated tips to enhance your interview skills based on your responses.",
  "Yes! While Futureflow generates high-quality initial content, you have full control to edit and customize all generated resumes, cover letters, and other content. Our markdown editor makes it easy to refine the content to perfectly match your needs."
];

const SeeNewPage = () => {
  return (
    <div className="futureflow-benefits">
      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="hero-title">Futureflow Advantages</h1>
        <p className="hero-subtitle">Discover how our platform transforms your career journey</p>
      </div>

      {/* Benefits Grid */}
      <div className="benefits-container">
        {benefits.map((benefit, index) => (
          <div key={index} className="benefit-card">
            <div className="card-decoration">
              <div className="decoration-circle"></div>
              <div className="decoration-line"></div>
            </div>
            <div className="card-content">
              <p className="benefit-text">{benefit}</p>
            </div>
            <div className="card-number">0{index + 1}</div>
          </div>
        ))}
      </div>

      {/* Final CTA */}
      <div className="final-cta">
        <h2>Ready to experience these benefits?</h2>
        <Link href="/">
          <button className="cta-button">Get Started with Futureflow</button>
        </Link>
      </div>

      {/* Dark Theme CSS */}
      <style jsx>{`
        .futureflow-benefits {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          color: #f0f0f0;
          background-color: #121212;
          min-height: 100vh;
        }
        
        .hero-section {
          text-align: center;
          margin-bottom: 3rem;
          padding: 2rem 0;
        }
        
        .hero-title {
          font-size: 2.5rem;
          color: #ffffff;
          margin-bottom: 1rem;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: inline-block;
        }
        
        .hero-subtitle {
          font-size: 1.2rem;
          color: #a1a1aa;
          max-width: 700px;
          margin: 0 auto;
        }
        
        .benefits-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin: 3rem 0;
        }
        
        .benefit-card {
          position: relative;
          background: #1e1e1e;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
          transition: all 0.3s ease;
          border-left: 4px solid #3b82f6;
        }
        
        .benefit-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 25px rgba(59, 130, 246, 0.2);
          background: #252525;
        }
        
        .card-number {
          position: absolute;
          top: -15px;
          right: 20px;
          background: #3b82f6;
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 1.1rem;
        }
        
        .benefit-text {
          line-height: 1.6;
          color: #d4d4d8;
          font-size: 1rem;
        }
        
        .final-cta {
          text-align: center;
          margin: 4rem 0;
          padding: 2rem;
          background: #1e1e1e;
          border-radius: 12px;
          border: 1px solid #333;
        }
        
        .final-cta h2 {
          color: #f8fafc;
          margin-bottom: 1.5rem;
        }
        
        .cta-button {
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          color: white;
          border: none;
          padding: 0.8rem 2rem;
          font-size: 1rem;
          border-radius: 30px;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 1rem;
          font-weight: 600;
        }
        
        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(59, 130, 246, 0.4);
        }
        
        @media (max-width: 768px) {
          .benefits-container {
            grid-template-columns: 1fr;
          }
          
          .hero-title {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default SeeNewPage;