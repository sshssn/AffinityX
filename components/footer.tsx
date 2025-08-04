import Link from 'next/link';

export function Footer() {
  return (
    <footer className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/0 via-gray-50/50 to-gray-50/0 dark:from-gray-900/0 dark:via-gray-900/50 dark:to-gray-900/0" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <h3 className="font-heading text-xl font-semibold mb-6">TheAffinityLabs</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Transforming businesses through innovative technology solutions.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Version: AffinityX v0.1<br />
              © 2024 TheAffinityLabs<br />
              Created by sshssn
            </p>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-6">Solutions</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/client/dashboard" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Project Management
                </Link>
              </li>
              <li>
                <Link href="/client/tasks" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Task Management
                </Link>
              </li>
              <li>
                <Link href="/client/projects" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Project Portfolio
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-6">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-6">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a href="mailto:hello@theaffinitylabs.com" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  hello@theaffinitylabs.com
                </a>
              </li>
              <li>
                <Link href="/auth" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Get Started
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
} 