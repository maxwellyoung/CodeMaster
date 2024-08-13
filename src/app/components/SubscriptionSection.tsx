"use client";
import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";

type SubscriptionSectionProps = {
  status: "paid" | "free";
};

const SubscriptionSection: React.FC<SubscriptionSectionProps> = ({
  status,
}) => {
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);

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
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col items-center text-center text-[#171717] dark:text-white mb-12 p-8 bg-[#FCFCFC] dark:bg-[#1A1A1A] rounded-lg shadow-md w-full max-w-4xl">
      <h2 className="text-3xl font-bold mb-8 text-[#FF0342] dark:text-[#0DFFC5]">
        Choose Your Plan
      </h2>
      <div className="relative flex flex-col md:flex-row w-full items-start gap-12 md:gap-x-40">
        {/* Free Plan */}
        <div className="flex flex-col gap-6 md:gap-9 w-full md:w-[256px]">
          <div className="flex gap-3 flex-col w-full">
            <h3 className="text-lg font-semibold text-light-1000 dark:text-dark-1000 selection:bg-light-accent selection:text-light-200 dark:selection:bg-dark-accent dark:selection:text-dark-200">
              Free Plan
            </h3>
            <p className="text-sm text-light-900 dark:text-dark-900 leading-relaxed selection:bg-light-accent selection:text-light-200 dark:selection:bg-dark-accent dark:selection:text-dark-200 text-pretty">
              Access basic features to get started with our platform.
            </p>
          </div>
          <ul className="list-disc pl-5 text-left">
            <li className="text-sm text-light-900 dark:text-dark-900">
              Limited access to features
            </li>
            <li className="text-sm text-light-900 dark:text-dark-900">
              Community support
            </li>
            <li className="text-sm text-light-900 dark:text-dark-900">
              5 projects limit
            </li>
          </ul>
        </div>

        {/* Separator */}
        <Separator orientation="vertical" className="hidden md:block h-full" />
        <Separator
          orientation="horizontal"
          className="block md:hidden w-full"
        />

        {/* Paid Plan */}
        <div className="flex flex-col gap-6 md:gap-9 w-full md:w-[256px]">
          <div className="flex gap-3 flex-col w-full">
            <h3 className="text-lg font-semibold text-light-1000 dark:text-dark-1000 selection:bg-light-accent selection:text-light-200 dark:selection:bg-dark-accent dark:selection:text-dark-200">
              Paid Plan
            </h3>
            <p className="text-sm text-light-900 dark:text-dark-900 leading-relaxed selection:bg-light-accent selection:text-light-200 dark:selection:bg-dark-accent dark:selection:text-dark-200 text-pretty">
              Unlock all features and enjoy premium support.
            </p>
          </div>
          <ul className="list-disc pl-5 text-left">
            <li className="text-sm text-light-900 dark:text-dark-900">
              Unlimited access to all features
            </li>
            <li className="text-sm text-light-900 dark:text-dark-900">
              Priority support
            </li>
            <li className="text-sm text-light-900 dark:text-dark-900">
              Unlimited projects
            </li>
            <li className="text-sm text-light-900 dark:text-dark-900">
              Access to exclusive resources
            </li>
          </ul>
        </div>
      </div>

      {status === "free" && (
        <div className="mt-10">
          <Button
            onClick={handleUpgrade}
            className={`py-3 px-6 rounded-full bg-gradient-to-r from-[#FF0342] to-[#FF5C00] dark:from-[#0DFFC5] dark:to-[#03EDB5] text-white transition-transform transform hover:scale-105 shadow-lg ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Redirecting..." : "Upgrade Now"}
          </Button>
        </div>
      )}
    </section>
  );
};

export default SubscriptionSection;
