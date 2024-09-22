import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { X } from "lucide-react"
import {messageCard} from "@/types/messageTypes"

import { Button } from "./ui/button"
import axios from "axios";
import { useToast } from "./ui/use-toast";
interface messageCardProps {
  content:string,
  createdAt:Date,
  _id:string,
  handleDelete?:(id:string)=>void
}

  const MessageCard = ({content,createdAt,_id,handleDelete}:messageCard) => {
    const { toast } = useToast();


    const handleDeleteMessage=async (messageId:string)=>{
console.log(messageId);


      const response=await axios.delete(`/api/delete-message/${messageId}`)

      if(response.data.success){
        toast({
          title:"success",
          description:"message deleted"
        })
      }
    }
    return (
        <Card >
            <Button variant="outline" onClick={()=> {
              handleDeleteMessage(_id as string)
              handleDelete && handleDelete(_id as string)
              }}>
                <X/>
            </Button>
        <CardHeader>
          <CardTitle>Message</CardTitle>
          <CardDescription>{content}</CardDescription>
        </CardHeader>
        <CardFooter>
        { typeof(createdAt)==="object" ? createdAt.toLocaleDateString("en-GB"): new Date(createdAt).toLocaleDateString("en-GB")}
        </CardFooter>
      </Card>

    )
  }

  export default MessageCard

