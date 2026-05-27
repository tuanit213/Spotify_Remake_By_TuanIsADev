import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Spytifo",
  description: "A Spotify-inspired music frontend built with Next.js, Tailwind CSS, and Framer Motion.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
