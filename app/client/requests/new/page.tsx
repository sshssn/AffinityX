"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/useAuth";

export default function NewRequestPage() {
  const { user, loading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (loading) {
    return (
      <div className="h-[100dvh] flex items-center justify-center bg-gradient-to-br from-background to-muted/20">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Loading...</h2>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-[100dvh] flex items-center justify-center bg-gradient-to-br from-background to-muted/20">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Access Required</h2>
          <p className="text-muted-foreground mt-4">Please log in to submit a request.</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Submit New Request</h1>
      
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Request Type</label>
          <select className="w-full p-3 border rounded-lg">
            <option>New Project</option>
            <option>Feature Request</option>
            <option>Bug Report</option>
            <option>Content Update</option>
            <option>Design Change</option>
            <option>Technical Support</option>
            <option>Other</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input 
            type="text" 
            className="w-full p-3 border rounded-lg"
            placeholder="Brief description of your request"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea 
            className="w-full p-3 border rounded-lg h-32"
            placeholder="Detailed description of your request..."
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Priority</label>
          <select className="w-full p-3 border rounded-lg">
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
        
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-primary text-white p-3 rounded-lg hover:bg-primary/90 disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit Request"}
        </button>
      </form>
    </div>
  );
} 