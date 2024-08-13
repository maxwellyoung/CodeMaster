import React from "react";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import Header from "./components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CodeMaster: Your AI-Powered Coding Practice Tool",
  description:
    "Sharpen your coding skills with AI-generated challenges and practice exercises.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={inter.className}>
        <body className="min-h-screen font-sans antialiased ">
          <Header />
          <main className="flex-grow">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
