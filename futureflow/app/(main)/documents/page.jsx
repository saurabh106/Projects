"use client";

import React, { useState, useEffect } from "react";
import { addDocument, getDocuments, deleteDocument } from "@/actions/documents";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Plus, FileText, Trash2, Download, Eye } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const docSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.string().min(1, "Type is required"),
  // File handling is manual via input ref
});

export default function DocumentsPage() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);

  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(docSchema),
  });

  const loadDocs = async () => {
    try {
        const data = await getDocuments();
        setDocs(data);
    } catch(e) { toast.error("Failed to load documents."); }
  };

  useEffect(() => { loadDocs(); }, []);

  const handleFileChange = (e) => {
    if (e.target.files) {
        setFile(e.target.files[0]);
    }
  };

  const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  const onAddDoc = async (data) => {
    if (!file) {
        toast.error("Please select a file.");
        return;
    }
    
    // Check size (2MB limit for this demo because DB storage)
    if (file.size > 2 * 1024 * 1024) {
        toast.error("File is too large (Max 2MB).");
        return;
    }

    setLoading(true);
    try {
        const base64 = await toBase64(file);
        
        await addDocument({
            name: data.name,
            type: data.type,
            content: base64,
            fileType: file.type
        });

        toast.success("Document saved securely!");
        loadDocs();
        setOpen(false);
        reset();
        setFile(null);
    } catch(e) { 
        console.error(e);
        toast.error("Failed to upload document."); 
    }
    finally { setLoading(false); }
  };

  const onDelete = async (id) => {
      if(!confirm("Are you sure?")) return;
      try {
          await deleteDocument(id);
          toast.success("Deleted.");
          loadDocs();
      } catch(e) { toast.error("Failed to delete."); }
  }

  const onDownload = (doc) => {
      // Create a link and click it
      const link = document.createElement("a");
      link.href = doc.content;
      link.download = doc.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center mb-8">
        <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
              Document Vault
            </h1>
            <p className="text-muted-foreground mt-2">Securely store your career documents.</p>
        </div>
        
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <Plus className="w-4 h-4" /> Upload Document
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload New Document</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onAddDoc)} className="space-y-4 pt-4">
                    <div className="space-y-2">
                        <Label>Document Name</Label>
                        <Input {...register("name")} placeholder="e.g. Resume V2" />
                    </div>
                    <div className="space-y-2">
                        <Label>Category</Label>
                        <select className="w-full flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" {...register("type")}>
                            <option value="Resume">Resume</option>
                            <option value="Cover Letter">Cover Letter</option>
                            <option value="Certificate">Certificate</option>
                            <option value="Transcript">Transcript</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <Label>File (Max 2MB)</Label>
                        <Input type="file" onChange={handleFileChange} accept=".pdf,.doc,.docx,.txt,.md,.png,.jpg" />
                    </div>
                    <Button type="submit" disabled={loading} className="w-full">
                        {loading ? <Loader2 className="animate-spin" /> : "Secure Upload"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {docs.length === 0 && (
            <div className="col-span-full text-center py-12 border-2 border-dashed rounded-lg text-muted-foreground">
                No documents in vault yet. Upload your first resume!
            </div>
        )}
        {docs.map((doc) => (
            <Card key={doc.id} className="hover:shadow-lg transition-all group">
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground uppercase">{doc.type}</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold truncate" title={doc.name}>{doc.name}</div>
                    <p className="text-xs text-muted-foreground mt-1">Uploaded: {new Date(doc.createdAt).toLocaleDateString()}</p>
                </CardContent>
                <CardFooter className="flex justify-between border-t p-4 bg-muted/20">
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" onClick={() => onDownload(doc)}>
                        <Download className="w-4 h-4 mr-2" /> Download
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => onDelete(doc.id)}>
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </CardFooter>
            </Card>
        ))}
      </div>
    </div>
  );
}
