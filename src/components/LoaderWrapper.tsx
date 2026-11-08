"use client"

import { useEffect, useState } from "react";
import Loading from "./Loading";
import { useLoading } from "@/contexts/LoadingContext";

export default function LoaderWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const { setIsLoading } = useLoading();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [setIsLoading]);

  if (loading) {
    return <Loading />;
  }

  return <>{children}</>;
}
