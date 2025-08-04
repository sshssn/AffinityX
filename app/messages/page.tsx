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
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { ScrollArea } from "../../components/ui/scroll-area"
import { IconPlus, IconSend, IconSearch, IconUser, IconClock, IconMessage, IconMail, IconArrowLeft } from "@tabler/icons-react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"

interface Message {
  id: number;
  content: string;
  sender_id: number;
  sender_name: string;
  sender_avatar?: string;
  project_id: number;
  created_at: string;
  is_read: boolean;
}

interface Conversation {
  id: number;
  title: string;
  participants: number[];
  last_message?: Message;
  unread_count: number;
}

export default function MessagesPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (user && !loading) {
      loadConversations();
    }
  }, [user, loading]);

  useEffect(() => {
    if (selectedConversation) {
      loadMessages(selectedConversation.id);
    }
  }, [selectedConversation]);

  const loadConversations = async () => {
    try {
      const response = await fetch('/api/messages/conversations');
      if (response.ok) {
        const data = await response.json();
        setConversations(data);
      }
    } catch (error) {
      console.error('Error loading conversations:', error);
    }
  };

  const loadMessages = async (conversationId: number) => {
    try {
      const response = await fetch(`/api/messages/conversations/${conversationId}`);
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          conversation_id: selectedConversation.id,
          content: newMessage,
        }),
      });

      if (response.ok) {
        setNewMessage('');
        loadMessages(selectedConversation.id);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <p className="text-muted-foreground">Please sign in to access messages.</p>
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
                    <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
                    <p className="text-muted-foreground">
                      Communicate with your team and clients
                    </p>
                  </div>
                </div>
                <Button>
                  <IconPlus className="mr-2 h-4 w-4" />
                  New Conversation
                </Button>
              </div>

              {/* Messages Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-300px)]">
                {/* Conversations List */}
                <div className="lg:col-span-1">
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>Conversations</CardTitle>
                      <div className="relative">
                        <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search conversations..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <ScrollArea className="h-[calc(100vh-400px)]">
                        <div className="space-y-1">
                          {filteredConversations.map((conversation) => (
                            <div
                              key={conversation.id}
                              className={`p-4 cursor-pointer hover:bg-accent transition-colors ${
                                selectedConversation?.id === conversation.id ? 'bg-accent' : ''
                              }`}
                              onClick={() => setSelectedConversation(conversation)}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium truncate">{conversation.title}</h4>
                                  {conversation.last_message && (
                                    <p className="text-sm text-muted-foreground truncate">
                                      {conversation.last_message.content}
                                    </p>
                                  )}
                                </div>
                                <div className="flex flex-col items-end space-y-1">
                                  {conversation.unread_count > 0 && (
                                    <Badge variant="destructive" className="text-xs">
                                      {conversation.unread_count}
                                    </Badge>
                                  )}
                                  {conversation.last_message && (
                                    <span className="text-xs text-muted-foreground">
                                      {format(new Date(conversation.last_message.created_at), 'HH:mm')}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </div>

                {/* Messages */}
                <div className="lg:col-span-2">
                  <Card className="h-full flex flex-col">
                    {selectedConversation ? (
                      <>
                        <CardHeader>
                          <CardTitle>{selectedConversation.title}</CardTitle>
                          <CardDescription>
                            Project communication
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 p-0">
                          <ScrollArea className="h-[calc(100vh-500px)] p-4">
                            <div className="space-y-4">
                              {messages.map((message) => (
                                <div
                                  key={message.id}
                                  className={`flex gap-3 ${
                                    message.sender_id === user.id ? 'justify-end' : 'justify-start'
                                  }`}
                                >
                                  {message.sender_id !== user.id && (
                                    <Avatar className="h-8 w-8">
                                      <AvatarImage src={message.sender_avatar} />
                                      <AvatarFallback>
                                        {message.sender_name.charAt(0).toUpperCase()}
                                      </AvatarFallback>
                                    </Avatar>
                                  )}
                                  <div
                                    className={`max-w-[70%] space-y-1 ${
                                      message.sender_id === user.id ? 'text-right' : 'text-left'
                                    }`}
                                  >
                                    <div
                                      className={`inline-block p-3 rounded-lg ${
                                        message.sender_id === user.id
                                          ? 'bg-primary text-primary-foreground'
                                          : 'bg-muted'
                                      }`}
                                    >
                                      <p className="text-sm">{message.content}</p>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                      <IconClock className="h-3 w-3" />
                                      <span>
                                        {format(new Date(message.created_at), 'MMM d, HH:mm')}
                                      </span>
                                    </div>
                                  </div>
                                  {message.sender_id === user.id && (
                                    <Avatar className="h-8 w-8">
                                      <AvatarImage src={user.avatar_url} />
                                      <AvatarFallback>
                                        {user.name.charAt(0).toUpperCase()}
                                      </AvatarFallback>
                                    </Avatar>
                                  )}
                                </div>
                              ))}
                            </div>
                          </ScrollArea>
                        </CardContent>
                        <div className="p-4 border-t">
                          <div className="flex gap-2">
                            <Textarea
                              placeholder="Type your message..."
                              value={newMessage}
                              onChange={(e) => setNewMessage(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                  e.preventDefault();
                                  sendMessage();
                                }
                              }}
                              className="min-h-[60px]"
                            />
                            <Button onClick={sendMessage} size="icon">
                              <IconSend className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="flex-1 flex items-center justify-center">
                        <div className="text-center">
                          <IconMessage className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                          <h3 className="text-lg font-medium">Select a conversation</h3>
                          <p className="text-muted-foreground">
                            Choose a conversation from the list to start messaging
                          </p>
                        </div>
                      </div>
                    )}
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