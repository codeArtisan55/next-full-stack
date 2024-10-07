"use client"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { Button } from "./ui/button"
import AlertDialogue from "@/components/alertDialogue"
import { useRouter } from "next/navigation"

const Navbar =  () => {
  const router=useRouter()
  const {data:session , status}= useSession()
  return (
    <>
    <div className="w-full flex justify-between p-4">

      {session ? (
        <>
        <Link href='/'>
        <h1 className="text-2xl font-bold capitalize">{session.user.username ?? 'no user name'}</h1>
        </Link>
        <div className="flex space-x-3">
          <Link href="/dashboard">
        <Button variant="outline">Dashboard</Button>
          </Link>
          <Link href="/users">
        <Button variant="outline">Users</Button>
          </Link>
        <AlertDialogue/>
        </div>
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