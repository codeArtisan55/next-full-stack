"use client"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { Button } from "./ui/button"
import AlertDialogue from "@/components/alertDialogue"
// import  SignOut  from "@/utilities/signOut"
// import { signOut } from "@/auth" // this is server component , which is used in "use server"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

const Navbar =  () => {
  const router=useRouter()
  const {data:session , status}= useSession()
  return (
    <>
    <div className="w-full flex justify-between p-4">

      {session ? (
        <>
        <h1 className="text-2xl font-bold capitalize">{session.user.username ?? 'no user name'}</h1>
        <AlertDialogue/>
        </>
      ):(
        <Link href='/signin'>
        <Button>SigIn</Button>
         </Link>

      )}

    </div>
    </>
  )
}

export default Navbar









{/* <form action={async()=>{
  const res=await signOut({redirect:false})
  if(res){
    router.replace("/")
  }
}}>

</form> */}