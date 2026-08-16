import type { Metadata } from "next";
import { Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const space = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kiran Sukumaran — Backend · DevOps · AI",
  description:
    "Technical Lead across backend engineering, DevOps, and AI. Node.js, TypeScript, AWS, Pulumi, and production AI systems. Based in Thiruvananthapuram.",
  openGraph: {
    title: "Kiran Sukumaran — Backend · DevOps · AI",
    description:
      "Production backends, cloud infrastructure, and AI systems.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${space.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ink text-ice">{children}</body>
    </html>
  );
}
