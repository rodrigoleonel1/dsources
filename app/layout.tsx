import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dsources — Recursos para desarrolladores",
  description:
    "Encuentra recursos para desarrolladores: cursos, challenges, herramientas, documentación, diseño, inspiración, blogs, APIs, librerías y repositorios.",
  keywords: [
    "recursos para desarrolladores",
    "cursos de programación",
    "retos de frontend",
    "herramientas dev",
    "documentación",
    "diseño UI",
    "APIs",
    "librerías",
    "repositorios",
    "blogs de programación",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
