"use client"
import Link from "next/link"
import { useSession,signOut } from "next-auth/react"
import { auth } from "@/auth"
import {User} from "next-auth" // this contains all information set in session , from next-auth


import React from 'react'
import { Button } from "./ui/button"

const Navbar = async () => {

    const session=await auth() // this will only provide the sessioon is acive or not  and also data
    const user:User=session?.user

  return (
    <div className="w-full flex justify-between p-4">
        {
            session ? (
                <>
                <h1>Signed an as {user?.email || user?.username}</h1>
                <Button onClick={()=>signOut()}>
                    Signout
                </Button>
                </>
            ):(<Link href='/signin'>
                <Button>
                    Signin
                </Button>
            </Link>)
        }

    </div>
  )
}

export default Navbar
