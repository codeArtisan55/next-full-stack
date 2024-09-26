"use client"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { redirect, useRouter } from "next/navigation"
import { signOut } from "next-auth/react"
import { Button } from "./ui/button"
import { tree } from "next/dist/build/templates/app-page"

  const AlertDialogue = () => {
    const router=useRouter()

    return (
      <div>
         <AlertDialog>
  <AlertDialogTrigger >
  <Button>SignOut</Button>
    </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Do you want to signout?</AlertDialogTitle>
      <AlertDialogDescription>
        Your are going to signout
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>

  <form  action={async()=>{
    const res=await signOut({redirect:true,callbackUrl:"/"})

  }}>
      <AlertDialogAction type="submit">Continue</AlertDialogAction>
      </form>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
      </div>
    )
  }

  export default AlertDialogue


