// app/layout.tsx
"Use client" // This line is not necessary in Next.js 13+ with the app directory

import localFont from "next/font/local"
import { Inter } from "next/font/google"
import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })


export const metadata: Metadata = {
  title: "EdgeAnimate Tech – Where Innovation Meets Animation",
  description:
    "Transform your ideas into stunning, animated web experiences that captivate users and drive business growth.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
