"use client";

import React, { useState, useEffect, useMemo } from "react";
import { addContact, getContacts, logInteraction } from "@/actions/nodes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Loader2, Plus, Calendar, User, Briefcase, Building } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, Tooltip, Cell, Dot } from 'recharts';


const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  company: z.string().min(1, "Company is required"),
  type: z.string().min(1, "Type is required"),
});

const interactionSchema = z.object({
    type: z.string().min(1, "Type is required"),
    notes: z.string().optional(),
});

// Custom scatter plot node
const CustomNode = (props) => {
    const { cx, cy, fill, name } = props;
    return (
        <g>
            <circle cx={cx} cy={cy} r={20} fill={fill} stroke="white" strokeWidth={2} className="cursor-pointer hover:stroke-black" />
            <text x={cx} y={cy + 35} textAnchor="middle" fill="#666" fontSize="10">{name}</text>
        </g>
    );
};

export default function NodesPage() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // Forms
  const { register: registerContact, handleSubmit: handleSubmitContact, reset: resetContact } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const { register: registerInt, handleSubmit: handleSubmitInt, reset: resetInt } = useForm({
    resolver: zodResolver(interactionSchema)
  });

  // Fetch data
  const loadContacts = async () => {
    try {
        const data = await getContacts();
        setContacts(data);
    } catch(e) { toast.error("Failed to load network."); }
  };

  useEffect(() => { loadContacts(); }, []);

  // Handlers
  const onAddContact = async (data) => {
    setLoading(true);
    try {
        await addContact(data);
        toast.success("Connection added to your graph!");
        loadContacts();
        setOpen(false);
        resetContact();
    } catch(e) { toast.error("Failed to add contact."); }
    finally { setLoading(false); }
  };

  const onLogInteraction = async (data) => {
    if (!selectedContact) return;
    try {
        await logInteraction(selectedContact.id, data);
        toast.success("Activity logged +1 Streak!");
        loadContacts();
        resetInt();
        // Update selected contact locally to show immediate change
        setSelectedContact(prev => ({...prev, lastContact: new Date(), status: "Warm" }));
    } catch(e) { toast.error("Failed to log interaction."); }
  };

  // Graph Data Preparation
  const graphData = useMemo(() => {
    // We want to visualize 'Time Since Last Contact' (Y) vs 'Interactions Count' (X)
    // Or simpler: Random positions but grouped by Company?
    // Let's do a simple grouping:
    // X = Hash of Company (Cluster by company)
    // Y = Interaction Count (Higher = Stronger relationship)
    // Size = Fixed
    // Color = Status (Cold=Blue, Warm=Orange, Connected=Green)

    return contacts.map(c => ({
        id: c.id,
        x: c.company.length * 10 + (Math.random() * 20), // Pseudo-cluster
        y: c.interactions?.length || 0, // Momentum
        z: 1,
        name: c.name,
        company: c.company,
        status: c.status,
        raw: c, // Pass full object for click handler
    }));
  }, [contacts]);


  return (
    <div className="container mx-auto p-6 space-y-8 h-[calc(100vh-100px)] flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
              Network Graph
            </h1>
            <p className="text-muted-foreground">Visualize your professional relationships.</p>
        </div>
        
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2 bg-black dark:bg-white text-white dark:text-black">
                    <Plus className="w-4 h-4" /> Add Node
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Connection</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmitContact(onAddContact)} className="space-y-4 pt-4">
                    <div className="space-y-2">
                        <Label>Name</Label>
                        <Input {...registerContact("name")} placeholder="e.g. Elon Musk" />
                    </div>
                    <div className="space-y-2">
                        <Label>Role</Label>
                        <Input {...registerContact("role")} placeholder="e.g. CEO" />
                    </div>
                    <div className="space-y-2">
                        <Label>Company</Label>
                        <Input {...registerContact("company")} placeholder="e.g. Tesla" />
                    </div>
                    <div className="space-y-2">
                        <Label>Type</Label>
                        <select className="w-full flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" {...registerContact("type")}>
                            <option value="Mentor">Mentor</option>
                            <option value="Recruiter">Recruiter</option>
                            <option value="Peer">Peer / Colleague</option>
                            <option value="Hiring Manager">Hiring Manager</option>
                        </select>
                    </div>
                    <Button type="submit" disabled={loading} className="w-full">
                        {loading ? <Loader2 className="animate-spin" /> : "Grow Network"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
        {/* Graph Area */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-xl border shadow-sm relative overflow-hidden flex flex-col">
            <div className="absolute top-4 left-4 z-10 flex gap-2">
                <div className="flex items-center gap-1 text-xs"><div className="w-3 h-3 rounded-full bg-blue-500"></div> Cold</div>
                <div className="flex items-center gap-1 text-xs"><div className="w-3 h-3 rounded-full bg-orange-500"></div> Warm</div>
                {/* <div className="flex items-center gap-1 text-xs"><div className="w-3 h-3 rounded-full bg-green-500"></div> Connected</div> */}
            </div>
            
            {contacts.length === 0 ? (
                <div className="flex-1 flex items-center justify-center text-muted-foreground">
                    Start adding people to build your graph!
                </div>
            ) : (
                <div className="flex-1 w-full h-full min-h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                            <XAxis type="number" dataKey="x" name="Company Cluster" hide />
                            <YAxis type="number" dataKey="y" name="Interactions" allowDecimals={false} label={{ value: 'Relationship Strength (Interactions)', angle: -90, position: 'insideLeft' }} />
                            <Tooltip cursor={{ strokeDasharray: '3 3' }} content={({ payload }) => {
                                if (payload && payload.length) {
                                    const data = payload[0].payload;
                                    return (
                                        <div className="bg-white dark:bg-black p-2 border rounded shadow-md text-xs">
                                            <b>{data.name}</b><br/>
                                            {data.company}<br/>
                                            Status: {data.status}
                                        </div>
                                    );
                                }
                                return null;
                            }} />
                            <Scatter name="Contacts" data={graphData} onClick={(node) => setSelectedContact(node.raw)}>
                                {graphData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.status === 'Cold' ? '#3b82f6' : '#f97316'} />
                                ))}
                            </Scatter>
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>
            )}
            <p className="text-center text-xs text-muted-foreground pb-2">Click a node to view/log interactions.</p>
        </div>

        {/* Sidebar / Inspector */}
        <div className="bg-muted/30 rounded-xl border p-6 flex flex-col h-full overflow-y-auto">
            {!selectedContact ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center text-muted-foreground opacity-50">
                    <User className="w-16 h-16 mb-4" />
                    <p>Select a node in the graph to view details and log activities.</p>
                </div>
            ) : (
                <div className="space-y-6 animate-in slide-in-from-right-10 duration-300">
                    <div>
                        <h2 className="text-2xl font-bold">{selectedContact.name}</h2>
                        <div className="flex items-center gap-2 text-muted-foreground mt-1">
                            <Building className="w-4 h-4" /> <span>{selectedContact.company}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Briefcase className="w-4 h-4" /> <span>{selectedContact.role}</span>
                        </div>
                    </div>

                    <div className="p-4 bg-background rounded-lg border">
                         <h3 className="font-semibold mb-3">Log Interaction</h3>
                         <form onSubmit={handleSubmitInt(onLogInteraction)} className="space-y-3">
                            <select className="w-full h-9 rounded border px-2 text-sm" {...registerInt("type")}>
                                <option value="Email">📧 Email</option>
                                <option value="LinkedIn Message">💬 LinkedIn Message</option>
                                <option value="Call">📞 Call</option>
                                <option value="Coffee Chat">☕ Coffee Chat</option>
                            </select>
                            <Input placeholder="Notes (e.g. discussed AI roles)" {...registerInt("notes")} className="h-9" />
                            <Button size="sm" className="w-full">Log Activity</Button>
                         </form>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-3">History</h3>
                        <div className="space-y-3">
                            {(!selectedContact.interactions || selectedContact.interactions.length === 0) && (
                                <p className="text-sm text-muted-foreground italic">No interactions logged yet.</p>
                            )}
                            {selectedContact.interactions?.map((int) => (
                                <div key={int.id} className="flex gap-3 text-sm p-2 hover:bg-muted rounded transition-colors">
                                    <div className="mt-0.5"><Calendar className="w-4 h-4 text-muted-foreground" /></div>
                                    <div>
                                        <div className="font-medium">{int.type}</div>
                                        <div className="text-muted-foreground text-xs">{new Date(int.date).toLocaleDateString()}</div>
                                        {int.notes && <div className="mt-1 text-xs bg-muted p-1 rounded">{int.notes}</div>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
