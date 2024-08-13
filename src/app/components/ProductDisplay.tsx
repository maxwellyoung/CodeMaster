// src/app/components/ProductDisplay.tsx
import React from "react";

const ProductDisplay = () => {
  const handleCheckout = async () => {
    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lookup_key: "Pro-b8c4e96" }),
    });

    const session = await response.json();

    if (session.url) {
      window.location.href = session.url;
    }
  };

  return (
    <section>
      <div className="product">
        <h3>Starter plan</h3>
        <h5>$20.00 / month</h5>
      </div>
      <button onClick={handleCheckout}>Checkout</button>
    </section>
  );
};

export default ProductDisplay;
