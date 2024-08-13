import React from "react";

type SubscriptionSectionProps = {
  status: string;
};

const SubscriptionSection: React.FC<SubscriptionSectionProps> = ({
  status,
}) => {
  return (
    <div className="text-center text-lightText mb-8">
      <p>
        You are currently on the{" "}
        <strong>{status === "paid" ? "Paid" : "Free"}</strong> plan.
      </p>
      {status === "free" && (
        <a
          href="/upgrade"
          className="bg-primary text-white py-2 px-5 rounded-full transition-colors duration-300 hover:bg-primaryHover"
        >
          Upgrade Now
        </a>
      )}
    </div>
  );
};

export default SubscriptionSection;
