"use client";

import Loader from "@/components/Loader";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();

  if(status==="loading"){
    return  <Loader/>
  }

  if (!session) {
    redirect("/signin");
  }

  return <div>{children}</div>;
}
