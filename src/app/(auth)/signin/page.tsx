"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useToast } from "@/components/ui/use-toast"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import {  redirect, useRouter } from "next/navigation"
import Link from "next/link"
import { signinSchema } from "@/schemas/SignInSchema"
import { signIn } from "next-auth/react"




const Signin=()=>{

  const router=useRouter()

     const {toast}=useToast()
  //state managements
  const [isformSubmitting,setIsformSubmitting]=useState(false)
  // const [result,setResult]=useState({})

  //   zod implementation
 const form= useForm({
  resolver:zodResolver(signinSchema), // provide the schema
  defaultValues:{
    identifier:'',
    password:''
  }
 })



const onSubmit=async (data:z.infer<typeof signinSchema>)=>{

  setIsformSubmitting(true)

  try {
    const result=await signIn("credentials",{ // signin from nextauth
      identifier:data.identifier,
      password:data.password,
      redirect:false,
    })
    console.log(result?.error);

    if(!result?.url){
      toast({
        title:"failed",
        description:"could not signin"
      })
      return
    }
    if (result?.url) {
        toast({
            title:"success",
            description:"login successful"
          })

        }
        redirect("/dashboard")


  } catch (error) {
    console.log(error);
    toast({
      title:"failed",
      description:"something went wrong"
    })
  }finally{
  setIsformSubmitting(false)

  }


}
return (
  <>
<div className="flex items-start justify-center h-3/5 w-full overflow-hidden">
  <div className="w-96 m-2 h-4/5 shadow-md rounded-md px-8  p-4 space-y-20 bg-white">
  <div className="text-center">
  <h2 className="text-4xl text-black capitalize font-bold m-2 ">Get In</h2>

  </div>
  <Form  {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
  control={form.control}
  name="identifier"
  render={({ field }) => (
    <FormItem>
      <FormLabel>use email or password</FormLabel>
      <FormControl>
        <Input placeholder="email or password" {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
  <FormField
  control={form.control}
  name="password"
  render={({ field }) => (
    <FormItem>
      <FormLabel>password</FormLabel>
      <FormControl>
        <Input placeholder="password" {...field}  />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
<Button variant="secondary" type="submit" disabled={isformSubmitting} >{isformSubmitting ? (<><Loader2 className="animate-spin"  /> please wait </> ):"Signin"}</Button>
</form>
<div className="text-center text-secondary">
  <h1>New on this platform ? <Link className="font-bold" href='/signup'>signup</Link> </h1>
</div>
    </Form>

  </div>

</div>
</>)

}


export default Signin