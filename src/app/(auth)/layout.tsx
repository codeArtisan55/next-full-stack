﻿"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();

  if (session) {
    redirect("/dashboard");
  }

  return <div>{children}</div>;
}
