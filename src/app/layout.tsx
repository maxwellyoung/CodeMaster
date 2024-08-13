import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "./lib/utils";
import { Toaster } from "./components/ui/toaster";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CodeMaster: Your AI-Powered Coding Practice Tool",
  description:
    "Sharpen your coding skills with AI-generated challenges and practice exercises.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn(
            "min-h-screen  font-sans antialiased ",
            inter.className
          )}
        >
          <header className="flex justify-between items-center p-4 bg-darkCard text-gray-400 shadow-lg">
            <div className="text-xl font-bold">CodeMaster</div>
            <div>
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </header>
          <main className="flex-grow">{children}</main>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
