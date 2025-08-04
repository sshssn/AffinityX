"use client";

import { Button } from "../components/ui/button"
import { IconArrowLeft } from "@tabler/icons-react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import Image from "next/image"

export default function NotFound() {
  const router = useRouter();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Back to Home button in left upper corner */}
      <div className="absolute top-6 left-6 z-10">
        <Button 
          onClick={() => router.push('/')}
          variant="outline"
          className="flex items-center gap-2 border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
        >
          <IconArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>
      </div>

      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-8 max-w-2xl mx-auto px-4">
          <div className="space-y-4">
            {mounted && (
              <div className="flex justify-center">
                <Image
                  src={theme === 'dark' ? "/Svg/404-dark.svg" : "/Svg/404.svg"}
                  alt="404 Error"
                  width={472}
                  height={158}
                  className="w-full max-w-md"
                />
              </div>
            )}
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Page Not Found</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              The page you&apos;re looking for doesn&apos;t exist or has been moved to a different location.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 