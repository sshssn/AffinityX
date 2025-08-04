"use client";

import { useEffect, useState } from 'react';
import { AppSidebar } from "../dashboard-components/app-sidebar"
import { SiteHeader } from "../dashboard-components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "../../components/ui/sidebar"
import { useAuth } from "../../lib/useAuth"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Calendar } from "../../components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { IconPlus, IconCalendar, IconClock, IconUser, IconMapPin, IconArrowLeft } from "@tabler/icons-react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"

interface CalendarEvent {
  id: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  type: 'meeting' | 'deadline' | 'milestone' | 'task';
  project_id: number;
  assigned_to: number;
  location?: string;
}

export default function CalendarPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [showEventForm, setShowEventForm] = useState(false);

  useEffect(() => {
    if (user && !loading) {
      loadCalendarEvents();
    }
  }, [user, loading]);

  const loadCalendarEvents = async () => {
    try {
      const response = await fetch('/api/calendar/events');
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      }
    } catch (error) {
      console.error('Error loading calendar events:', error);
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-800';
      case 'deadline': return 'bg-red-100 text-red-800';
      case 'milestone': return 'bg-green-100 text-green-800';
      case 'task': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case 'meeting': return 'Meeting';
      case 'deadline': return 'Deadline';
      case 'milestone': return 'Milestone';
      case 'task': return 'Task';
      default: return type;
    }
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.start_date);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground">Please sign in to access the calendar.</p>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="dashboard-content">
          <div className="dashboard-scroll-area">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button 
                    variant="ghost" 
         
                    onClick={() => router.push('/dashboard')}
                    className="flex items-center gap-2"
                  >
                    <IconArrowLeft className="h-4 w-4" />
                    Back to Dashboard
                  </Button>
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
                    <p className="text-muted-foreground">
                      Manage your project schedule and events
                    </p>
                  </div>
                </div>
                <Button onClick={() => setShowEventForm(true)}>
                  <IconPlus className="mr-2 h-4 w-4" />
                  New Event
                </Button>
              </div>

              {/* Calendar Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Calendar */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Project Calendar</CardTitle>
                      <CardDescription>
                        View and manage your project timeline
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border"
                        modifiers={{
                          event: (date) => getEventsForDate(date).length > 0,
                        }}
                        modifiersStyles={{
                          event: {
                            backgroundColor: 'hsl(var(--primary))',
                            color: 'hsl(var(--primary-foreground))',
                          },
                        }}
                      />
                    </CardContent>
                  </Card>
                </div>

                {/* Events for Selected Date */}
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <IconCalendar className="h-5 w-5" />
                        Events for {date ? format(date, 'MMMM d, yyyy') : 'Today'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {date && getEventsForDate(date).length > 0 ? (
                          getEventsForDate(date).map((event) => (
                            <div
                              key={event.id}
                              className="p-3 border rounded-lg hover:bg-accent cursor-pointer"
                              onClick={() => setSelectedEvent(event)}
                            >
                              <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                  <h4 className="font-medium">{event.title}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {event.description}
                                  </p>
                                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <IconClock className="h-3 w-3" />
                                    <span>
                                      {format(new Date(event.start_date), 'HH:mm')} - 
                                      {format(new Date(event.end_date), 'HH:mm')}
                                    </span>
                                  </div>
                                  {event.location && (
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                      <IconMapPin className="h-3 w-3" />
                                      <span>{event.location}</span>
                                    </div>
                                  )}
                                </div>
                                <Badge className={getEventTypeColor(event.type)}>
                                  {getEventTypeLabel(event.type)}
                                </Badge>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-muted-foreground text-center py-4">
                            No events scheduled for this date
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Stats */}
                  <Card>
                    <CardHeader>
                      <CardTitle>This Week</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Meetings</span>
                          <span className="text-sm font-medium">
                            {events.filter(e => e.type === 'meeting').length}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Deadlines</span>
                          <span className="text-sm font-medium">
                            {events.filter(e => e.type === 'deadline').length}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Milestones</span>
                          <span className="text-sm font-medium">
                            {events.filter(e => e.type === 'milestone').length}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
} 