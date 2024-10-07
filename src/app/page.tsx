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
import { SparklesCore } from "@/components/ui/sparkles";
import {
  TextRevealCard,
  TextRevealCardDescription,
  TextRevealCardTitle,
} from "@/components/ui/text-reveal-card";
import Elelement from "@/components/Element";


export default function Home() {


  return (
    // <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-red-900 after:dark:via-[#5778da] after:dark:opacity-80 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">

    //   </div>
    <main className="relative  w-full h-full overflow-hidden">
      <Elelement/>
       {/* <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={50}
          className="w-full h-full z-[-1] absolute"
          particleColor="#FFFFFF"
        /> */}
      <section className="w-[80%] m-auto  p-10 text-center h-full">

      <h1 className="text-8xl font-bold capitalize bg-gradient-to-r from-purple-800 via-pink-500 to-yellow-500 bg-clip-text text-transparent">
        Welcome to the anonymous place
      </h1>
      <div className="flex items-start p-5 justify-center h-full  ">

      <TextRevealCard className="text-8xl font-bold capital bg-transparent border-none line-clamp-4 leading-3 text-black " text="Sometimes, you just need to see it." revealText="I will show you">
      </TextRevealCard>
      </div>
      {/* <div className="flex items-start p-5 justify-center h-full  ">
        <Carousel className="w-1/2">
          <CarouselContent>
            {messages.map((message,index)=>{
              return (<CarouselItem key={index}>
                <MessageCard {...message}/>
              </CarouselItem>)

            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div> */}
    </section>
    </main>
  );
}
