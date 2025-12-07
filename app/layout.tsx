import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { ThemeProvider } from "@/components/Provider";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import profile from "@/content/profile.json";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from '@vercel/analytics/next';

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const title = "Om Shah | Builder & Mathematics Major";
const description =
  "Portfolio of Om Shah — Mathematics major, builder, and full stack developer researching math behind AI and machine learning.";
const avatarUrl = profile.avatarUrl || "/pfp.jpg";
const avatarAlt = profile.avatarAlt || "Om Shah profile photo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Om Shah",
    template: "%s | Om Shah",
  },
  description,
  keywords: ["Om Shah", "portfolio", "mathematics", "developer", "AI", "machine learning", "MaiOmmHoon"],
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Om Shah",
    type: "website",
    images: [
      {
        url: avatarUrl,
        width: 400,
        height: 400,
        alt: avatarAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@maiommhoon",
    images: [avatarUrl],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${manrope.variable} font-sans antialiased bg-background text-foreground min-h-screen flex flex-col items-center`}
      >
        {/* Background noise texture */}
        <div className="fixed inset-0 -z-50 w-full h-full pointer-events-none">
          <Image
            src="/noise.svg"
            alt=""
            fill
            className="object-cover opacity-85 dark:invert-0 invert"
            priority
          />
        </div>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScroll />
          <ScrollProgress />
          {children}
          <SpeedInsights />
          <Analytics />
          <Navbar />
        </ThemeProvider>
      </body>
    </html>
  );
}
