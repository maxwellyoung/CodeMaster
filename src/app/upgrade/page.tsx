"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const UpgradePage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpgrade = async () => {
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lookup_key: "your-lookup-key" }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("No URL returned for checkout session");
      }
    } catch (error) {
      console.error("Error during checkout session creation", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-dark-gradient">
      <h1 className="text-3xl font-bold mb-6">Upgrade to Pro Plan</h1>
      <p className="mb-4">
        Get access to unlimited questions and premium features.
      </p>
      <button
        onClick={handleUpgrade}
        className="py-3 px-6 bg-primary text-white rounded-lg shadow-lg hover:bg-primaryHover"
        disabled={loading}
      >
        {loading ? "Redirecting..." : "Upgrade Now"}
      </button>
    </div>
  );
};

export default UpgradePage;
