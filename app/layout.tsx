import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";
import { Instrument_Serif } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ThemeProvider } from "@/components/theme-provider";
import FractalTree from "@/components/ui/fractal-tree";
import dynamic from "next/dynamic";

const Chatbot = dynamic(() => import("@/components/chatbot"));


const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap", // 🛠 Fix font loading
});

export const metadata: Metadata = {
  metadataBase: new URL("https://krockxz.com"),
  title: "Kunal | Backend Systems Architect",
  description:
    "A perfect portfolio website template that showcases my skills and learning",
  openGraph: {
    title: "Kunal | Backend Systems Architect",
    description: "Backend systems architect who occasionally touches the frontend. Building AI tools and debugging why the LLM thinks it's a poet.",
    url: "https://krockxz.com",
    siteName: "Kunal's Portfolio",
    images: [
      {
        url: "/images/kunal.jpg",
        width: 800,
        height: 600,
        alt: "Kunal Roy Choudhury",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kunal | Backend Systems Architect",
    description: "Backend systems architect building AI tools.",
    creator: "@kunalgoesbyken",
    images: ["/images/kunal.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>{/* 🛠 Important for dark mode */}
      <body
        suppressHydrationWarning
        className={`${instrumentSerif.className} antialiased bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300 [--pattern-fg:var(--color-neutral-200)]`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Analytics />
          <SpeedInsights />
          <FractalTree />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Chatbot />
        </ThemeProvider>
      </body>
    </html>
  );
}
