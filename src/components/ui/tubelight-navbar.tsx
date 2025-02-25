'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface NavItem {
  title: string;
  href: string;
}

interface TubelightNavbarProps {
  items?: NavItem[];
  className?: string;
}

export function TubelightNavbar({ items = [], className }: TubelightNavbarProps) {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  return (
    <nav
      className={cn(
        'relative flex items-center space-x-4 px-4 py-2',
        className
      )}
    >
      {items.map((item, index) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'relative px-4 py-2 text-sm font-medium transition-colors',
            'hover:text-foreground/80',
            activeIndex === index ? 'text-foreground' : 'text-foreground/60'
          )}
          onMouseEnter={() => setActiveIndex(index)}
          onMouseLeave={() => setActiveIndex(null)}
        >
          {item.title}
          {activeIndex === index && (
            <div
              className="absolute inset-0 -z-10 rounded-md bg-gradient-to-r from-purple-500/20 via-transparent to-transparent"
              style={{
                animation: 'tubelight 0.5s ease-out forwards',
              }}
            />
          )}
        </Link>
      ))}

      <style jsx global>{`
        @keyframes tubelight {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </nav>
  );
}