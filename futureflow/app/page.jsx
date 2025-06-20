import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import HeroSection from "@/components/hero";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { features } from "@/data/features";

import { faqs } from "@/data/faqs";
import { howItWorks } from "@/data/howItWorks";

const Home = () => {
  return (
    <div>
      <div className="grid-background" />

      <HeroSection />

      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">
            Powerful Features for your Career Growth
          </h2>
          <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              return (
                <Card
                  key={index}
                  className="border-2 hover:border-primary transition-colors duration-300"
                >
                  <CardContent className="pt-6 text-center flex flex-col items-center">
                    <div className="flex flex-col items-center justify-center ">
                      {feature.icon}

                      <h3 className="text-xl font-bold mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                        {feature.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground">
              Four simple steps to accelerate your career growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {howItWorks.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-xl">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Find answers to common questions about our platform
            </p>
          </div>

          <div className="max-w-3xl mx-auto ">
            <Accordion type="single" collapsible className="w-full ">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left hover:cursor-pointer ">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full px-4 sm:px-6">
        <div className="mx-auto py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl overflow-hidden relative border border-gray-800">
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48cGF0aCBkPSJNMzAgMTVIMHYxNWgzMFYxNXpNMzAgNDVIMHYxNWgzMFY0NXpNNDUgMTVIMzB2MTVoMTVWMTV6TTQ1IDQ1SDMwdjE1aDE1VjQ1eiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjAuNSIvPjwvc3ZnPg==')]"></div>

          {/* Glowing accent elements */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-500 rounded-full mix-blend-overlay filter blur-3xl opacity-10"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500 rounded-full mix-blend-overlay filter blur-3xl opacity-10"></div>

          <div className="relative z-10 flex flex-col items-center justify-center space-y-6 text-center max-w-3xl mx-auto px-4">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Ready to Accelerate Your Career?
              <span className="block mt-2 h-1 w-20 bg-gradient-to-r from-emerald-400 to-purple-500 mx-auto rounded-full"></span>
            </h2>

            <p className="mx-auto max-w-[600px] text-gray-300/90 md:text-xl text-lg leading-relaxed">
              Join thousands of professionals who are advancing their careers
              with AI-powered guidance.
            </p>

            <Link href="/dashboard" passHref>
              <Button
                size="lg"
                className="group h-12 px-8 mt-6 bg-gradient-to-r from-purple-600 to-slate-400 text-white hover:from-purple-500 hover:to-slate-500 hover:scale-[1.02] transition-all duration-300 
  font-semibold shadow-lg hover:shadow-xl border border-gray-700/50 relative overflow-hidden hover:cursor-pointer"
              >
                <span className="relative z-10 flex items-center">
                  Start Your Journey Today
                  <ArrowRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white/10 via-white/30 to-white/10 animate-shine"></span>
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
