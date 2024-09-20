"use client"
import React, { useCallback, useEffect, useState } from 'react'
import { Message } from '@/models/user.model';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AcceptmessageSchema } from '@/schemas/AcceptMessageSchema';
import axios, { AxiosError } from 'axios';
import { apiResponse } from '@/types/apiResponse';
import { toast } from '@/components/ui/use-toast';
import { useSession } from 'next-auth/react';
import { Switch } from "@/components/ui/switch"
import {Inter_Tight} from "next/font/google"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import MessageCard from '@/components/Card';
import {MessageT} from "@/types/messageTypes"
import {messageCard} from "@/types/messageTypes"

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { log } from 'console';




const Dashboard = () => {
  const [messages,setMessages]=useState<MessageT[]>([])
  const [isLoading,setIsloading]=useState(false)
  const [isSwitchLoading,setIsSwitchLoading]=useState(false)
  const [profileUrl, setProfileUrl] = useState('');
  // console.log(messages);
  

  

  

  
  

  const {data:session}=useSession()

  const handleDeleteMessage=async (messageId:string)=>{
      setMessages(messages.filter((message)=>{
        
        return message._id !== messageId
      }))
      
  }

  const form=useForm({
    resolver:zodResolver(AcceptmessageSchema)
  })

  const {register,watch,setValue}=form // extract methods from react-hook-form

  const acceptMessages=watch("acceptMessages")

  const fetchAcceptMessages=useCallback(async()=>{
    setIsSwitchLoading(true)

    try {
      const response=await axios.get<apiResponse>("/api/accept-messages")
      setValue("acceptMessages",response.data.isAcceptingMessage)
    } catch (error) {
      const axiosError=error as AxiosError<apiResponse>
      toast({
        title:"failed",
        description:axiosError?.response?.data.message
      })
      
    }finally{
    setIsSwitchLoading(false)

    }


  },[setValue])

  const getMessages=useCallback(async(refresh:boolean=false)=>{
    setIsloading(true)
    console.log(session?.user?.isAcceptingMessage);
    

    try {
      const response=await axios.get<apiResponse>("/api/get-messages")
      // console.log(response);
      
      
      if(response?.data?.messages){
        console.log(response?.data?.messages[0].messages || []);
        setMessages(response?.data?.messages[0].messages || [])
      }
      
      if (refresh) {

        toast({
          title:"Refreshed Messages",
          description:"showing latest messages"
        })
      }
      
    } catch (error) {
       
      toast({
        title:"Failed",
        description:"could not fetch messages"
      })
      
    }finally{
    setIsloading(true)

    }

  },[setIsloading,setMessages])


  useEffect(()=>{

    if(!session || !session.user) return
    getMessages(true)
    fetchAcceptMessages()

  },[session,setValue])

  useEffect(() => {
    const url = `${window.location.protocol}//${window.location.host}/${session?.user.username}`;
    setProfileUrl(url);
  }, [session]);


  const handleSwitch=async()=>{
    try {
      const response=await axios.post("/api/accept-messages",{
        acceptingMessages:!acceptMessages
      })
      setValue("acceptMessages",!acceptMessages)
      toast({
        title:"Success",
        description:"user accept messages updated"
      })
      
     
    } catch (error) {
      toast({
        title:"Fail",
        description:"could not update user accept messages"
      })
      
    }

  }


  if(!session || !session?.user){
    return <div>Please login first</div>
  }




 

  return (
    <div className='md:w-[80%] md:m-auto p-5 overflow-x-hidden w-full'>
      <div className='flex flex-col gap-5 m-10 p-5'>
        
        <div className='flex justify-between'>
        <h1 className={`text-2xl md:text-4xl font-bold capitalize`}>
        {session?.user.username} Dashboard
        </h1>
        <HoverCard>
  <HoverCardTrigger><Switch checked={acceptMessages} onCheckedChange={handleSwitch} {...register("acceptMessages")}/></HoverCardTrigger>
  <HoverCardContent className='font-light text-sm'>
    Accep User Messages
  </HoverCardContent>
</HoverCard>
        
        </div>
        <Separator className=' border-black'/>

        <div className='flex gap-0'>
          <Input value={profileUrl} disabled className='font-bold '/>
          <Button>Copy</Button>
        </div>

        <div className='p-5'>
          <h1 className='capitalize text-xl md:text-3xl font-bold w-56 text-center md:w-full'>All your messages will show up here</h1>
          <div  className='flex flex-wrap min-w-40  gap-10 p-10 '>
            {messages.length > 0 ?
             (<>{
              messages.map((message,index)=>{
                
                 return <MessageCard key={message._id || index} {...message} handleDelete={handleDeleteMessage}/>
              })
             }</>):
             (<h2 className='text-4xl'>No Messages Yet</h2>)}

          </div>

        </div>

      </div>
    </div>
  )
}

export default Dashboard
