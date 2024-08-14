"use client";

import React, { useState, useEffect } from "react";
import {
  useUser,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import {
  fetchRemainingRequests,
  fetchSubscriptionStatus,
} from "../../utils/userInfo";
import Link from "next/link";

const Header: React.FC = () => {
  const { user } = useUser();
  const [remainingRequests, setRemainingRequests] = useState<number>(0);
  const [subscriptionStatus, setSubscriptionStatus] = useState<string>("free");

  // Fetch user subscription status and remaining requests
  useEffect(() => {
    if (user) {
      const fetchUserInfo = async () => {
        const remaining = await fetchRemainingRequests();
        const status = await fetchSubscriptionStatus();

        setRemainingRequests(remaining);
        setSubscriptionStatus(status);
      };
      fetchUserInfo();
    }
  }, [user]);

  const handleUpgrade = async () => {
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lookup_key: "your-lookup-key" }),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const { url } = await response.json();

      if (url) {
        window.location.href = url;
      } else {
        throw new Error("No URL returned for checkout session");
      }
    } catch (error) {
      console.error("Error during checkout session creation:", error);
    }
  };

  return (
    <header className="w-full flex justify-between items-center p-4 bg-white dark:bg-gray-950 shadow-md">
      <div className="flex items-center space-x-4">
        <div className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">
          <Link href="/">CodeMaster</Link>
        </div>
        <div className="hidden md:flex items-center space-x-2 text-sm sm:text-md font-medium text-gray-900 dark:text-gray-100">
          <div>
            Current Plan:{" "}
            <span className="text-orange-500 dark:text-orange-400 ">
              {subscriptionStatus}
            </span>
          </div>
          <div>
            | Remaining Requests:{" "}
            <span className="text-orange-500 dark:text-orange-400">
              {remainingRequests}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <SignedIn>
          <button
            onClick={handleUpgrade}
            className=" hover:bg-gradient-to-r duration-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded-lg shadow-inner transition-all border border-orange-500 dark:border-orange-400 px-2 py-1 "
          >
            Upgrade
          </button>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <button className="py-2 px-4 bg-gradient-to-r from-[#FF6B00] to-[#FF5C00] hover:bg-gradient-to-r hover:from-[#FF5C00] hover:to-[#FF6B00] text-white rounded-lg shadow-md transition-all">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
      </div>
    </header>
  );
};

export default Header;
