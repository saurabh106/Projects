"use client";

import { useState } from "react";
import { skills } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SkillCategory = "all" | "web" | "mobile" | "devops";

export function SkillsSection() {
  const [category, setCategory] = useState<SkillCategory>("all");

  const filteredSkills = category === "all" 
    ? skills 
    : skills.filter(skill => skill.category === category);

  return (
    <section id="skills" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Skills</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Specialized expertise across web development, mobile applications, and DevOps technologies.
          </p>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mt-4"></div>
        </div>

        <div className="flex justify-center mb-12 flex-wrap gap-2">
          <Button 
            variant={category === "all" ? "default" : "outline"} 
            className="rounded-full"
            onClick={() => setCategory("all")}
          >
            All Skills
          </Button>
          <Button 
            variant={category === "web" ? "default" : "outline"} 
            className={cn(
              "rounded-full",
              category === "web" ? "bg-indigo-500 hover:bg-indigo-600" : ""
            )}
            onClick={() => setCategory("web")}
          >
            Web Development
          </Button>
          <Button 
            variant={category === "mobile" ? "default" : "outline"} 
            className={cn(
              "rounded-full",
              category === "mobile" ? "bg-emerald-500 hover:bg-emerald-600" : ""
            )}
            onClick={() => setCategory("mobile")}
          >
            Mobile Development
          </Button>
          <Button 
            variant={category === "devops" ? "default" : "outline"} 
            className={cn(
              "rounded-full",
              category === "devops" ? "bg-amber-500 hover:bg-amber-600" : ""
            )}
            onClick={() => setCategory("devops")}
          >
            DevOps
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, index) => (
            <div 
              key={skill.name} 
              className="bg-card p-4 rounded-lg shadow-sm border"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">{skill.name}</h3>
                <span className="text-sm text-muted-foreground">{skill.level}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div 
                  className={cn(
                    "h-2.5 rounded-full transition-all duration-1000 ease-out",
                    skill.category === "web" ? "bg-indigo-500" : 
                    skill.category === "mobile" ? "bg-emerald-500" : 
                    "bg-amber-500"
                  )} 
                  style={{ 
                    width: `${skill.level}%`, 
                    transitionDelay: `${index * 100}ms` 
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}