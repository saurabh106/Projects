"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/data";


type FilterType = "all" | "web" | "mobile" | "devops";

export function ProjectsSection() {
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(project => project.tags.includes(filter as any));

  return (
    <section id="projects" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore my recent work across web development, mobile applications, and DevOps projects.
          </p>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mt-4"></div>
        </div>

        <div className="flex justify-center mb-8 flex-wrap gap-2">
          <Button 
            variant={filter === "all" ? "default" : "outline"} 
            className="rounded-full"
            onClick={() => setFilter("all")}
          >
            All Projects
          </Button>
          <Button 
            variant={filter === "web" ? "default" : "outline"} 
            className="rounded-full"
            onClick={() => setFilter("web")}
          >
            Web
          </Button>
          <Button 
            variant={filter === "mobile" ? "default" : "outline"} 
            className="rounded-full"
            onClick={() => setFilter("mobile")}
          >
            Mobile
          </Button>
          <Button 
            variant={filter === "devops" ? "default" : "outline"} 
            className="rounded-full"
            onClick={() => setFilter("devops")}
          >
            DevOps
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card 
              key={project.id} 
              className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant={tag}>
                      {tag.charAt(0).toUpperCase() + tag.slice(1)}
                    </Badge>
                  ))}
                </div>
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex gap-3">
                  {project.demoUrl && (
                    <Button asChild variant="secondary" size="sm" className="rounded-full">
                      <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                        <span>Live Demo</span>
                        <ArrowUpRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button asChild variant="outline" size="sm" className="rounded-full">
                      <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-1 h-4 w-4" />
                        <span>Code</span>
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}