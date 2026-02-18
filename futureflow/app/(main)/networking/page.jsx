"use client";

import React, { useState, useEffect } from "react";
import { generateNetworkingMessage, getNetworkingMessages } from "@/actions/networking";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, Copy } from "lucide-react";
import { toast } from "sonner";

const schema = z.object({
  recipientName: z.string().min(1, "Recipient name is required"),
  recipientRole: z.string().min(1, "Role is required"),
  recipientCompany: z.string().optional(),
  purpose: z.string().min(10, "Please describe the purpose (e.g. asking for a referral)"),
});

export default function NetworkingPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema),
  });

  const fetchMessages = async () => {
    try {
      const data = await getNetworkingMessages();
      setMessages(data);
    } catch (error) {
      toast.error("Failed to load history");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await generateNetworkingMessage(data);
      toast.success("Message generated successfully!");
      fetchMessages();
      reset();
    } catch (error) {
      toast.error("Failed to generate message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          AI Networking Assistant
        </h1>
        <p className="text-muted-foreground mt-2">
          Craft the perfect personalized outreach message in seconds.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create New Message</CardTitle>
              <CardDescription>Enter the recipient's details and your goal.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Recipient Name</label>
                  <Input {...register("recipientName")} placeholder="e.g. Sarah Smith" />
                  {errors.recipientName && <p className="text-red-500 text-xs mt-1">{errors.recipientName.message}</p>}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Role</label>
                    <Input {...register("recipientRole")} placeholder="e.g. Engineering Manager" />
                    {errors.recipientRole && <p className="text-red-500 text-xs mt-1">{errors.recipientRole.message}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Company (Optional)</label>
                    <Input {...register("recipientCompany")} placeholder="e.g. Google" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Goal / Purpose</label>
                  <Textarea 
                    {...register("purpose")} 
                    placeholder="e.g. I want to ask for advice on how to break into AI engineering coming from a web dev background." 
                    className="min-h-[100px]"
                  />
                  {errors.purpose && <p className="text-red-500 text-xs mt-1">{errors.purpose.message}</p>}
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Generate Message"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* History / Output */}
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold tracking-tight">Recent Messages</h2>
            <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2 pb-4">
                {messages.length === 0 && (
                    <div className="text-center py-12 border-2 border-dashed rounded-lg text-muted-foreground">
                        No messages generated yet. Start networking!
                    </div>
                )}
                {messages.map((msg) => (
                    <Card key={msg.id} className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-2">
                             <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-lg">{msg.recipientName}</h3>
                                    <p className="text-sm text-muted-foreground">{msg.recipientRole} {msg.recipientCompany && `@ ${msg.recipientCompany}`}</p>
                                </div>
                                <span className="text-xs text-muted-foreground">{new Date(msg.createdAt).toLocaleDateString()}</span>
                             </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <div className="bg-muted/50 p-4 rounded-md text-sm whitespace-pre-wrap font-mono text-foreground/90">
                                {msg.generatedContent}
                             </div>
                             <Button 
                                variant="outline" 
                                size="sm" 
                                className="w-full"
                                onClick={() => {
                                    navigator.clipboard.writeText(msg.generatedContent);
                                    toast.success("Copied to clipboard!");
                                }}
                             >
                                <Copy className="w-4 h-4 mr-2" />
                                Copy to Clipboard
                             </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
