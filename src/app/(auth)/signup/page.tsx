"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useDebounceCallback } from 'usehooks-ts'
import { useToast } from "@/components/ui/use-toast"
import { signupSchema } from "@/schemas/SignUpSchema"
import axios from "axios"
import { apiResponse } from "@/types/apiResponse"

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
import { useRouter } from "next/navigation"
import Link from "next/link"




 const Register=()=>{
  //state managements
  const [userName,setUsername]=useState('')
  const [userNameMessage,setUserNameMessage]=useState('')
  const [checkingUsername,setCheckingUsername]=useState(false)
  const [isformSubmitting,setIsformSubmitting]=useState(false)
  const [isUserNameUnique,setisUserNameUnique]=useState(false)
  const debounced=useDebounceCallback(setUsername, 500) // this is the debounced value , i will use this value in form and for backnd request
  const { toast } = useToast()


  //   zod implementation
 const form= useForm({
  resolver:zodResolver(signupSchema), // provide the schema
  defaultValues:{
    username:"",
    email:'',
    password:''
  }
 })

 const router=useRouter()
 useEffect(()=>{
  const isUserNameUnique=async()=>{
    if (userName) {
      setCheckingUsername(true)

      try {
        const response=await axios.get(`/api/check-unique-username?username=${userName}`)
      // setUserNameMessage(response.data?.message ?? "username checked")
      // if(!response.data.success){
        setUserNameMessage(response.data.message)
        if (response.data.success) {
          setisUserNameUnique(true)

        }else{
          setisUserNameUnique(false)


        }
        // toast({
        //   title: "username is unique",
        //   description: "you may continue",
        // })
      // }else{
        // setisUserNameUnique(false)
        // toast({
        //   title: "username is taken",
        //   description: "please choose anoher username",
        // })

      // }

      } catch (error) {
        // console.log(error);
        toast({
          title: "failed",
          description: "username unique check failed",
        })


      }finally{
      setCheckingUsername(false) // success or false , but  setCheckingUsername , should be set false

      }

    }
  }
  isUserNameUnique()

 },[userName])

const onSubmit=async (data:z.infer<typeof signupSchema>)=>{
  setIsformSubmitting(true)
  console.log(data);

  try {
    const response=await axios.post<apiResponse>('/api/signup',data)
    if(response.data.success){
      toast({
        title:"success",
        description:"user registration successful"
      })
    }
    router.push(`/verify/${userName}`)


  } catch (error) {
    console.log(error);
    toast({
      title:"failed",
      description:"user registration failed"
    })
  }finally{
  setIsformSubmitting(false)

  }


}
return (
  <>
<div className="flex items-center justify-center h-screen w-full ">
  <div className="w-1/3 m-2 h-4/5 shadow-md rounded-md px-8  p-4 space-y-20">
  <div className="text-center">
  <h2 className="text-4xl capitalize font-bold m-2 ">Signup on Monkey</h2>

  </div>
  <Form  {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
  control={form.control}
  name="username"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Username</FormLabel>
      <FormControl>
        <Input placeholder="username" {...field} onChange={(e)=>{
          field.onChange(e)
          debounced(e.target.value)
        }} />
      </FormControl>
        {checkingUsername && (<Loader2 className="animate-spin" />)}
        <p className={`text-sm ${isUserNameUnique? "text-green-600" : 'text-red-500'}`} >
          {userNameMessage}
        </p>
      <FormMessage />
    </FormItem>
  )}
/>
  <FormField
  control={form.control}
  name="email"
  render={({ field }) => (
    <FormItem>
      <FormLabel>email</FormLabel>
      <FormControl>
        <Input placeholder="email" {...field}  />
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
<Button type="submit" disabled={isformSubmitting} >{isformSubmitting ? (<><Loader2 className="animate-spin"  /> please wait </> ):"SignUp"}</Button>
</form>
<div className="text-center ">
  <h1>Already a member ? <Link className="font-bold" href='/signin'>signin</Link> </h1>

</div>

    </Form>

  </div>

</div>
</>)

}


export default Register