// src/app/components/SuccessDisplay.tsx
import React from "react";

const SuccessDisplay = ({ sessionId }: { sessionId: string }) => {
  const handleBillingPortal = async () => {
    const response = await fetch("/api/create-portal-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ session_id: sessionId }),
    });

    const session = await response.json();

    if (session.url) {
      window.location.href = session.url;
    }
  };

  return (
    <section>
      <h3>Subscription to starter plan successful!</h3>
      <button onClick={handleBillingPortal}>
        Manage your billing information
      </button>
    </section>
  );
};

export default SuccessDisplay;
