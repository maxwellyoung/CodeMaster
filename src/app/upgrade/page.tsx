"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const UpgradePage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpgrade = async () => {
    setLoading(true); // Set loading to true when the process starts

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

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url; // Redirect to the Stripe checkout page
      } else {
        console.error("No URL returned for checkout session");
        setLoading(false); // Stop loading if there's an error
      }
    } catch (error) {
      console.error("Error during checkout session creation", error);
      setLoading(false); // Stop loading if there's an error
    }
  };

  return (
    <button
      onClick={handleUpgrade}
      className={`py-3 px-6 bg-primary text-white rounded-lg shadow-lg hover:bg-primaryHover ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={loading}
    >
      {loading ? "Redirecting..." : "Upgrade Now"}
    </button>
  );
};

export default UpgradePage;
