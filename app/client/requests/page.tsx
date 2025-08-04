'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/useAuth';

interface Request {
  id: number;
  title: string;
  type: string;
  status: string;
  priority: string;
  createdAt: string;
}

export default function ClientRequestsPage() {
  const { user, loading } = useAuth();
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    if (user && !loading) {
      // Load user requests
      loadRequests();
    }
  }, [user, loading]);

  const loadRequests = async () => {
    try {
      // Mock data for now
      setRequests([
        {
          id: 1,
          title: "Website Redesign",
          type: "New Project",
          status: "In Progress",
          priority: "High",
          createdAt: "2024-01-15",
        },
        {
          id: 2,
          title: "Add Payment Integration",
          type: "Feature Request",
          status: "Pending",
          priority: "Medium",
          createdAt: "2024-01-10",
        },
      ]);
    } catch (error) {
      console.error('Error loading requests:', error);
    }
  };

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
          <p className="text-muted-foreground mt-4">Please log in to view your requests.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Requests</h1>
        <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90">
          New Request
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Requests</h2>
          
          {requests.length === 0 ? (
            <p className="text-muted-foreground">No requests found.</p>
          ) : (
            <div className="space-y-4">
              {requests.map((request) => (
                <div key={request.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{request.title}</h3>
                      <p className="text-sm text-muted-foreground">{request.type}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        request.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {request.status}
                      </span>
                      <p className="text-sm text-muted-foreground mt-1">{request.priority}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Created: {request.createdAt}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 