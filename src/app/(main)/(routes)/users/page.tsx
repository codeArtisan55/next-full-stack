"use client"
import {  useToast } from '@/components/ui/use-toast'
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { User } from '@/models/user.model'
import {DataTable} from "@/components/Table"
import {columns} from "@/data/userData"

const page = () => {

    type Users={
        success:boolean,
        message:string,
        data:any
    }

    const [users,setUsers]=useState([])
    const {toast}=useToast()


    const getUsers=useCallback(async ()=>{

        try {
            const res=await axios.get<Users>("/api/get-users")
            // console.log(res.data);

            if(!res){
                toast({
                    title:"oops!",
                    description:"users not found"
                })
            }

            if(res.data){
                setUsers(res.data.data)
            }


        } catch (error) {
            toast({
                title:"oops!",
                description:"something went wrong"
            })


        }

    },[])

    useEffect(()=>{
        getUsers()

    },[])
    console.log(users);

  return (
    <div>
        <h1 className='text-4xl text-center uppercase '>users</h1>
        <div className='w-full flex justify-center items-center p-5'>
            <div className='w-2/3'>

         <DataTable columns={columns} data={users}/>
            </div>

        </div>

    </div>
  )
}

export default page
