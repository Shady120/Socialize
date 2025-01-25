'use client'
import nookies from "nookies";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, ReactNode } from "react";

export default function AuthGuard({ children }) {
  const router = useRouter();

  const token = nookies.get(null, "token").token;
  useEffect(() => {

    if (!token) {
      router.push("/Login");
    }
  }, [router]);

  
  
  return <>{children}</>;
  
}
