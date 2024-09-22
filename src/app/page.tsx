"use client"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import messages from "@/data/messages.json"
import MessageCard from "@/components/Card";


export default async function Home() {
  

  return (
    // <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-red-900 after:dark:via-[#5778da] after:dark:opacity-80 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">

    //   </div>
    <section className="w-[80%] m-auto p-10 text-center h-screen">
      <h1 className="text-4xl font-bold capitalize">
        Welcome to the anonymous place
      </h1>

      <p className="font-bold my-3 ">
        Here you can send messages anonymously to any body you want
      </p>
      <div className="flex items-center justify-center h-full  ">
        <Carousel className="w-1/2">
          <CarouselContent>
            {messages.map((message,index)=>{
              return (<CarouselItem>
                <MessageCard {...message}/>
              </CarouselItem>)

            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
