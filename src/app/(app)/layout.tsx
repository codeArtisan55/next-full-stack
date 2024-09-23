"use client"
import {useSession} from "next-auth/react"
import { redirect } from "next/navigation";
import { Loader2 } from 'lucide-react';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

    const {data:session, status} = useSession()
    if(status === "loading"){
        return <div className="text-4xl"><Loader2 className="animate-spin"/></div>
    }
    if(!session){
        redirect("/signin")
    }
  return(
    <div>
      {children}
    </div>
  )
}

