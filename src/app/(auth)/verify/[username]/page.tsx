"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { verifySchema } from '@/schemas/VerifySchema'
import { useParams, useRouter } from 'next/navigation'
import { z } from "zod"

import axios from 'axios'
import { Input } from "@/components/ui/input"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { apiResponse } from '@/types/apiResponse'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { Loader2 } from 'lucide-react'

const Verify = () => {
  const [isformSubmitting,setIsformSubmitting]=useState(false)  
  
    const form= useForm({
        resolver:zodResolver(verifySchema), // provide the schema
        defaultValues:{
          code:''
        }
})

const params=useParams()
const router=useRouter()


const onSubmit=async (data: z.infer<typeof verifySchema>)=>{
    const username=params.username
    setIsformSubmitting(true)

    try {
      const response=await axios.post<apiResponse>("/api/verify-code",{
        username,
        code:data?.code

      })
      
    } catch (error) {
      toast({
        title:"failed",
        description:"verification failed"
      })
      
    }finally{
    setIsformSubmitting(false)

    }



}
      
  return (
    <div className='flex items-center justify-center w-full h-screen'>
      <div className='p-5 space-y-10 shadow-md rounded-md  ' >
        <div className='text-center'>

          <h1 className='text-5xl font-bold m-1'>Verify OTP</h1>
          <p>Enter the verification code sent to your email</p>

        </div>

       <Form  {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 flex items-center justify-center flex-col">
      <FormField
  control={form.control}
  name="code"
  render={({ field }) => (
    <FormItem>
      <FormControl>
        <Input placeholder="otp" {...field}  />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
<Button type="submit" disabled={isformSubmitting} >{isformSubmitting ? (<><Loader2 className="animate-spin"  /> please wait </> ):"Verify"}</Button>


      </form>


       </Form>

      </div>

    </div>
  )
}

export default Verify
