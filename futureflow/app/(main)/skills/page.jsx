"use client";

import React, { useState, useEffect } from "react";
import { analyzeSkillGap, getSkillGapAnalyses } from "@/actions/skills";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const schema = z.object({
  targetRole: z.string().min(1, "Target role is required"),
});

export default function SkillsPage() {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema),
  });

  const fetchAnalyses = async () => {
    try {
      const data = await getSkillGapAnalyses();
      setAnalyses(data);
    } catch (error) {
        toast.error("Failed to load history");
    }
  };

  useEffect(() => {
    fetchAnalyses();
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await analyzeSkillGap(data.targetRole);
      toast.success("Analysis complete!");
      fetchAnalyses();
      reset();
    } catch (error) {
      toast.error("Failed to analyze skill gap");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-500 to-emerald-600 bg-clip-text text-transparent">
          Skill Gap Analyzer
        </h1>
        <p className="text-muted-foreground mt-2">
          Find out what you're missing for your dream role and get a custom learning plan.
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4 flex-col sm:flex-row">
                <div className="flex-1">
                    <Input 
                        {...register("targetRole")} 
                        placeholder="Enter your target role (e.g. Senior Backend Engineer)" 
                        className="h-12 text-lg"
                    />
                    {errors.targetRole && <p className="text-red-500 text-xs mt-1">{errors.targetRole.message}</p>}
                </div>
                <Button type="submit" disabled={loading} className="h-12 px-6">
                    {loading ? <Loader2 className="animate-spin mr-2" /> : "Analyze Gap"}
                </Button>
            </form>
        </Card>
      </div>

      <div className="space-y-8 mt-12">
        {analyses.length === 0 && (
             <div className="text-center py-12 text-muted-foreground">
                No analyses yet. Enter a content role above to start.
            </div>
        )}
        {analyses.map((analysis) => (
            <Card key={analysis.id} className="border-l-4 border-l-emerald-500 shadow-md">
                <CardHeader>
                    <CardTitle className="flex justify-between items-center text-xl">
                        <span>Target: {analysis.targetRole}</span>
                        <span className="text-sm font-normal text-muted-foreground">{new Date(analysis.createdAt).toLocaleDateString()}</span>
                    </CardTitle>
                    <CardDescription>
                        Identified Gaps: {analysis.missingSkills.join(", ")}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <h3 className="font-semibold mb-4 text-lg">Your Personalized Action Plan:</h3>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {analysis.actionPlan && analysis.actionPlan.map((item, index) => (
                            <div key={index} className="bg-muted/30 p-4 rounded-lg border hover:border-emerald-200 transition-colors flex flex-col h-full">
                                <div className="flex items-center gap-2 mb-2">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                                    <h4 className="font-bold text-foreground">{item.skill}</h4>
                                </div>
                                <p className="text-sm text-muted-foreground mb-4 flex-grow line-clamp-3" title={item.todo}>{item.todo}</p>
                                <div className="pt-2 border-t mt-auto">
                                    <div className="text-xs font-mono bg-background p-2 rounded border mb-2">
                                        <span className="block font-semibold text-emerald-600 mb-1">Recommends:</span>
                                        {item.resource}
                                    </div>
                                    <div className="text-xs text-right font-medium text-emerald-600">
                                        Timeline: {item.timeframe}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}
