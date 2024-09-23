"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();

  if (!session) {
    redirect("/signin");
  }

  return <div>{children}</div>;
}
