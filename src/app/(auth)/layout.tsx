"use client"
import {useSession} from "next-auth/react"
import { redirect } from "next/navigation";

export default function RootLayout({children}:{children:React.ReactNode}){


    const {data:session, status} = useSession()

if (session){
    redirect("/dashboard")
}
    return(
        <div>
            {children}
        </div>
    )
}