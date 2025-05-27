"use client";

import { experiences } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, 
  MapPin, 
  Calendar 
} from "lucide-react";
import { cn } from "@/lib/utils";

export function ExperienceSection() {
  return (
    <section id="experience" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My professional journey and career milestones.
          </p>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mt-4"></div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative border-l-2 border-muted pl-8 ml-6">
            {experiences.map((experience, index) => (
              <div 
                key={experience.id} 
                className={cn(
                  "mb-12 relative",
                  "before:content-[''] before:absolute before:w-4 before:h-4 before:rounded-full before:left-[-40px] before:top-1.5",
                  "before:border-4 before:border-background",
                  index === 0 
                    ? "before:bg-green-500" 
                    : index === 1 
                      ? "before:bg-blue-500"
                      : index === 2
                        ? "before:bg-amber-500"
                        : "before:bg-purple-500"
                )}
              >
                <div className="bg-card border rounded-lg p-6 shadow-sm">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h3 className="text-xl font-semibold">{experience.title}</h3>
                    <div className="flex items-center text-sm text-muted-foreground mt-2 md:mt-0">
                      <Calendar className="w-4 h-4 mr-1" />
                      {experience.startDate} — {experience.endDate}
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Briefcase className="w-4 h-4 mr-1.5" />
                      {experience.company}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1.5" />
                      {experience.location}
                    </div>
                  </div>
                  
                  <ul className="mb-4 space-y-2">
                    {experience.description.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex flex-wrap gap-2">
                    {experience.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="rounded-full text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}