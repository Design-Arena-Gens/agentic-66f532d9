import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Social Media Agent",
  description: "AI-powered social media management across all platforms",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 min-h-screen">
        {children}
      </body>
    </html>
  );
}
