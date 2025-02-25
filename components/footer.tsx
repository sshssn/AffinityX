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

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-6">Solutions</h3>
            {/* Add footer links */}
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-6">Resources</h3>
            {/* Add footer links */}
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-6">Contact</h3>
            {/* Add contact info */}
          </div>
        </div>
      </div>
    </footer>
  );
} 