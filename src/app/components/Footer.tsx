import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="py-4 text-gray-400 text-center">
      <p>
        &copy; {new Date().getFullYear()}{" "}
        <Link href={"ninetynine.digital"} className="hover:underline">
          ninetynine digital
        </Link>
        . All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
