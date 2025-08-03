import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h3 className="text-2xl font-semibold mb-4">Who I Am</h3>
            <p className="text-muted-foreground mb-6">
              I&apos;m a passionate full-stack developer and DevOps enthusiast,
              currently learning and building skills in modern web applications,
              mobile development, and cloud infrastructure. I&apos;m actively
              working on projects to gain hands-on experience and grow in both
              startup and enterprise-level environments.
            </p>

            <p className="text-muted-foreground mb-6">
              As I continue learning, I focus on combining technical skills with
              an understanding of user needs. I aim to write clean, efficient
              code that adds real value.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <h4 className="font-medium mb-2">Name:</h4>
                <p className="text-muted-foreground">Saurabh Phadtare</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Email:</h4>
                <p className="text-muted-foreground">
                  saurabhphadtare901@gmail.com
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Location:</h4>
                <p className="text-muted-foreground">Mumbai , Maharashtra</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Availability:</h4>
                <p className="text-muted-foreground">Open to opportunities</p>
              </div>
            </div>

            <a
              href="https://docs.google.com/document/d/1pUVdYArN3z78Gh_FmFqdXvzLsy1ZFa2vv8i1sq-KWGM/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="default" className="rounded-full">
                <FileText className="mr-2 h-4 w-4" />
                Download Resume
              </Button>
            </a>
          </div>

          <div className="order-1 lg:order-2 flex justify-center">
            <div
              className={cn(
                "relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-background",
                "before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-tr before:from-primary/20 before:to-transparent before:rounded-full before:z-10"
              )}
            >
              <Image
                src="/profile.png"
                alt="Profile"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
