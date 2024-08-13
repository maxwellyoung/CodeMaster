import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoaded, userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !userId) {
      router.push("/sign-in"); // Redirect to the sign-in page if not authenticated
    }
  }, [isLoaded, userId, router]);

  if (!isLoaded || !userId) {
    return null; // Show a loading state while checking authentication
  }

  return <>{children}</>;
};

export default AuthGuard;
