import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Tracer — Algorithm Visualizer",
  description: "Learn algorithms interactively with AI-powered step-by-step explanations",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-white antialiased overflow-x-hidden">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}