"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ExternalLink, 
  Sparkles, 
  MessageSquare, 
  ArrowRight, 
  X,
  Shield,
  Zap,
  Bot,
  Globe
} from 'lucide-react';
import { GlowingEffect } from '@/components/ui/glowing-effect';

interface ExternalLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
  title: string;
  description: string;
  url: string;
  platformName: string;
}

export function ExternalLinkModal({
  isOpen,
  onClose,
  onProceed,
  title,
  description,
  url,
  platformName
}: ExternalLinkModalProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleProceed = () => {
    onProceed();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="sm:max-w-lg p-0 overflow-hidden border-0 bg-transparent">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative"
            >
              <GlowingEffect
                spread={60}
                glow={true}
                disabled={false}
                proximity={100}
                inactiveZone={0.01}
                borderWidth={2}
              />
              
              <div className="relative bg-gradient-to-br from-background via-muted/20 to-background backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl p-8">
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-colors z-10"
                >
                  <X className="h-4 w-4" />
                </button>

                {/* Header */}
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="flex justify-center mb-6"
                  >
                    <div className="relative">
                      <div className="p-4 rounded-full bg-gradient-to-r from-primary/20 via-primary/15 to-primary/10 border border-primary/30 shadow-lg">
                        <Bot className="h-8 w-8 text-primary" />
                      </div>
                      <motion.div
                        animate={{ 
                          scale: isHovered ? 1.2 : 1,
                          rotate: isHovered ? 10 : 0 
                        }}
                        transition={{ duration: 0.3 }}
                        className="absolute -top-2 -right-2 p-2 rounded-full bg-green-500/20 border border-green-500/30 shadow-lg"
                      >
                        <Sparkles className="h-4 w-4 text-green-500" />
                      </motion.div>
                    </div>
                  </motion.div>
                  
                  <Badge variant="secondary" className="mb-4 px-3 py-1 text-xs">
                    <Globe className="h-3 w-3 mr-1" />
                    Our Platform
                  </Badge>
                  
                  <h2 className="text-2xl font-bold tracking-tight mb-3 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
                    {title}
                  </h2>
                  
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {description}
                  </p>
                </div>

                {/* Platform Info */}
                <motion.div
                  onHoverStart={() => setIsHovered(true)}
                  onHoverEnd={() => setIsHovered(false)}
                  className="bg-gradient-to-r from-primary/5 via-primary/8 to-primary/5 border border-primary/20 rounded-xl p-6 mb-6 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                      <MessageSquare className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-lg">{platformName}</h3>
                      <p className="text-sm text-muted-foreground">Advanced AI Chat Experience</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground bg-background/50 rounded-lg px-3 py-2 border border-white/10">
                    <ExternalLink className="h-4 w-4" />
                    <span className="font-mono text-xs">{url}</span>
                  </div>
                </motion.div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 gap-3 mb-8">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-green-500/5 border border-green-500/10"
                  >
                    <div className="p-2 rounded-full bg-green-500/10">
                      <Zap className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Lightning Fast Responses</p>
                      <p className="text-xs text-muted-foreground">Get instant AI-powered answers</p>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-blue-500/5 border border-blue-500/10"
                  >
                    <div className="p-2 rounded-full bg-blue-500/10">
                      <Shield className="h-4 w-4 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Enterprise Security</p>
                      <p className="text-xs text-muted-foreground">Your conversations are protected</p>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-purple-500/5 border border-purple-500/10"
                  >
                    <div className="p-2 rounded-full bg-purple-500/10">
                      <Sparkles className="h-4 w-4 text-purple-500" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Advanced AI Capabilities</p>
                      <p className="text-xs text-muted-foreground">State-of-the-art language models</p>
                    </div>
                  </motion.div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={onClose}
                    className="flex-1 h-11"
                  >
                    Stay Here
                  </Button>
                  <Button
                    onClick={handleProceed}
                    className="flex-1 h-11 gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg"
                  >
                    <span>Launch Platform</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
} 