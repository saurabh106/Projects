"use client";

import React, { useState, useEffect } from "react";
import { runJobAgent, getJobMatches, saveJobPreferences } from "@/actions/jobs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Briefcase, MapPin, Building2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  role: z.string().min(1, "Role is required"),
  location: z.string().min(1, "Location is required"),
  salary: z.string().optional(),
});

export default function JobAgentPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [agentRunning, setAgentRunning] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const loadJobs = async () => {
    try {
        const data = await getJobMatches();
        setJobs(data);
    } catch (e) {
        toast.error("Failed to load jobs.");
    }
  }

  useEffect(() => {
    loadJobs();
  }, []);

  const onRunAgent = async (data) => {
    setAgentRunning(true);
    try {
        // First save preferences
        await saveJobPreferences(data);
        
        // Then start the "agent"
        toast("Agent is scouting... this takes a moment.");
        await runJobAgent();
        
        toast.success("Agent finished! Check out the matches.");
        loadJobs();

    } catch (e) {
        toast.error(e.message || "Something went wrong.");
    } finally {
        setAgentRunning(false);
    }
  };


  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
          AI Career Agent (Beta)
        </h1>
        <p className="text-muted-foreground mt-2">
          Set your goals, and let your personal AI agent find the best matches while you sleep.
        </p>
      </div>

      {/* Preferences Panel */}
      <Card className="max-w-3xl mx-auto border-violet-200 shadow-lg">
        <CardHeader>
            <CardTitle>Agent Configuration</CardTitle>
            <CardDescription>Tell the agent what to look for.</CardDescription>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleSubmit(onRunAgent)} className="grid gap-4 md:grid-cols-3 items-end">
                <div className="space-y-2">
                    <Label htmlFor="role">Target Role</Label>
                    <Input id="role" placeholder="e.g. Product Manager" {...register("role")} />
                    {errors.role && <span className="text-red-500 text-xs">{errors.role.message}</span>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="e.g. Remote / NYC" {...register("location")} />
                    {errors.location && <span className="text-red-500 text-xs">{errors.location.message}</span>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="salary">Min Salary (Optional)</Label>
                    <Input id="salary" placeholder="e.g. 100k" {...register("salary")} />
                </div>
                <Button type="submit" disabled={agentRunning} className="bg-violet-600 hover:bg-violet-700 md:col-span-3 w-full mt-4">
                    {agentRunning ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Scouting Jobs & Analyzing Matches...
                        </>
                    ) : (
                        "Activate Agent"
                    )}
                </Button>
            </form>
        </CardContent>
      </Card>

      {/* Results Grid */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Matched Jobs</h2>
        {jobs.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg">
                No jobs found yet. Run the agent to start scouting!
            </div>
        ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {jobs.map((job) => (
                    <Card key={job.id} className="flex flex-col hover:shadow-md transition-shadow">
                        <CardHeader>
                            <div className="flex justify-between items-start mb-2">
                                <Badge variant={job.matchScore >= 80 ? "default" : "secondary"} 
                                       className={job.matchScore >= 80 ? "bg-green-500 hover:bg-green-600" : ""}>
                                    {job.matchScore}% Match
                                </Badge>
                                <span className="text-xs text-muted-foreground">{new Date(job.createdAt).toLocaleDateString()}</span>
                            </div>
                            <CardTitle className="text-lg">{job.jobTitle}</CardTitle>
                            <CardDescription className="flex items-center gap-1">
                                <Building2 className="w-3 h-3" /> {job.company}
                            </CardDescription>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</span>
                                <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" /> {job.salary}</span>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-4">
                            <div className="bg-muted/50 p-3 rounded text-sm">
                                <span className="font-semibold block mb-1">Why it matched:</span>
                                {job.analysis?.whyMatched || "AI didn't provide a reason."}
                            </div>
                            
                            {/* Missing Skills */}
                            {job.analysis?.missingSkills && job.analysis.missingSkills.length > 0 && (
                                <div>
                                    <span className="text-xs font-semibold text-muted-foreground uppercase">Missing Skills:</span>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                        {job.analysis.missingSkills.map((skill, i) => (
                                            <Badge key={i} variant="outline" className="text-xs border-red-200 text-red-600 bg-red-50">{skill}</Badge>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                        <div className="p-6 pt-0 mt-auto">
                             <Button variant="outline" className="w-full gap-2" asChild>
                                <a href={job.jobUrl} target="_blank" rel="noopener noreferrer">
                                    Apply Now <ExternalLink className="w-4 h-4" />
                                </a>
                             </Button>
                        </div>
                    </Card>
                ))}
            </div>
        )}
      </div>

    </div>
  );
}
