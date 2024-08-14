import React from "react";
import "./globals.css";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
} from "@clerk/nextjs";
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
        <body className="min-h-screen font-sans antialiased">
          <SignedIn>
            <Header />
            <main className="flex-grow">{children}</main>
          </SignedIn>
          <SignedOut>
            <main className="flex-grow flex items-center justify-center ">
              <div className="text-center">
                <div className="flex flex-col items-center justify-center min-h-screen text-center bg-light-gradient dark:bg-gray w-screen h-screen">
                  <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                    Welcome to CodeMaster
                  </h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                    Please sign in to access your coding practice tool.
                  </p>
                  <SignInButton>
                    <button className="py-3 px-6 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 transition-all">
                      Sign In
                    </button>
                  </SignInButton>
                </div>
              </div>
            </main>
          </SignedOut>
        </body>
      </html>
    </ClerkProvider>
  );
}
