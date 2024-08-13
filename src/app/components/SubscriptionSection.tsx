"use client";
import React, { useState } from "react";

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
    <section className="text-center text-lightText mb-8">
      <p className="text-lg mb-4">
        You are currently on the{" "}
        <strong className="text-white">
          {status === "paid" ? "Paid" : "Free"}
        </strong>{" "}
        plan.
      </p>
      {status === "free" && (
        <button
          onClick={handleUpgrade}
          className={`py-3 px-6 bg-primary text-white rounded-full shadow-lg hover:bg-primary-light transition-colors duration-300 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Redirecting..." : "Upgrade Now"}
        </button>
      )}
    </section>
  );
};

export default SubscriptionSection;
