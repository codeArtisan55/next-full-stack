"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { Textarea } from "@/components/ui/textarea"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
// import { Toast } from '@/components/ui/toast'
import { useToast } from "@/components/ui/use-toast"
import axios, { AxiosError } from 'axios'



const Profile = ({params}:any) => {
const {toast}=useToast()

const FormSchema = z.object({
  bio: z
    .string()
    .min(10, {
      message: "Bio must be at least 10 characters.",
    })
    .max(160, {
      message: "Bio must not be longer than 30 characters.",
    }),
})
const form = useForm<z.infer<typeof FormSchema>>({
  resolver: zodResolver(FormSchema),
  defaultValues:{
    bio:'',
  }
})

async function onSubmit(data: z.infer<typeof FormSchema>) {

  try {
    const response=await axios.post("/api/send-messages",{
      username:params?.username,
      content:data
    })

    if(response.data.success){
      toast({
        title: "Success",
        description:"Message Sendt"
      })

    }
    if(!response.data.success){
      toast({
        title: "Failed",
        description:response.data.message
      })

    }

  } catch (error:any) {
    toast({
      title: "Failed",
      description:error.response.data.message
    })

  }

}


  return (
    <div>

        <section className='w-[80%] m-auto h-screen'>

            <div className='flex flex-col items-center justify-center'>
            <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can <span>@mention</span> other users and organizations.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>

            </div>

        </section>

    </div>
  )
}

export default Profile
