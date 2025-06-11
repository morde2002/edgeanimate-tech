import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "EaseAnimateUX - Where Innovation Meets Animation",
  description:
    "Transform your ideas into stunning, animated web experiences that captivate users and drive business growth.",
  icons: {
    icon: "/images/favicon.ico",            // standard favicon
    shortcut: "/images/favicon.ico",        // <link rel="shortcut icon">
    apple: "/images/apple-touch-icon.png",  // if you have an apple-touch-icon
    // You can also specify others, e.g.:
    // other: [
    //   { rel: "icon", url: "/favicon-32x32.png", sizes: "32x32" },
    //   { rel: "icon", url: "/favicon-16x16.png", sizes: "16x16" },
    // ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
