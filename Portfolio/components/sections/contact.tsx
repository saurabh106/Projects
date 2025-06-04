"use client";

import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin 
} from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or want to discuss potential opportunities? I&apos;d love to hear from you!
          </p>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mt-4"></div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-8 max-w-5xl mx-auto">
          {/* Contact Information - Left Side with increased padding */}
          <div className="w-full lg:w-1/2 lg:pl-250"> {/* Increased left padding */}
            <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Email</h4>
                  <a href="mailto:saurabhphadtare901@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                    saurabhphadtare901@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Phone</h4>
                  <a href="tel:+917304065289" className="text-muted-foreground hover:text-primary transition-colors">
                    +91 7304065289
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Location</h4>
                  <p className="text-muted-foreground">
                    Mumbai, Maharashtra
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Follow Me - Right Side */}
          <div className="w-full lg:w-1/2 lg:pl-8">
            <h3 className="text-xl font-semibold mb-6">Follow Me</h3>
            <div className="flex flex-wrap gap-4">
              <a 
                href="https://github.com/saurabh106" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-card hover:bg-muted p-3 rounded-full transition-colors border flex items-center justify-center w-12 h-12"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a 
                href="https://www.linkedin.com/in/saurabh-phadtare-373a21296/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-card hover:bg-muted p-3 rounded-full transition-colors border flex items-center justify-center w-12 h-12"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a 
                href="mailto:saurabhphadtare901@gmail.com"
                className="bg-card hover:bg-muted p-3 rounded-full transition-colors border flex items-center justify-center w-12 h-12"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}