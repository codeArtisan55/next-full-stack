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
import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"
import { Button } from "./ui/button"

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

  <form action={async()=>{ // use signout onsubmit as it will
    await signOut({redirect:true,callbackUrl:"/"}) // avoid using action for signout as it will cause a fail reload of the page

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


