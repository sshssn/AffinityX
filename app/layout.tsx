import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LoadingProvider } from "@/components/providers/LoadingProvider";
import { RootLoader } from "@/components/ui/root-loader";
import { Analytics } from "@vercel/analytics/react";
import ErrorBoundary from "@/components/error-boundary";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: {
    default: "AffinityX - Modern Enterprise Application Platform",
    template: "%s | AffinityX",
  },
  description: "A cutting-edge, enterprise-ready software services platform featuring stunning glass-morphism design, AI integration capabilities, and comprehensive modern web development tools.",
  keywords: [
    "enterprise software",
    "web development",
    "AI integration",
    "glass-morphism design",
    "modern web applications",
    "software services",
    "digital transformation",
  ],
  authors: [{ name: "Affinity Labs" }],
  creator: "Affinity Labs",
  publisher: "Affinity Labs",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://theaffinitylabs.com"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/favicon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://theaffinitylabs.com",
    title: "AffinityX - Modern Enterprise Application Platform",
    description: "A cutting-edge, enterprise-ready software services platform featuring stunning glass-morphism design, AI integration capabilities, and comprehensive modern web development tools.",
    siteName: "AffinityX",
    images: [
      {
        url: "https://theaffinitylabs.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AffinityX - Modern Enterprise Application Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AffinityX - Modern Enterprise Application Platform",
    description: "A cutting-edge, enterprise-ready software services platform featuring stunning glass-morphism design, AI integration capabilities, and comprehensive modern web development tools.",
    images: ["https://theaffinitylabs.com/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${manrope.className} ${manrope.variable} gpu-accelerated bg-white dark:bg-black`}>
        <ErrorBoundary>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <LoadingProvider>
              <RootLoader>
                {children}
              </RootLoader>
            </LoadingProvider>
            <Analytics />
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
