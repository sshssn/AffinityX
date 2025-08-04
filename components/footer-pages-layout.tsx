"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

export function FooterPageLayout() {
  const [activePage, setActivePage] = useState('about');

  const pages = [
    { id: 'privacy', title: 'Privacy Policy' },
    { id: 'terms', title: 'Terms of Service' },
    { id: 'about', title: 'About Us' },
  ];

  const renderContent = () => {
    switch (activePage) {
      case 'about':
        return (
          <div className="space-y-8">
            <h1 className="text-3xl font-bold tracking-tight">About Us</h1>
            
            <div className="space-y-8 text-muted-foreground">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">TheAffinityLabs</h2>
                <p className="text-lg leading-relaxed">
                  TheAffinityLabs is a forward-thinking technology company dedicated to transforming businesses 
                  through innovative software solutions. We specialize in creating custom applications that 
                  drive growth, efficiency, and competitive advantage for our clients.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Our Mission</h3>
                <p className="leading-relaxed">
                  To empower businesses with cutting-edge technology solutions that streamline operations, 
                  enhance productivity, and create meaningful user experiences. We believe in building 
                  software that not only meets current needs but anticipates future challenges.
                </p>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">AffinityX</h2>
                <p className="text-lg leading-relaxed">
                  AffinityX is our flagship project management and collaboration platform designed specifically 
                  for modern businesses. It&apos;s more than just a tool—it&apos;s a comprehensive solution that brings 
                  together project management, team collaboration, and business analytics in one seamless platform.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">What Makes AffinityX Special</h3>
                <ul className="list-disc list-inside space-y-2 leading-relaxed">
                  <li><strong>Intuitive Design:</strong> Built with user experience in mind, making complex project management simple</li>
                  <li><strong>Real-time Collaboration:</strong> Teams can work together seamlessly with live updates and communication</li>
                  <li><strong>Advanced Analytics:</strong> Powerful insights to help you make data-driven decisions</li>
                  <li><strong>Scalable Architecture:</strong> Grows with your business, from startups to enterprise</li>
                  <li><strong>Security First:</strong> Enterprise-grade security to protect your sensitive data</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Our Technology Stack</h3>
                <p className="leading-relaxed">
                  We leverage the latest technologies including Next.js, React Native, Python, AWS, and more 
                  to ensure AffinityX delivers exceptional performance, reliability, and user experience.
                </p>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">Our Team</h2>
                <p className="leading-relaxed">
                  Founded by sshssn, TheAffinityLabs brings together passionate developers, designers, and 
                  business strategists who are committed to delivering excellence in every project we undertake.
                </p>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">Get in Touch</h2>
                <p className="leading-relaxed">
                  Ready to transform your business with our technology solutions? Contact us to discuss 
                  how we can help you achieve your goals.
                </p>
                <p className="leading-relaxed">
                  Email: <a href="mailto:hello@theaffinitylabs.com" className="text-primary hover:underline">hello@theaffinitylabs.com</a>
                </p>
              </div>
            </div>
          </div>
        );
      
      case 'terms':
        return (
          <div className="space-y-8">
            <h1 className="text-3xl font-bold tracking-tight">Terms of Service</h1>
            
            <div className="space-y-8 text-muted-foreground">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">1. Acceptance of Terms</h2>
                <p className="leading-relaxed">
                  By accessing and using AffinityX, you accept and agree to be bound by the terms and provision of this agreement.
                </p>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">2. Use License</h2>
                <p className="leading-relaxed">
                  Permission is granted to temporarily download one copy of the materials (information or software) on AffinityX&apos;s website for personal, non-commercial transitory viewing only.
                </p>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">3. Disclaimer</h2>
                <p className="leading-relaxed">
                  The materials on AffinityX&apos;s website are provided on an &apos;as is&apos; basis. AffinityX makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">4. Limitations</h2>
                <p className="leading-relaxed">
                  In no event shall AffinityX or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on AffinityX&apos;s website, even if AffinityX or a AffinityX authorized representative has been notified orally or in writing of the possibility of such damage.
                </p>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">5. Revisions and Errata</h2>
                <p className="leading-relaxed">
                  The materials appearing on AffinityX&apos;s website could include technical, typographical, or photographic errors. AffinityX does not warrant that any of the materials on its website are accurate, complete or current.
                </p>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">6. Links</h2>
                <p className="leading-relaxed">
                  AffinityX has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by AffinityX of the site.
                </p>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">7. Site Terms of Use Modifications</h2>
                <p className="leading-relaxed">
                  AffinityX may revise these terms of use for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these Terms and Conditions of Use.
                </p>
              </div>
            </div>
          </div>
        );
      
      case 'privacy':
        return (
          <div className="space-y-8">
            <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
            
            <div className="space-y-8 text-muted-foreground">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">1. Information We Collect</h2>
                <p className="leading-relaxed">
                  We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.
                </p>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">2. How We Use Your Information</h2>
                <p className="leading-relaxed">
                  We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to develop new features.
                </p>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">3. Information Sharing</h2>
                <p className="leading-relaxed">
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.
                </p>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">4. Data Security</h2>
                <p className="leading-relaxed">
                  We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">5. Cookies and Tracking</h2>
                <p className="leading-relaxed">
                  We use cookies and similar tracking technologies to enhance your experience and collect information about how you use our services.
                </p>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">6. Your Rights</h2>
                <p className="leading-relaxed">
                  You have the right to access, correct, or delete your personal information. You can also opt out of certain communications and data collection.
                </p>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">7. Changes to This Policy</h2>
                <p className="leading-relaxed">
                  We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.
                </p>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">8. Contact Us</h2>
                <p className="leading-relaxed">
                  If you have any questions about this privacy policy, please contact us at <a href="mailto:hello@theaffinitylabs.com" className="text-primary hover:underline">hello@theaffinitylabs.com</a>
                </p>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Back to Home Button */}
      <div className="absolute top-6 left-6 z-50">
        <Link href="/">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>

      {/* Floating Container */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-4xl"
        >
          <Card className="shadow-2xl border-0 bg-card/80 backdrop-blur-xl">
            <CardHeader className="pb-0">
              <Tabs value={activePage} onValueChange={(value) => setActivePage(value as string)} className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-muted/50">
                  {pages.map((page) => (
                    <TabsTrigger key={page.id} value={page.id} className="text-sm font-medium">
                      {page.title}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </CardHeader>
            
            <CardContent className="pt-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePage}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderContent()}
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
} 