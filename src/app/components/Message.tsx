// src/app/components/Message.tsx
import React from "react";

const Message = ({ message }: { message: string }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default Message;
