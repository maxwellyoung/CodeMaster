import React from "react";

type RemainingRequestsProps = {
  count: number;
};

const RemainingRequests: React.FC<RemainingRequestsProps> = ({ count }) => {
  return (
    <div className="text-center text-lightText mb-8">
      <p>You have {count} remaining requests for today.</p>
    </div>
  );
};

export default RemainingRequests;
