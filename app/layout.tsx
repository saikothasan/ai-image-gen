import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Inter } from "next/font/google"; // Import the Inter font
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter", // Add Inter font for a sleek, modern look
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Image Generator | Diffusion-based Text-to-Image by Stability AI",
  description: "Create stunning images from text prompts with Stability AI's powerful diffusion model. Generate art, illustrations, and designs effortlessly.",
  keywords: "AI image generator, text-to-image, Stable Diffusion, Stability AI, AI art, image generation, machine learning, creative design",
  openGraph: {
    title: "AI Image Generator | Stability AI",
    description: "Create stunning images from text prompts with Stability AI's powerful diffusion model.",
    url: "https://yourwebsite.com",
    images: [
      {
        url: "/c777875d-a605-438f-a308-061befa92da0.webp", // Corrected to 'images' and used the URL
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Image Generator | Stability AI",
    description: "Generate images from text prompts with Stability AI's diffusion model.",
    images: [
      {
        url: "/c777875d-a605-438f-a308-061befa92da0.webp", // Corrected to 'images' and used the URL
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* You can also add meta tags for SEO */}
        <meta name="robots" content="index, follow" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
